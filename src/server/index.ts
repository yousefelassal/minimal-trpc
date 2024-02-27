import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.js';
import { publicProcedure, router } from './trpc.js';
import { z } from 'zod';

const appRouter= router({
  user: userRouter,
  hello: publicProcedure
    .input(z.string().nullish())
    .query(({ input }) => `Hello, ${input}!`)
});

export type AppRouter = typeof appRouter;

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter
    })
  );

  app.get('/', (_req, res) => {
    res.send('hello from api!');
  });

  app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});