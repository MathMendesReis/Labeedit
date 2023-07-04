# Labeddit Full Stack - Backend

Esse é o backend do projeto Labeddit Full Stack, uma aplicação de rede social onde os usuários podem compartilhar e interagir com posts. 

## Tecnologias utilizadas

- Node.js
- Express.js
- TypeScript
- SQLite
- Knex.js
- Jest (para testes)

## Funcionalidades

- Cadastro de usuário
- Login de usuário
- Criação de posts
- Listagem de posts
- Votação em posts
- Criação de comentários
- Listagem de comentários

## Endpoints

### POST /signup

Cadastra um novo usuário.

#### Request

{
"name": "Nome do usuário",
"email": "email@exemplo.com",
"password": "senha"
}

shell
Copy code

#### Response

Status: 201 Created

shell
Copy code

### POST /login

Realiza o login do usuário.

#### Request

{
"email": "email@exemplo.com",
"password": "senha"
}

shell
Copy code

#### Response

Status: 200 OK
Body:
{
"token": "token_de_autenticação"
}

shell
Copy code

### POST /posts

Cria um novo post.

#### Request

{
"title": "Título do post",
"content": "Conteúdo do post"
}

shell
Copy code

#### Response

Status: 201 Created
Body:
{
"id": "id_do_post",
"title": "Título do post",
"content": "Conteúdo do post",
"userId": "id_do_usuário",
"createdAt": "timestamp_de_criação"
}

shell
Copy code

### GET /posts

Retorna a lista de posts.

#### Response

Status: 200 OK
Body:
[
{
"id": "id_do_post",
"title": "Título do post",
"content": "Conteúdo do post",
"userId": "id_do_usuário",
"createdAt": "timestamp_de_criação",
"voteCount": "contagem_de_votos"
},
{
"id": "id_do_post",
"title": "Título do post",
"content": "Conteúdo do post",
"userId": "id_do_usuário",
"createdAt": "timestamp_de_criação",
"voteCount": "contagem_de_votos"
},
...
]

shell
Copy code

### POST /posts/:postId/vote

Realiza a votação em um post.

#### Request

{
"value": 1
}

shell
Copy code

#### Response

Status: 200 OK

shell
Copy code

### POST /posts/:postId/comments

Cria um novo comentário em um post.

#### Request

{
"text": "Texto do comentário"
}

shell
Copy code

#### Response

Status: 201 Created
Body:
{
"id": "id_do_comentário",
"text": "Texto do comentário",
"postId": "id_do_post",
"userId": "id_do_usuário",
"createdAt": "timestamp_de_criação"
}

shell
Copy code

### GET /posts/:postId/comments

Retorna a lista de comentários de um post.

#### Response

Status: 200 OK
Body:
[
{
"id": "id_do_comentário",
"text": "Texto do comentário",
"postId": "id_do_post",
"userId": "id_do_usuário",
"createdAt": "timestamp_de_criação"
},
{
"id": "id_do_comentário",
"text": "Texto do comentário",
"postId": "id_do_post",
"userId": "id_do_usuário",
"createdAt": "timestamp_de_criação"
},
...
]

rust
Copy code

## Configuração do ambiente de desenvolvimento

1. Clone o repositório do backend:
git clone <URL_DO_REPOSITÓRIO>

csharp
Copy code

2. Instale as dependências:
npm install

markdown
Copy code

3. Execute o servidor:
npm start

shell
Copy code

## Testes

Para executar os testes, utilize o seguinte comando:
npm test

csharp
Copy code

## Deploy

O backend pode ser deployado em um serviço de sua preferência, como Heroku ou AWS. Certifique-se de configurar as variáveis de ambiente necessárias para o funcionamento correto da aplicação.
