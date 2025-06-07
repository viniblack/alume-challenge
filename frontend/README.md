# Frontend do Alume Challenge

Repositório do frontend para o desafio Alume Challenge.  
Construído com Next.js, React, TypeScript e Tailwind CSS, este projeto oferece uma interface moderna, responsiva e acessível para interação com a API backend.

---

## Sumário

- [Frontend do Alume Challenge](#frontend-do-alume-challenge)
  - [Sumário](#sumário)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Configuração do Ambiente](#configuração-do-ambiente)
    - [Pré-requisitos](#pré-requisitos)
    - [Passos para configurar](#passos-para-configurar)
  - [Instalação](#instalação)
  - [Execução do Projeto](#execução-do-projeto)
    - [Para produção](#para-produção)
  - [Rotas Principais](#rotas-principais)
  - [Variáveis de Ambiente](#variáveis-de-ambiente)

---

## Tecnologias Utilizadas

- **Next.js**: Framework React com renderização SSR e SSG.  
- **React**: Biblioteca para construção de interfaces.  
- **TypeScript**: Tipagem estática para JavaScript.  
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e customizável.  
- **Axios**: Cliente HTTP para comunicação com a API.  
- **React Hook Form**: Gerenciamento eficiente e validação de formulários.  
- **Zod**: Validação de esquemas de dados.  
- **Headless UI**: Componentes acessíveis e sem estilo pré-definido.  
- **Heroicons**: Ícones SVG para a interface.  
- **Recharts**: Biblioteca para gráficos e visualização de dados.  
- **Date-fns**: Manipulação e formatação de datas.  
- **Next Themes**: Controle de temas claro/escuro.

---

## Estrutura do Projeto

Organização baseada nas convenções do Next.js, com separação clara entre páginas, componentes e serviços:

```

frontend/
├── app/                    # Páginas, layouts e arquivos globais do Next.js
│   ├── (pages)/            # Agrupamentos de rotas (ex: autenticação, dashboard)
│   ├── favicon.ico         # Ícone do site
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal da aplicação
│   └── page.tsx            # Página inicial
├── components/             # Componentes React reutilizáveis
├── contexts/               # Contextos React para gerenciamento global de estado
├── lib/                    # Funções utilitárias e configurações diversas
├── public/                 # Arquivos estáticos (imagens, fontes, etc.)
├── services/               # Serviços para comunicação com a API backend
│   ├── auth.ts             # Serviços relacionados à autenticação
│   └── simulation.ts       # Serviços para simulações financeiras
├── .gitignore              # Arquivos e pastas ignorados pelo Git
├── README.md               # Documentação do projeto
├── components.json         # Configurações de componentes (ex: shadcn/ui)
├── eslint.config.mjs       # Configurações do ESLint
├── next.config.ts          # Configurações do Next.js
├── package.json            # Metadados e dependências
├── package-lock.json       # Trava de versões de dependências
├── postcss.config.mjs      # Configurações do PostCSS
├── tsconfig.json           # Configurações do TypeScript
└── yarn.lock               # Trava de versões (Yarn)

```

---

## Configuração do Ambiente

### Pré-requisitos

- Node.js instalado (versão recomendada: 16+)
- Yarn, npm ou pnpm como gerenciador de pacotes

### Passos para configurar

1. Clone o repositório:

```bash
git clone https://github.com/viniblack/alume-challenge.git
cd alume-challenge/frontend
```

2. Instale as dependências:

```bash
yarn install
# ou npm install
# ou pnpm install
```

---

## Instalação

As dependências são gerenciadas pelo Yarn (ou npm/pnpm). Após clonar o repositório, execute:

```bash
yarn install
```

---

## Execução do Projeto

Para iniciar o servidor de desenvolvimento:

```bash
yarn dev
# ou npm run dev
# ou pnpm dev
```

O frontend estará disponível em:
[http://localhost:3000](http://localhost:3000)

### Para produção

Build:

```bash
yarn build
```

Iniciar servidor:

```bash
yarn start
```

---

## Rotas Principais

* **`/`** — Página inicial (landing page).
* **`/login`** — Página para login de usuários.
* **`/register`** — Registro de novos usuários.
* **`/dashboard`** — Resumo e controle das simulações financeiras.
* **`/simulations`** — Criação e visualização das simulações.
* **`/profile`** — Configurações e informações do perfil do usuário.

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do diretório `frontend` com as seguintes variáveis:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

* **`NEXT_PUBLIC_API_URL`**: URL base da API backend para as requisições.