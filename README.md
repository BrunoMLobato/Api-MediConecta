# Api-MediConecta

- npm init -y 

- npm i express

- npm install prisma --save-dev

- node --watch server.js (RODA O SERVIDOR)

- npx prisma studio (PARA MONITORAR/VISUALIZAR O BANCO DE DADOS)

- npx prisma generate (ATUALIZA OS TIPOS USADOS PELO PRISMA CLIENT)



cria o arquiov .env e dentro cole isso:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="mongodb+srv://BrunoLobato:Planeta24@mediconecta.kz99i.mongodb.net/MediConecta?retryWrites=true&w=majority&appName=MediConecta"
