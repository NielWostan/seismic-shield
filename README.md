This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## To connect to database

1. On your local environment, create a new database called cs4354.project `create database cs4354.project;`
2. Import cs4354-seismic-shield.sql to you cs4354.project database `source cs4354-seismic-shield.sql;`
3. Update .env.local file with the correct credentials for your local environment/device
4. Run `npm install`
5. Run `npm run dev`
