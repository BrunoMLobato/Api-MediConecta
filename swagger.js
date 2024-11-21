// swagger.js
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Pacientes e Médicos',
            version: '1.0.0',
            description: 'API para gerenciamento de Pacientes e Médicos',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./swagger.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };

// Documentação das Rotas

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Usuários]
 *     summary: Realiza o login de um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Credenciais inválidas
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         cpf:
 *           type: string
 *         email:
 *           type: string
 *         age:
 *           type: integer
 *         gender:
 *           type: string
 *         phone:
 *           type: string
 *         password:
 *           type: string
 *     Doctor:
 *       type: object
 *       properties:
 *         crm:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         specialty:
 *           type: string
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     TokenResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Endpoints relacionados aos usuários
 *   - name: Médicos
 *     description: Endpoints relacionados aos médicos
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Usuários]
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Usuários]
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Usuários]
 *     summary: Atualiza um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário atualizado com sucesso
 */
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Usuários]
 *     summary: Deleta um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 */

/**
 * @swagger
 * /doctors:
 *   post:
 *     tags: [Médicos]
 *     summary: Cria um novo médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       201:
 *         description: Médico criado com sucesso
 */
/**
 * @swagger
 * /doctors:
 *   get:
 *     tags: [Médicos]
 *     summary: Lista todos os médicos
 *     responses:
 *       200:
 *         description: Lista de médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 */
/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     tags: [Médicos]
 *     summary: Atualiza um médico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       200:
 *         description: Médico atualizado com sucesso
 */
/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     tags: [Médicos]
 *     summary: Deleta um médico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Médico deletado com sucesso
 */


/**
 * @swagger
 * /specialties/{specialty}:
 *   get:
 *     tags: [Médicos]
 *     summary: Lista todos os médicos de uma especialidade específica
 *     parameters:
 *       - in: path
 *         name: specialty
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da especialidade
 *     responses:
 *       200:
 *         description: Lista de médicos da especialidade
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   specialty:
 *                     type: string
 *       500:
 *         description: Erro ao listar especialidades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */



/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Cria um novo agendamento
 *     description: Cria um novo agendamento para um médico específico.
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialty:
 *                 type: string
 *                 description: Especialidade do médico
 *                 example: "Cardiologista"
 *               doctorId:
 *                 type: string
 *                 description: ID do médico
 *                 example: "1"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora do agendamento
 *                 example: "2024-12-31T23:59:00Z"
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *                 example: "123"
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do agendamento
 *                   example: 1
 *                 date:
 *                   type: string
 *                   description: Data e hora do agendamento formatada
 *                   example: "31/12/2024 23:59"
 *                 doctorId:
 *                   type: string
 *                   description: ID do médico
 *                   example: "1"
 *                 userId:
 *                   type: string
 *                   description: ID do usuário
 *                   example: "123"
 *                 year:
 *                   type: string
 *                   example: "2024"
 *                 month:
 *                   type: string
 *                   example: "12"
 *                 day:
 *                   type: string
 *                   example: "31"
 *                 hour:
 *                   type: string
 *                   example: "23"
 *                 minute:
 *                   type: string
 *                   example: "59"
 *       404:
 *         description: Médico não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Médico não encontrado"
 *       500:
 *         description: Erro ao criar agendamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao criar agendamento"
 */

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Deleta um agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Agendamento deletado com sucesso
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro ao deletar agendamento
 */


// Endpoint para obter todos os agendamentos de um determinado médico pelo CRM
/**
 * @swagger
 * /appointments/doctor/{crm}:
 *   get:
 *     summary: Obtém todos os agendamentos de um determinado médico pelo CRM
 *     parameters:
 *       - in: path
 *         name: crm
 *         required: true
 *         schema:
 *           type: string
 *         description: O CRM do médico
 *     responses:
 *       200:
 *         description: Lista de agendamentos do médico
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: '2023-10-01T10:00:00Z'
 *                   doctorId:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     example: 1
 *                   doctor:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: 'Dr. João Silva'
 *                       crm:
 *                         type: string
 *                         example: '123456'
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: 'Maria Souza'
 */







/**
 * @swagger
 * /todosmedicos:
 *   get:
 *     tags: [Médicos]
 *     summary: Lista todos os médicos e suas especialidades
 *     responses:
 *       200:
 *         description: Lista de todos os médicos e suas especialidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   specialty:
 *                     type: string
 *       500:
 *         description: Erro ao listar médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */



