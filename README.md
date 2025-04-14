# 📱 GrowTwitter (Back-end)

Este projeto é a API do **GrowTwitter**, uma aplicação inspirada no Twitter, desenvolvida durante minha formação em Web Full Stack. Aqui, implementei autenticação, relacionamento entre usuários, publicação de tweets, curtidas e muito mais — tudo isso usando **TypeScript**, **Node.js**, **Express** e **Prisma** com banco de dados **PostgreSQL na nuvem (via Prisma Data Platform)**.

---

### 🔗 Acesse a API online:
➡️ [https://growtwitter-db.onrender.com](https://growtwitter-db.onrender.com)

## 🚀 Tecnologias utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL** (armazenado na nuvem com **Prisma Data Platform**)
- **JWT** (autenticação segura)
- **Bcrypt** (hash de senha)

---

## 🔐 Funcionalidades implementadas

### 👥 Usuários
- Cadastro com nome, email, username e senha
- Login por email ou username
- Senha criptografada com Bcrypt
- Retorno de token JWT no login
- Atualização e exclusão de conta
- Validações de campos e emails já cadastrados

### 🐦 Tweets
- Publicação de tweets com conteúdo e tipo (`tweet` ou `reply`)
- Listagem de todos os tweets
- Listagem de tweets por usuário
- Atualização e exclusão de tweet
- Tweets vêm acompanhados dos dados do autor, replies e likes

### ❤️ Likes
- Curtir um tweet
- Descurtir (delete de like)
- Listagem de todos os likes
- Buscar like por ID

### 🤝 Seguidores
- Um usuário pode seguir outro
- Listagem de quem segue quem
- Excluir um seguidor (deixar de seguir)
- Mensagens personalizadas no retorno (ex: “Ana deixou de seguir Carlos”)

## 📫 Rotas da API

### 🔹 Usuários

| Método | Rota                  | Descrição                          |
|--------|-----------------------|-------------------------------------|
| POST   | `/usuarios/signup`    | Cadastro de novo usuário            |
| POST   | `/usuarios/login`     | Login com username/email e senha    |
| GET    | `/usuarios`           | Listar todos os usuários            |
| GET    | `/usuarios/:id`       | Buscar usuário por ID               |
| PUT    | `/usuarios/:id`       | Atualizar dados do usuário          |
| DELETE | `/usuarios/:id`       | Deletar usuário                     |

---

### 🔹 Tweets

| Método | Rota                  | Descrição                            |
|--------|-----------------------|----------------------------------------|
| POST   | `/tweets`             | Criar um novo tweet                    |
| GET    | `/tweets`             | Listar todos os tweets                 |
| GET    | `/tweets/:usuarioId`  | Listar tweets de um usuário específico|
| PUT    | `/tweets/:id`         | Atualizar um tweet                     |
| DELETE | `/tweets/:id`         | Deletar um tweet                       |

---

### 🔹 Likes

| Método | Rota           | Descrição                        |
|--------|----------------|----------------------------------|
| POST   | `/likes`       | Curtir um tweet                  |
| GET    | `/likes`       | Listar todos os likes            |
| GET    | `/likes/:id`   | Buscar like por ID               |
| PUT    | `/likes/:id`   | Atualizar like (opcional)        |
| DELETE | `/likes/:id`   | Remover like (descurtir)         |

---

### 🔹 Seguidores

| Método | Rota               | Descrição                                |
|--------|--------------------|--------------------------------------------|
| POST   | `/seguidores`      | Seguir um usuário                         |
| GET    | `/seguidores`      | Listar todas as relações de seguidores    |
| GET    | `/seguidores/:id`  | Buscar relação por ID                     |
| PUT    | `/seguidores/:id`  | Atualizar relação de seguidor             |
| DELETE | `/seguidores/:id`  | Deixar de seguir (remover relação)        |

---

## 🛡️ Autenticação

- As rotas de **tweets**, **likes** e **seguidores** são protegidas com **JWT**.
- Para acessar, envie o token no header da requisição.
