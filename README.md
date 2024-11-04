# BFF HONO

Esta aplicação foi construida utilzando [hono.js](https://hono.dev/) formatando os dados de dois microserviços e utilizando de [redis](https://redis.io/) para cache.

## Microserviços:

- [Microserviço de usuarios](https://github.com/gusttv/user-api-microservice)
- [Microserviço de pedidos](https://github.com/gusttv/order-microservice)

## Instalação:

1. Inicie os [microserviços](#microserviços).

2. Instale as depêndencias: 

```bash
$ bun install
```

3. Inicie o redis com docker:

```bash
$ docker compose up -d
```
4. Inicie o BFF:

```bash 
bun run dev
```

## Endpoints

- `POST /api/users/register`: Registra um novo usuário.
- `POST /api/users/login`: Autentica o usuario e recebe um token JWT.
- `POST /api/orders/`: Cria um novo pedido.
- `GET /api/orders`: Lista todos os pedidos.
- `GET /api/orders/{id}`: Obtem um pedido especifico.
- `PATCH /api/orders/{id}`: Atualiza o status de um pedido especifico.
- `DELETE /api/orders/{id}`: Deleta um pedido especifico.
- `GET /api/profile/`: Obtem os dados do usuario e os pedidos desse usuario.

## Licença

https://unlicense.org