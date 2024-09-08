## Prisma configuration

## Step 1

- First install prisma
- `npm install -D prisma`
- Now install prisma client
- `npm install @prisma/client@latest`
- Then init prisma
- `npx prisma init`

## Step 2

- Best practice for instantiating Prisma Client with Next.js

```js
//db.js
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
```

- Now setup env
- `DATABASE_URL="mysql://root:mysql@123@localhost:3306/ecommerce-admin"`
- Now update schema

```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Store {
  id   String @id @default(uuid())
  name String

  userId   String
  createAt DateTime @default(now())
  updateAt DateTime @updatedAt
}
```

## Step 3

- Generate prisma client
  `npx prisma generate`

- Lets migrate database
- `npx prisma migrate dev`
- How delete [reset] all data
- `npx prisma migrate reset`
