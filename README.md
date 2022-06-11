# Getting Started

Bootstrap and playground of becoming full stack developer, here's where you can learn ReactJs and NestJs written in TypeScript.

## Structure

There are both backend and frontend apps contained in this repository ([monorepo](https://monorepo.tools)), a directory of the backend app is api/ and the frontend app is dashboard/ respectively. Both of them are placed under the root directory.

We keep a docker-compose.yml under the root directory and place Dockerfile inside each subrepo(s). By doing this, they can be built and run individually. Also, there is a docker/ directory which we prefer to reveal volumes data (mapping path) from existing/running docker container, so that it allows you to check and make sure that your database service (docker container) is running properly and provides ease of modification, configuration and so on.

- `api`: a backend NestJS application that serves Rest API service
- `dashboard`: a frontend ReactJs application with Semantic UI
- `docker-compose.yml`: a docker-compose file is used to manage and expose all predefined container(s)
- `turbo.json`: a turbo.json file is used throughout the monorepo, it defines andd consolidates the script commands of entire subrepo(s), consequently, it can leverage your tasks of lint, test, build, etc.

## Utilities

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

## Prerequisite for Start (next step below)

Postgres database is required to work with backend service. You can install it locally on your environment and then make sure that all connection/configuration has been set correctly, this will be relevant to an AppModule which is a main entry-point and a building block that can load/import other modules. (please check inside "full-stack-engineer/api/src/app.module.ts" accordingly)
**&ast;** Alternatively, Dockerfile and docker-compose.yml are provided on this repo as well, so you can run all dependency services under docker containers. [Please see "Run services on Docker" section at the nearly end of this README]

## Start

To run/start all apps (in parallel), run the following command:

```
yarn start:par
//or
yarn start:api (start only api app)
//or
yarn start:dashboard (start only dashboard app)
```

To start api app (in dev mode), run the following command:

```
yarn workspace api start:dev
```

## Test (NestJs Backend)

To test api app (in watch mode), run the following command:

```
yarn workspace api test:watch
```

To see coverage stat of backend code, run the following command:

```
yarn workspace api test:cov
```

**&ast;** Recommend to use end-to-end for performing test against crud api service
because this api subrepo uses auto-generated crud, so just run the following command:

```
yarn workspace api test:e2e
```

## Test (ReactJs Frontend)

To test dashboard app (only rendering of elements, unfortunately, calling rest api to backend is skipped), run the following command:

```
yarn workspace dashboard test
```

## Run services on Docker
Let's take a look at the following files; docker-compose.yml, api/Dockerfile and dashboard/Dockerfile respectively, you can modify them and change whatever evironment variables that might work best on your machine.

![docker-compose.yml](https://github.com/chinnathan/full-stack-engineer/blob/main/asset/images/docker-compose-yml.png)

Last but not least, let's edit a line of <em>host: 'localhost'</em> to <em>'pg.local'</em> (if it's still not there) placed inside app.module.ts, after that run the following command:

```
cd full-stack-engineer

docker-compose up

// then enjoy your development  /ᐠ｡ꞈ｡ᐟ\
```

## Useful Links

Learn more about the useful topics:

- Pipelines (to be continued and provided later)
- Vulnerabilities (to be continued and provided later)
- Github Integration (to be continued and provided later)
