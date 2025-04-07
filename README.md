# FutureBlink

## Live Demo

- you can check out for live hosted demo at
- TODO: ADD LIVE URL

## setup:

### pre requisite

#### with docker

- you will need docker desktop installed in your system
- start you docker deamon and run this in terminal

```bash
docker compose up -d
```

- This will run a Mongo Db and Redis locally

#### without docker

- You can run a data base locally or get it from a Mondog DB provider but here you will need you change the value of `DATABASE_URL` in .env

- You will also need a redis either locally or from a provider, here also you will need to change these value `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `REDIS_USERNAME` in .env file

### backend

#### go to backend directory

```bash
 cd backend
```

#### copy enviroment varialbes from .env.example file

```bash
  cp .env.example .env
```

- note: if you are not using docker you will need to modify `Redis` varialbe in `.env` as mentioned above in the pre requisite

#### Install dependencies

```bash
npm install
```

#### To start the server in dev mode

```bash
npm run dev
```

#### To start the server in prod mode

- build the project

```bash
npm run build
```

- start the project

```bash
npm run start
```

### frontend

#### go to frontend directory

```bash
 cd frontend
```

#### Install dependencies

```bash
npm install
```

#### To start the frontend in dev mode

```bash
npm run dev
```

#### To start the frontend in prod mode

- build the project

```bash
npm run build
```

- start the project

```bash
npm run preview
```
