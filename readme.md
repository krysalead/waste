# Waste

Drone management for Waste collection

## Requirements:

For runtime

- docker >= 17.12.0+
- docker-compose

For local development

- Nodejs >= 14.17.1

## postgres

### Access to database:

- **External URL** `localhost:5432`
- **Internal URL** `postgres:5432`
- **Username:** postgres
- **Password:** %4CR1DBPa55eW0rd$

### Access to PgAdmin:

- **URL:** `http://localhost:5050`
- **Username:** pgadmin4@acri.org
- **Password:** %4CR1Adm1n$
- Add a new server in PgAdmin with the above information, take the internal url as address.

## Kafka

TODO add the URL to the kowl and the information to connect to

## Building Application

Entire application

```
docker-compose build
```

A single component

```
docker-compose build backend
```

## Running Application

Production mode

```
docker-compose -f docker-compose.yml -f docker-compose.waste.yml up
```

Development mode

```
docker-compose -f docker-compose.yml -f docker-compose.admin.yml up
```

## Components

### Backend

This component host the front controller of the server, the component will recieve the request from the mobile application. We are taking advantage of the nodejs event loop so that this layer is not doing an heavy computation but just validating the users payload and providing a proper response. It will rely on the different services

- build:Generate the routes source file and the swagger and build all the sources,
- tsc: compile using typescript,
- watch: compile in incremental watch mode,
- e2e: run end 2 end tests,
- swagger: generate the swagger based on the controllers,
- routes: Generate the source code of the hapi route,
- start: Start the server in production mode,
- dev: Start the server in dev mode with reload on change,
- debug: Start the server in debug mode waiting for the debugger to hook,
- lint: Lint the code

### Services

#### Reporting

Microservice able to create a new report in the database

#### Statistics

Microservice able to get the statistics on a zone

#### Commands

- clean: rimraf dist
- build: npm run clean;npm run lint;npm run compile
- compile: tsc --sourceMap false --project tsconfig.json
- watch: compile in incremental watch mode,
- start: node .
- dev: nodemon index.js
- test: mocha -r ts-node/register tests/\*_/_.spec.ts --exit
- debug: nodemon --watch dist --debug --debug-brk=5858 index.js
- lint: tslint --project tsconfig.json --config ../tslint.json"

### Kafka Admin Application

We are using kowl to monitor the kafka, only in development

## Improvment

- Do not package the source in the runtime image
- Split docker image in 1 for dev and build and one for production, no dev dependencies
- Mount the DIST folder to the image and sync it for the development
- Make TSling and TSConfig common to every project
- Refactor the service to have their common part in a library
- Add logging mechanism from backend into service
- Add trace id in every request or message

## Sources

- Postgres setup basd on [khezen](https://github.com/khezen/compose-postgres/blob/master/docker-compose.yml)
- Kafka setup basd on [cloudhut](https://github.com/cloudhut/kowl/blob/master/docs/local/docker-compose.yaml)

## Dependencies

- [postgres for node](https://node-postgres.com/)
- [Axios for http calls](https://github.com/axios/axios)
- [Express for the microservices](https://expressjs.com/fr/)
- [Hapi for the backend](https://hapi.dev/)
- [Error management](https://hapi.dev/module/boom/)
- [Open API](https://tsoa-community.github.io/docs/introduction.html#goal)
- [ORM to access DB](https://typeorm.io/#/)

## Tips

Accessing the host from inside a docker image use the name **host.docker.internal**
