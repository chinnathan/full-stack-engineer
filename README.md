# Getting Started

Bootstrap and playground of becoming full stack developer, here's where you can learn ReactJs and NestJs written in TypeScript.

### Structure

There are both backend and frontend apps contained in this repository ([monorepo](https://monorepo.tools)), a directory of the backend app is api/ and the frontend app is dashboard/ respectively. Both of them are placed under the root directory.

We keep a docker-compose.yml under the root directory and place Dockerfile inside each subrepo(s). By doing this, they can be built and run individually. Also, there is a docker/ directory which we prefer to reveal volumes data (mapping path) from existing/running docker container, so that it allows you to check and make sure that your database service (docker container) is running properly and provides ease of modification, configuration and so on.

- `api`: a backend NestJS application that serves Rest API service
- `dashboard`: a frontend ReactJs application with Semantic UI
- `docker-compose.yml`: a docker-compose file is used to manage and expose all predefined container(s)
- `turbo.json`: a turbo.json file is used throughout the monorepo, it defines andd consolidates the script commands of entire subrepo(s), consequently, it can leverage your tasks of lint, test, build, etc.

### Utilities

This monorepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org) for static type checking
- [ESLint](https://eslint.org) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Webpack](https://webpack.js.org) for code bundling

&nbsp;
##### * <em>Note for package manager</em>

This monorepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager, however if you prefer to npm, just ignore any relevant yarn files and start using npm as you are more familiar with.

## Setup

```
git clone https://github.com/chinnathan/full-stack-engineer.git

cd full-stack-engineer

yarn (or npm install)
```

## Build

To build all apps and packages, run the following command:

```
yarn build
```

## Start

To run/start all apps (in parallel), run the following command:

```
yarn start-par
or
yarn start:api (start only api app)
or
yarn start:dashboard (start only dashboard app)
```

## Useful Links

Learn more about the useful topics:

- Pipelines (to be continued and provided later)
- Vulnerabilities (to be continued and provided later)
- Github Integration (to be continued and provided later)
