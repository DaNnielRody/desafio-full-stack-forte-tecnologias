# Forte Asset Manager API

API de gestão de ativos, empresas e colaboradores desenvolvida com NestJS, Prisma e PostgreSQL.

## 🚀 Funcionalidades

### 📋 Módulos Principais

- **Companies**: Gestão de empresas com validação de CNPJ
- **Employees**: Gestão de funcionários com validação de CPF e e-mail
- **Assets**: Gestão de ativos com sistema de atribuição e status

### 🔧 Recursos Técnicos

- **Validação de Dados**: Utiliza `class-validator` e `class-transformer` para validação robusta
- **Tratamento de Erros**: Sistema centralizado de tratamento de erros com mensagens localizadas
- **Documentação API**: Swagger/OpenAPI integrado com exemplos
- **Observabilidade**: Logs estruturados em JSON com requestId para rastreamento
- **Normalização**: Input automático de CPF/CNPJ (remove formatação) e e-mail (trim + lowercase)

## 📚 Documentação da API

A documentação interativa da API está disponível em:

```
http://localhost:3000/api/docs
```

### Exemplos de Endpoints

#### Companies

- `GET /api/companies` - Listar empresas
- `POST /api/companies` - Criar empresa
- `GET /api/companies/:id` - Buscar empresa por ID
- `GET /api/companies/cnpj/:cnpj` - Buscar empresa por CNPJ
- `PUT /api/companies/:id` - Atualizar empresa
- `DELETE /api/companies/:id` - Deletar empresa

#### Employees

- `GET /api/employees` - Listar funcionários
- `POST /api/employees` - Criar funcionário
- `GET /api/employees/:id` - Buscar funcionário por ID
- `PUT /api/employees/:id` - Atualizar funcionário
- `DELETE /api/employees/:id` - Deletar funcionário

#### Assets

- `GET /api/assets` - Listar ativos
- `POST /api/assets` - Criar ativo
- `GET /api/assets/:id` - Buscar ativo por ID
- `PUT /api/assets/:id` - Atualizar ativo
- `DELETE /api/assets/:id` - Deletar ativo

## 🛠️ Tecnologias

- **Framework**: NestJS
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **Validação**: class-validator + class-transformer
- **Documentação**: Swagger/OpenAPI
- **Linting**: ESLint + Prettier
- **Package Manager**: pnpm

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL
- pnpm

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Configurar banco de dados

```bash
# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis no .env
DATABASE_URL="postgresql://user:password@localhost:5432/forte_asset_manager"
```

### 3. Executar migrações

```bash
pnpm prisma migrate dev
```

### 4. Executar aplicação

```bash
# Desenvolvimento
pnpm start:dev

# Produção
pnpm build
pnpm start:prod
```

A aplicação estará disponível em `http://localhost:3000`

## 📊 Estrutura do Projeto

```
src/
├── common/
│   ├── filters/           # Filtros de exceção global
│   ├── pagination/        # Utilitários de paginação
│   └── errors/           # Classes de erro customizadas
├── modules/
│   ├── companies/        # Módulo de empresas
│   │   ├── controllers/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── services/
│   ├── employees/        # Módulo de funcionários
│   └── assets/          # Módulo de ativos
├── prisma/              # Configuração do Prisma
└── main.ts             # Ponto de entrada da aplicação
```

## 🔍 Validação de Dados

### CPF/CNPJ

- Aceita entrada formatada (123.456.789-09) ou sem formatação (12345678909)
- Remove automaticamente pontos, traços e espaços
- Valida formato e quantidade de dígitos

### E-mail

- Remove espaços em branco
- Converte para lowercase automaticamente
- Valida formato de e-mail

### Exemplos de Payloads

#### Criar Empresa

```json
{
  "name": "Empresa Teste S.A.",
  "cnpj": "11.222.333/0001-44" // Será normalizado para "11222333000144"
}
```

#### Criar Funcionário

```json
{
  "name": "João Silva",
  "email": "  JOÃO.SILVA@EXAMPLE.COM  ", // Será normalizado para "joao.silva@example.com"
  "cpf": "123.456.789-09", // Será normalizado para "12345678909"
  "companyId": "clyx900k00000prqj0001abcd"
}
```

#### Criar Ativo

```json
{
  "name": "Notebook Dell XPS 15",
  "type": "Eletrônico",
  "status": "DISPONIVEL",
  "companyId": "clyx900k00000prqj0001abcd",
  "assignedToId": null
}
```

## 🚨 Tratamento de Erros

### Mensagens Localizadas

- **E-mail duplicado**: "Já existe um registro com este e-mail."
- **CPF duplicado**: "Já existe um registro com este CPF."
- **CNPJ duplicado**: "Já existe um registro com este CNPJ."
- **Registro não encontrado**: "Registro não encontrado."

### Logs Estruturados

Todos os erros são logados em formato JSON com:

- `requestId`: ID único da requisição
- `method`: Método HTTP
- `path`: Caminho da requisição
- `status`: Código de status HTTP
- `message`: Mensagem de erro
- `timestamp`: Data/hora do erro

### Exemplo de Log de Erro

```json
{
  "kind": "HttpException",
  "status": 400,
  "method": "POST",
  "path": "/api/employees",
  "requestId": "abc123-def456-ghi789",
  "message": "Dados inválidos",
  "error": "ValidationError",
  "details": ["CPF deve conter 11 dígitos numéricos"]
}
```

## 🎯 Status dos Ativos

- `DISPONIVEL`: Ativo disponível para atribuição
- `EM_USO`: Ativo em uso por funcionário
- `MANUTENCAO`: Ativo em manutenção
- `DESCARTADO`: Ativo descartado

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm start:dev          # Executa em modo desenvolvimento

# Build e Produção
pnpm build              # Compila o projeto
pnpm start:prod         # Executa versão compilada

# Banco de Dados
pnpm prisma migrate dev # Executa migrações
pnpm prisma generate    # Gera cliente Prisma
pnpm prisma studio      # Abre Prisma Studio
```

## 📝 Convenções de Commit

O projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação, ponto e vírgula, etc
- `refactor:` Refatoração de código
- `test:` Adição de testes
- `chore:` Mudanças em ferramentas, configurações

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
