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
 * /specialties:
 *   get:
 *     tags: [Médicos]
 *     summary: Lista todas as especialidades e os médicos de cada especialidade
 *     responses:
 *       200:
 *         description: Lista de especialidades com seus médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   specialty:
 *                     type: string
 *                   doctors:
 *                     type: array
 *                     items:
 *                       type: string
 */

// Endpoint para criar um agendamento
/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - specialty
 *         - doctorName
 *         - date
 *         - userId
 *       properties:
 *         specialty:
 *           type: string
 *           description: A especialidade do médico
 *         doctorName:
 *           type: string
 *           description: O nome do médico
 *         date:
 *           type: string
 *           format: date-time
 *           description: A data do agendamento
 *         userId:
 *           type: string
 *           description: O ID do usuário (paciente)
 *       example:
 *         specialty: Cardiologia
 *         doctorName: Dr. João Silva
 *         date: 2023-10-10T14:00:00Z
 *         userId: 60d0fe4f5311236168a109ca
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro ao criar agendamento
 */