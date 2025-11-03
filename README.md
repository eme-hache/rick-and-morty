# Backend envs example



- NODE_ENV=development

- DB_HOST=localhost
- DB_PORT=5432
- DB_USER=postgres
- DB_PASSWORD=postgres
- DB_NAME=rick_and_morty
- DB_ENV=development

- REDIS_HOST=127.0.0.1
- REDIS_PORT=6379
- REDIS_PASSWORD=redis
- REDIS_DB=0 

# Frontend envs example

- VITE_BACKEND_URL=http://localhost:4000/graphql

# How to run the app

## Backend

- It´s necessary to have postgres and redis installed or use docker
- npm i
- npm run db:reset
- npm run dev

## Frontend

- npm i
- npm run dev