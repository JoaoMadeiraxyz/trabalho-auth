# API de Autenticação

## Visão Geral

Esta API oferece funcionalidades de registro, login e obtenção de detalhes do usuário autenticado. A API foi desenvolvida usando Express, Sequelize JSON Web Token, Bcrypt, Sqlite3.

## Endpoints

### Registro de Usuário

- **URL:** `/api/register`
- **Método:** `POST`
- **Descrição:** Registra um novo usuário.
- **Corpo da Requisição:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
- **Exemplo de de Requisição:**
  ```bash
  curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
- **Resposta de Sucesso:**
  ```json
  {
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2b$10$...hashedPassword..."
  }
- **Resposta de Erro:**
  ```json
  {
  "error": "Error message"
  }

### Login de Usuário
- **URL:** `api/login`
- **Método:** `POST`
- **Descrição:** Autentica um usuário e retorna um token JWT.
- **Corpo da Requisição:**
  ```json
  {
  "email": "string",
  "password": "string"
  }
- **Exemplo de Requisição:**
  ```bash
  curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email": "john@example.com", "password": "password123"}'
- **Resposta de Sucesso:**
  ```json
  {
  "token": "jwt_token"
  }
- **Resposta de Erro:**
  ```json
  {
  "error": "Error message"
  }

### Obter Detalhes do Usuário
- **URL:** `api/user`
- **Método:** `GET`
- **Descrição:** Retorna detalhes do usuário autenticado.
- **Cabeçalho de Autorização:** `Bearer {token}`
- **Exemplo de Requisição:**
  ```bash
  curl -X GET http://localhost:3000/api/user -H "Authorization: Bearer jwt_token"
- **Resposta de Sucesso:**
  ```json
  {
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
  }
- **Resposta de Erro:**
  ```json
  {
  "error": "Error message"
  }

## Estrutura do Projeto
- **index.js:** Configura o servidor Express e sincrozina o banco de dados.
- **routes.js:** Define as rotas da API.
- **controller.js:** Contém as funções controladas para cada rota e o middleware de autenticação.
- **model.js:** Define o modelo de dados do usuário usando Sequelize.
- **db.js:** Confiruga a conexão com o banco de dados usando Sequelize.

### Configuração do Ambiente
1. **Instalar Dependências:**
   ```bash
   npm install express body-parser sequelize sqlite3 bcrypt jsonwebtoken
2. **Configurar o Banco de Dados:**
   - Crie um arquivo `**db.js**` com a seguinte configuração:
     ```javascript
     const { Sequelize } = require("sequelize");
     const sequelize = new Sequelize({
       dialect: "sqlite",
       storage: "./database.sqlite"
     });

     module.exports = sequelize;
3. **Inicie o Servidor:**
   ```bash
   node index.js
