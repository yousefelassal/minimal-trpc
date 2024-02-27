import { publicProcedure, router } from '../trpc.js';
import { z } from 'zod';
import { db } from '../db.js';

export const userRouter = router({
    list: publicProcedure
      .query(() => db.user.findMany({
        orderBy: { createdAt: 'desc' }
      })),
    create: publicProcedure
      .input(z.object({name: z.string()}))
      .mutation(({ input }) => db.user.create({ data: input })),
    delete: publicProcedure
      .input(z.object({id: z.number()}))
      .mutation(({ input }) => db.user.delete({ where: { id: input.id } })),
});