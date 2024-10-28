import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { swaggerDocs, swaggerUi } from './swagger.js';

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const SECRET_KEY = 'seu_segredo';

app.post('/login', async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return response.status(404).json({ message: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return response.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

        response.status(200).json({ token });
    } catch (error) {
        response.status(500).json({ message: 'Erro ao fazer login', error });
    }
});

// CRIA USUARIO com senha criptografada
app.post('/users', async (request, response) => {
    console.log("Dados recebidos:", request.body);  // Isso ajudará a verificar se `name` está realmente vindo.
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
        console.error("Erro ao criar usuário:", error);
        response.status(500).json({ error: "Erro ao criar usuário" });
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

    const users = await prisma.user.findMany()

    response.status(200).json(users)
})


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
    })

    response.status(201).json(request.body)
})

// DELETA USUARIO (EXCLUI PACIENTE)
app.delete('/users/:id', async (request, response) => {

    await prisma.user.delete({
        where: {
            id: request.params.id
        },
    })

    response.status(200).json({ message: "Usuário Foi Deletado Com Sucesso!" })
})

// Cadastro de médico
app.post('/doctors', async (request, response) => {
    const doctor = await prisma.doctor.create({
        data: {
            crm: request.body.crm,
            name: request.body.name,
            email: request.body.email,
            phone: request.body.phone,
            specialty: request.body.specialty
        }
    });
    response.status(201).json(doctor);
});

// Listagem de médicos
app.get('/doctors', async (request, response) => {
    const doctors = await prisma.doctor.findMany();
    response.status(200).json(doctors);
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

app.listen(3000) // PORTA