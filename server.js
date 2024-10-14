import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

// CRIA USUARIO
app.post('/users', async (request, response) => {

    await prisma.user.create({
        data: {
            name: request.body.name,
            cpf: request.body.cpf,
            email: request.body.email,
            age: request.body.age,
            gender: request.body.gender,
            phone: request.body.phone
        }
    })

    response.status(201).json(request.body)
})

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
            phone: request.body.phone
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
            phone: request.body.phone
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
            phone: request.body.phone
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