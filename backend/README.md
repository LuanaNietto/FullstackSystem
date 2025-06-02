# Fullstack System Backend

## Visão geral

Este projeto backend foi implementado em NestJS com TypeScript e utiliza PostgreSQL com TypeORM como ORM. O foco é a gestão segura e eficiente de usuários, com autenticação baseada em JWT e regras rígidas de autorização.

## Decisões de Design e Arquitetura

### Modularidade

O projeto foi dividido em módulos independentes: `AuthModule` para autenticação e `UserModule` para gerenciamento de usuários. Isso facilita a manutenção, escalabilidade e testes.

### ORM e Banco de Dados

O TypeORM foi escolhido por sua integração nativa com NestJS e suporte robusto a PostgreSQL. A opção `synchronize: true` permite fácil desenvolvimento inicial, criando automaticamente as tabelas pelo decorator `@Entity`.

### Autenticação e Segurança

- **JWT**: Utilizado para permitir autenticação stateless, facilitando escalabilidade horizontal.
- **Senha criptografada**: Utiliza bcrypt para hashear senhas, jamais armazenando texto puro.
- **Guards do NestJS**: Utilizados para proteger rotas que exigem autenticação e implementar regras de autorização.

### Controle de Acesso

- Dois papéis foram definidos: `admin` e `user`.
- Admins possuem privilégios completos (listar, deletar usuários, etc).
- Usuários comuns podem apenas ver e atualizar seus próprios dados.
- Regras implementadas via checagens em serviços e na controller, com exceções HTTP.

### Funcionalidades adicionais

- **Filtros e ordenação**: Permitem flexibilidade nas listagens via query params.
- **Usuários inativos**: Endpoint específico para monitorar inatividade, usando campo `lastLoginAt` atualizado no login.
- **Swagger**: Documentação automática para facilitar consumo da API.

### Testes

Foram criados testes unitários e de integração básicos com Jest para garantir qualidade e evitar regressões.

### Escalabilidade e Manutenção

- Uso de DTOs e class-validator para garantir dados válidos.
- Separação clara entre camada de controle (controllers) e lógica de negócio (services).
- Configuração via variáveis de ambiente, facilitando deploy em múltiplos ambientes (dev, produção, etc).

---

## Como executar

### Project setup
É necessário criar um banco de dados PostgreSQL para este projeto. Em seguida, crie um arquivo .env na raiz do projeto backend e adicione as credenciais de conexão, seguindo a estrutura abaixo:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_database
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=3600s
```

```bash
$ npm install
```

```bash
$ npm start
```

### Run tests

```bash
$ npm run test
```

### APIs test
A API estará disponível em http://localhost:3000

Para registrar usuário - POST
```bash
$ /auth/register
```

Para fazer login - POST
```bash
$ /auth/login
```

Para listar usuários (admin) - GET
```bash
$ /users
```

Para atualizar usuário - PUT
```bash
$ /users/:id
```

Para deletar usuário (admin) - DELETE
```bash
$ /users/:id
```
Para acessar rotas protegidas (somente para a admin), é obrigatório enviar um token JWT válido no cabeçalho da requisição. Este token é fornecido na resposta das requisições de login.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


### Desenvolvido por Luana Nietto.
