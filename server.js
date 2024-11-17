import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { swaggerDocs, swaggerUi } from './swagger.js';
import { parseISO, format } from 'date-fns';

const prisma = new PrismaClient();
const app = express();

// Configuração do Cors permitir requisições de qualquer origem
app.use(cors()); // Permite todas as origens
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const SECRET_KEY = 'seu_segredo';



app.post('/login', async (request, response) => {
    const { email, password } = request.body;
    console.log(request.body);

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return response.status(404).json({ message: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return response.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user.id, email: email, name: user.name }, SECRET_KEY, { expiresIn: '1h' });

        response.status(200).json({ token });
    } catch (error) {
        response.status(500).json({ message: 'Erro ao fazer login', error });
    }
});

// CRIA USUARIO com senha criptografada
app.post('/users', async (request, response) => {
    const { name, cpf, email, age, gender, phone, password } = request.body;

    if (!name) {
        return response.status(400).json({ error: "O campo 'name' é obrigatório" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                cpf,
                email,
                age: parseInt(age),  // Converter age para número, caso seja string
                gender,
                phone,
                password: hashedPassword
            }
        });
        response.status(201).json(newUser);
    } catch (error) {
        if (error.code == "P2002") {
            console.log("Erro na chave única");
            if (error.meta.target == 'User_cpf_key') {
                response.status(500).json({ error: "CPF já existente" });
            }
            if (error.meta.target == 'User_email_key') {
                response.status(500).json({ error: "EMAIL já existente" });
            }
        } else {
            console.error("Erro ao criar usuário:", error);
            response.status(500).json({ error: error });
        }
    }
});

// Middleware para verificar o token JWT
function authenticateToken(request, response, next) {
    const token = request.headers['authorization'];

    if (!token) return response.status(403).json({ message: 'Token não fornecido' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return response.status(403).json({ message: 'Token inválido' });

        request.user = user;
        next();
    });
}

// Exemplo de rota protegida
app.get('/protected', authenticateToken, (request, response) => {
    response.json({ message: 'Conteúdo protegido', userId: request.user.userId });
});

// LISTA USUARIO (LISTAGEM DE PACIENTES)
app.get('/users', async (request, response) => {
    const users = await prisma.user.findMany();
    console.log(users);
    response.status(200).json(users);
});

// ATUALIZA USUARIO (UPDATE DE PACIENTES)
app.put('/users/:id', async (request, response) => {
    await prisma.user.update({
        where: {
            id: request.params.id
        },
        data: {
            name: request.body.name,
            cpf: request.body.cpf,
            email: request.body.email,
            age: request.body.age,
            gender: request.body.gender,
            phone: request.body.phone,
            password: request.body.password
        }
    });
    response.status(201).json(request.body);
});

// DELETA USUARIO (EXCLUI PACIENTE)
app.delete('/users/:id', async (request, response) => {
    await prisma.user.delete({
        where: {
            id: request.params.id
        },
    });
    response.status(200).json({ message: "Usuário foi deletado com sucesso!" });
});

// Cadastro de médico com tratamento de erros
app.post('/doctors', async (request, response) => {
    const { crm, name, email, phone, specialty } = request.body;

    try {
        const doctor = await prisma.doctor.create({
            data: {
                crm,
                name,
                email,
                phone,
                specialty
            }
        });
        response.status(201).json(doctor);
    } catch (error) {
        // Verifica se o erro é de chave única (P2002)
        if (error.code === 'P2002') {
            console.log("Erro de chave única detectado");

            // Verifica qual é o campo que violou a restrição de unicidade
            if (error.meta.target.includes('crm')) {
                response.status(400).json({ error: "CRM já existente" });
            } else if (error.meta.target.includes('email')) {
                response.status(400).json({ error: "Email já existente" });
            } else {
                response.status(400).json({ error: "Erro de chave única em outro campo" });
            }
        } else {
            console.error("Erro ao criar médico:", error);
            response.status(500).json({ error: error });
        }
    }
});

