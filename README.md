# Full Stack Project Scaffold

A fully featured fullstack Typescript, GraphQL, Nextjs project scaffold.

## Prerequisites

- Node
- Docker Desktop
- Docker Compose

## Usage

### 1.

```
cd server
docker build -t <yourDockerUserName>/<YourDockerImageName>:1.0.0

cd client
npm install
npm run dev

docker-compose-up -d
```

### 2.

Accordingly change the servers image tag in the docker-compose.yml file

### 3.

Visit localhost:3000

## Features

- Basic JWT authentification/authorization
- Dynamic server side rendering on a per page basis

## Deploy

Ideally deploy the next front-end on Vercel and the server on a droplet (e.g. Digital Ocea).
