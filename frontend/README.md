# Forte Asset Manager — Frontend

Aplicação frontend em Angular 17 para gestão de empresas, colaboradores e ativos, com suporte a internacionalização (i18n), layout responsivo e integração via proxy com o backend.

## Visão geral

- **Framework**: Angular 17 (standalone disabled no schematics)
- **i18n**: `@ngx-translate` com loader customizado
- **UI/UX**: Layout principal (navbar + footer), componentes compartilhados e feedback via toast
- **Integração**: Proxy configurado para `/api` → `http://localhost:3000`

## Funcionalidades

- **Empresas**

  - Listagem de empresas
  - Detalhes da empresa (informações, ativos e colaboradores relacionados)
  - Página de ativos por empresa
  - Criação de empresa via modal

- **Colaboradores**

  - Listagem de colaboradores
  - Gerenciador de ativos por colaborador (associar e desassociar ativos)
  - Criação de colaborador via modal

- **Ativos**

  - Listagem de ativos
  - Criação de ativo via modal
  - Apresentação do status do ativo via `asset-status` pipe

- **Infra e compartilhados**
  - Máscaras de CPF/CNPJ via diretivas (`cpf-mask-directive`, `cnpj-mask.directive`)
  - Componente de toast e `toast.service` para notificações
  - Cabeçalho de página reutilizável
  - Bandeiras e ícones estáticos em `src/assets`

## Estrutura do projeto (resumo)

```
src/
  app/
    core/
      models/                 # Modelos de domínio (empresa, colaborador, ativo)
      services/               # Serviços base e de API
    features/
      assets/                 # Páginas e componentes de Ativos
      company/                # Rotas, páginas e componentes de Empresas
      employee/               # Rotas, páginas e componentes de Colaboradores
    layout/                   # Main layout, navbar e footer
    shared/
      components/             # Page header, toast, etc.
      directives/             # Máscaras CPF/CNPJ
      pipes/                  # Asset status pipe
    app.component.*           # Shell raiz
    app.routes.ts             # Rotas da aplicação
    app.config.ts             # Configuração do aplicativo
    translate.config.ts       # Configuração de i18n
  assets/
    i18n/                     # Arquivos de tradução (en, pt-br, etc.)
    icons/                    # Ícones SVG
    flags/                    # Bandeiras (1x1, 4x3)
```

## Pré-requisitos

- Node.js 18+ (recomendado 18 LTS ou 20 LTS)
- NPM 9+
- Angular CLI 17+

## Instalação

```bash
npm install
```

## Execução (desenvolvimento)

```bash
npm start
```

A aplicação subirá em `http://localhost:4200/`.

- O proxy está habilitado no modo de desenvolvimento e redireciona chamadas para `/api` ao backend em `http://localhost:3000`.
- Para ajustar o backend alvo, edite `proxy.conf.json`.

## Build (produção)

```bash
npm run build
```

Os artefatos serão gerados em `dist/forte-frontend`.

## Testes

```bash
npm test
```

## Internacionalização (i18n)

- Arquivos de idioma em `src/assets/i18n` (`en.json`, `pt-br.json`, `es.json`, etc.).
- Loader customizado em `src/app/shared/helpers/custom-translation-loader.helper.ts`.
- Configuração em `src/app/translate.config.ts`.
- Para definir o idioma padrão e idiomas suportados, ajuste a configuração de tradução.

## Configuração de Proxy

`proxy.conf.json`:

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

O arquivo é referenciado em `angular.json` no target `serve:development`.

## Scripts disponíveis

- `npm start`: inicia `ng serve` (desenvolvimento com proxy)
- `npm run build`: compila a aplicação
- `npm run watch`: build contínuo em modo desenvolvimento
- `npm test`: executa testes unitários (Karma)

## Rotas principais (por feature)

- `features/company`: rotas para listagem, detalhes, ativos da empresa e colaboradores
- `features/employee`: rotas para listagem e gerenciador de ativos por colaborador
- `features/assets`: rotas para listagem e criação de ativos

## Convenções e padrões

- Commits seguem **Conventional Commits**
- Organização por camadas: `core`, `features`, `layout`, `shared`
- Componentes e serviços coesos por domínio

---

Qualquer dúvida ou sugestão, fique à vontade para abrir uma issue ou PR.