// Listagem de médicos
app.get('/doctors', async (request, response) => {
    try {
        const doctors = await prisma.doctor.findMany();
        response.status(200).json(doctors);
    } catch (error) {
        response.status(500).json({ message: 'Erro ao listar médicos', error });
    }
});

// Atualização de médico
app.put('/doctors/:id', async (request, response) => {
    const doctor = await prisma.doctor.update({
        where: {
            id: request.params.id
        },
        data: {
            crm: request.body.crm,
            name: request.body.name,
            email: request.body.email,
            phone: request.body.phone,
            specialty: request.body.specialty
        }
    });
    response.status(200).json(doctor);
});

// Deleção de médico
app.delete('/doctors/:id', async (request, response) => {
    await prisma.doctor.delete({
        where: {
            id: request.params.id
        },
    });
    response.status(200).json({ message: "Médico foi deletado com sucesso!" });
});


// Endpoint para listar todas as especialidades com todos os médicos de cada especialidade
app.get('/specialties/:specialty', async (request, response) => {
    try {
        const { specialty } = request.params;
        const doctorsBySpecialty = await prisma.doctor.findMany({
            where: {
                specialty: specialty,
            }
        });

        // const specialties = doctorsBySpecialty.reduce((acc, doctor) => {
        //     if (!acc[doctor.specialty]) {
        //         acc[doctor.specialty] = [];
        //     }
        //     acc[doctor.specialty].push(doctor.name);
        //     return acc;
        // }, {});

        // const specialtiesArray = Object.keys(specialties).map(specialty => ({
        //     specialty,
        //     doctors: specialties[specialty]
        // }));

        console.log(doctorsBySpecialty);

        response.status(200).json(doctorsBySpecialty);
    } catch (error) {
        console.error("Erro ao listar especialidades:", error);
        response.status(500).json({ error: "Erro ao listar especialidades" });
    }
});

// Endpoint para criar um agendamento
app.post('/appointments', async (request, response) => {
    const { specialty, doctorId, date, userId } = request.body;

    if (!specialty || !doctorId || !date || !userId) {
        return response.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const doctor = await prisma.doctor.findFirst({
            where: {
                specialty,
                id: doctorId,
            }
        });

        if (!doctor) {
            return response.status(404).json({ message: 'Médico não encontrado' });
        }

        const parsedDate = parseISO(date);

        const appointment = await prisma.appointment.create({
            data: {
                date: parsedDate,
                doctorId: doctor.id,
                userId: userId
            }
        });

        response.status(201).json({
            ...appointment,
            date: format(parsedDate, 'dd/MM/yyyy HH:mm')
        });
    } catch (error) {
        console.error("Erro ao criar agendamento:", error);
        response.status(500).json({ error: "Erro ao criar agendamento" });
    }
});

// Endpoint para obter todos os agendamentos de um determinado médico pelo CRM
app.get('/appointments/doctor/:crm', async (request, response) => {
    const { crm } = request.params;

    if (!crm) {
        return response.status(400).json({ message: 'O CRM do médico é obrigatório' });
    }

    try {
        const doctor = await prisma.doctor.findFirst({
            where: {
                crm: crm,
            }
        });

        if (!doctor) {
            return response.status(404).json({ message: 'Médico não encontrado' });
        }

        const appointments = await prisma.appointment.findMany({
            where: {
                doctorId: doctor.id,
            },
            include: {
                doctor: true,
                user: true,
            },
        });

        if (appointments.length === 0) {
            return response.status(404).json({ message: 'Nenhum agendamento encontrado para este médico' });
        }

        response.status(200).json(appointments);
    } catch (error) {
        console.error("Erro ao obter agendamentos:", error);
        response.status(500).json({ error: "Erro ao obter agendamentos" });
    }
});






// Endpoint para listar todos os médicos e suas especialidades
app.get('/todosmedicos', async (req, res) => {
    try {
        const doctors = await prisma.doctor.findMany({
            select: {
                name: true,
                specialty: true,
            },
        });
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Erro ao listar médicos:", error);
        res.status(500).json({ error: "Erro ao listar médicos" });
    }
});








app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
