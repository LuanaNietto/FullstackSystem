# FULLSTACK SYSTEM

Projeto fullstack para gerenciamento de usuários, com autenticação, controle de perfis e permissões, e interface responsiva. Backend oferece API REST para CRUD de usuários, 
enquanto frontend em React permite filtros, ordenação e edição intuitiva. Foco em segurança, usabilidade e experiências adaptadas para admins e usuários comuns.

## Para clonar o projeto

```bash
https://github.com/LuanaNietto/FullstackSystem.git
```

Para registrar um usuário com perfil de administrador, utilize a rota /auth/register da API, enviando um JSON no corpo da requisição, como no exemplo abaixo:
```
  {
    "name": "Admin",
    "email": "admin@teste.com",
    "password": "senha123",
    "role": "admin"
  }
```

Usuários cadastrados pela interface do sistema serão automaticamente atribuídos ao perfil de usuário comum (user).

### Passo a passo para implementação está descrito no readme de cada um dos projetos (backend e frontend).

#### Desenvolvido por Luana Nietto.

