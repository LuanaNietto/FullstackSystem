# Fullstack System Frontend

## Visão geral

Este projeto frontend foi implementado em React + Vite com TypeScript. O objetivo é a criação de uma interface simples, porém intuitiva e responsiva, facilitando o uso para o usuário.

## Tecnologias Utilizadas
- React 18+: Biblioteca principal para construção da interface.
- TypeScript: Tipagem estática para maior segurança e qualidade no código.
- React Router v6: Gerenciamento de rotas, incluindo rotas privadas e autorização por perfil.
- styled-components: Estilização modular e dinâmica, facilitando o reaproveitamento e customização visual.
- Axios: Comunicação com a API backend.
- Hooks customizados: Para controle e acesso ao contexto de autenticação (useAuth).

## Funcionalidades principais
- Autenticação: Login/logout e controle de sessão via contexto global.
- Controle de acesso: Rotas protegidas via PrivateRoute e AdminRoute.
- Listagem de usuários (admin):
- Paginação (se implementada no backend)
- Filtro por papel (role)
- Ordenação por nome ou data de criação (asc/desc)
- Ações de editar e excluir usuários
- Perfil do usuário:
- Edição dos dados pessoais nome e senha
- Diferenciação na rota para usuário comum (/profile) e admin (/profile/:userId)
- Confirmação antes de excluir usuários para evitar operações acidentais.
- Design responsivo, com suporte a dispositivos móveis e scroll horizontal nas tabelas.

## Como executar

### Project setup

```bash
$ npm install
```

```bash
$ npm run dev
```
