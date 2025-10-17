# Next.js Docker Postgres Template

Template for a Next.js + PostgreSQL + Prisma + Docker stack, written in TypeScript.

## Prerequisites

- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/)

## Get Started

This guide assumes a Linux, macOS, or WSL system.

To get started creating a project with this template, create a repository using this template and clone onto your machine.

Then, install the dependencies:

```bash
npm i
```

### Set Environment Variables

Copy the `.env.example` into a `.env`:

```bash
cp .env.example .env
```

then change the `POSTGRES_PASSWORD`, and optionally the `POSTGRES_USER` and `POSTGRES_DB`. Be sure to update the `DATABASE_URL` with your changes as well. It should be `postgresql://<username>:<password>@localhost:5432/<app-name>. Replace with the actual values, not the variable name.

>[!Warning]
> Do not directly change the `.env.example` file. This file is not git ignored; passwords may be accidentally committed to GitHub.

### Docker

Next, start the Docker services. For local development, we only need the `postgres` service running to serve our database. The app can run on our host machine, not within Docker.

Use the following to start the `postgres` service only:

```bash
docker-compose -f docker-compose.dev.yml up postgres -d
```

To stop the service, use:

```bash
docker-compose -f docker-compose.dev.yml stop postgres
```

### Prisma

Prisma is the ORM used, and allows us to interact with the database in a type-safe and efficient way. We need to create a client to do this. This is done using the following command, which generates commands based on the [`prisma/schema.prisma`](prisma/schema.prisma) file:

```bash
npx prisma generate
```

>[!Important]
> This command has to be run every time the schema is changed.

We can then push this schema into the database using (ensure `postgres` Docker service is up):

```bash
npx prisma db push
```

### Start the app

Finally, you are ready to start the app. Use the following to run the app locally. Ensure the `postgres` service is up.

```bash
npm run dev
```

### Viewing DB

You can inspect the database using Prisma Studio:

```bash
npx prisma studio
```

This will start a local host studio for you to see the DB table and data.
