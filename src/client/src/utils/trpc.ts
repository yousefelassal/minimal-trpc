import { createSWRProxyHooks } from "@trpc-swr/client";
import { createSWRInfiniteProxy } from "@trpc-swr/infinite";
import type { AppRouter } from '../../../server/index.js'
import { httpBatchLink } from "@trpc/client";

export const trpc = createSWRProxyHooks<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc',
        })
    ]
})

export const trpcInfinite = createSWRInfiniteProxy(trpc)