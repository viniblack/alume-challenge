# 💡 Alume Challenge - Backend

Este repositório contém o backend do desafio **Alume Challenge**, desenvolvido com **TypeScript**, **Node.js**, **Express** e **Prisma ORM**.
A API gerencia **usuários** e **simulações financeiras**, com foco em segurança, performance e boas práticas.

---

## 📚 Sumário

- [💡 Alume Challenge - Backend](#-alume-challenge---backend)
  - [📚 Sumário](#-sumário)
  - [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
  - [🧱 Estrutura do Projeto](#-estrutura-do-projeto)
  - [⚙️ Configuração do Ambiente](#️-configuração-do-ambiente)
    - [1. Clone o repositório:](#1-clone-o-repositório)
    - [2. Configure as variáveis de ambiente:](#2-configure-as-variáveis-de-ambiente)
    - [3. Inicie com Docker Compose:](#3-inicie-com-docker-compose)
  - [🧪 Execução do Projeto](#-execução-do-projeto)
  - [📡 Endpoints da API](#-endpoints-da-api)
    - [👤 Autenticação e Usuário](#-autenticação-e-usuário)
    - [💰 Simulações Financeiras](#-simulações-financeiras)
    - [🔧 Outros](#-outros)
  - [🔐 Variáveis de Ambiente](#-variáveis-de-ambiente)

---

## 🚀 Tecnologias Utilizadas

- **Node.js** & **TypeScript**
- **Express** (API RESTful)
- **Prisma ORM** + **PostgreSQL**
- **Docker & Docker Compose**
- **Autenticação**: JWT, Bcrypt
- **Validação**: Zod
- **Segurança**: Helmet, CORS, Rate Limit
- **Utilitários**: Cookie Parser

---

## 🧱 Estrutura do Projeto

```

backend/
├── prisma/                 # Esquema do banco de dados e migrações
├── src/
│   ├── config/             # Configurações globais
│   ├── controllers/        # Controladores das rotas
│   ├── middlewares/        # Middlewares (auth, validação)
│   ├── routes/             # Definições de rotas
│   ├── schemas/            # Validações com Zod
│   ├── services/           # Regras de negócio
│   ├── utils/              # Funções utilitárias
│   ├── app.ts              # Configuração do Express
│   └── server.ts           # Entrada da aplicação
├── .env.example            # Modelo de variáveis de ambiente
├── docker-compose.yml      # Orquestração com Docker
├── Insomnia.har            # Coleção de testes no Insomnia
└── package.json            # Dependências e scripts

```

---

## ⚙️ Configuração do Ambiente

Requisitos:

- Docker e Docker Compose instalados

### 1. Clone o repositório:

```bash
git clone https://github.com/viniblack/alume-challenge.git
cd alume-challenge/backend
```

### 2. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Preencha as variáveis conforme necessário:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
JWT_SECRET="sua_chave_secreta_jwt"
JWT_EXPIRES_IN="1d"
FRONTEND_URL="http://localhost:3000"
PORT=3001
```

### 3. Inicie com Docker Compose:

```bash
docker-compose up -d
```

Esse comando inicializa os serviços do backend e do banco de dados PostgreSQL.


```bash
npx prisma generate
npx prisma migrate dev
```

---

## 🧪 Execução do Projeto

Execute em modo de desenvolvimento com hot reload:

```bash
yarn dev
```

A API estará disponível em: `http://localhost:3001`

---

## 📡 Endpoints da API

### 👤 Autenticação e Usuário

* `POST /api/register`: Registro de novo usuário
* `POST /api/login`: Login e geração de tokens
* `POST /api/refresh-token`: Atualiza o token JWT
* `GET /api/me`: Perfil do usuário autenticado
* `PUT /api/me`: Atualiza dados do usuário
* `PATCH /change-password`: Altera senha do usuário

### 💰 Simulações Financeiras

* `POST /api/simulations`: Cria nova simulação
* `GET /api/simulations`: Lista simulações do usuário
* `GET /api/simulations/summary`: Retorna um resumo financeiro
* `GET /api/simulations/evolution`: Dados de evolução das simulações

### 🔧 Outros

* `GET /`: Informações básicas da API
* `GET /api/health`: Healthcheck

📎 Use a coleção **Insomnia** (`Insomnia.har`) incluída no projeto para testar os endpoints.

---

## 🔐 Variáveis de Ambiente

| Variável         | Descrição                                    |
| ---------------- | -------------------------------------------- |
| `DATABASE_URL`   | URL de conexão PostgreSQL                    |
| `JWT_SECRET`     | Chave secreta do JWT (**não compartilhe**)   |
| `JWT_EXPIRES_IN` | Tempo de expiração do token (ex: `1d`, `1h`) |
| `FRONTEND_URL`   | URL autorizada para CORS                     |
| `PORT`           | Porta do servidor (padrão: `3001`)           |

