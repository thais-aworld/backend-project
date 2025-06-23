# 🚀 Ecommerce Backend API

Este é o projeto backend para o ecommerce-project (https://github.com/thais-aworld/ecommerce-project.git)

---

## 💻 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript.
* **Express**: Framework web rápido e flexível para Node.js.
* **Sequelize**: ORM (Object-Relational Mapper) para Node.js, facilitando a interação com bancos de dados relacionais.
* **MySQL**: Sistema de gerenciamento de banco de dados relacional.
* **JWT (JSON Web Tokens)**: Para autenticação de usuários.

---

## 🛠️ Como Rodar Localmente

Siga os passos abaixo para configurar e executar a API em seu ambiente de desenvolvimento.

### 1. Crie o Banco de Dados

No seu servidor MySQL, crie um novo banco de dados com o nome `ecommerce`:
---
````sql
CREATE DATABASE ecommerce;
`````
---

### 2. Configure o Arquivo .env
Na raiz do projeto, crie um arquivo chamado .env e adicione suas credenciais do MySQL e a chave secreta para JWT.
Substitua seu_usuario, sua_senha e sua_chave_secreta pelas suas informações.
---
````Snippet de código

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=ecommerce
DB_DIALECT=mysql
JWT_SECRET=sua_chave_secreta
PORT=3000
````
---

### 3. Instale as Dependências

Abra o terminal na raiz do projeto e execute o comando para instalar todas as dependências necessárias:
---
````Bash
npm install
````
---

### 4. Execute o Servidor

Você tem duas opções para iniciar o servidor:

Modo de Desenvolvimento (com hot reload - recomendado para desenvolvimento):
---
````Bash
npm run dev
````
---

Modo de Produção (sem hot reload):
----
````Bash
npm start
````
----

### 5. Teste a API

Com o servidor rodando, abra seu navegador ou use um cliente HTTP (como Postman ou Insomnia) e acesse a URL base da API:
---
````
http://localhost:3000/
````
---

Você deverá ver a seguinte resposta em formato JSON:
---
````JSON
{"message": "API Ecommerce Project rodando 🚀"}
````
---

✅ Sua API backend agora está pronta para ser conectada com o frontend React!
