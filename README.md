# 📱 GrowTwitter (Back-end)

Este projeto é a API do **GrowTwitter**, uma aplicação inspirada no Twitter, desenvolvida durante minha formação em Web Full Stack. Aqui, implementei autenticação, relacionamento entre usuários, publicação de tweets, curtidas e muito mais — tudo isso usando **TypeScript**, **Node.js**, **Express** e **Prisma** com banco de dados **PostgreSQL na nuvem (via Prisma Data Platform)**.

---

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
