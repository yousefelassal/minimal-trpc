import { createSWRProxyHooks } from "@trpc-swr/client";
import type { AppRouter } from '../../../server/index.js'
import { httpBatchLink } from "@trpc/client";

export const trpc = createSWRProxyHooks<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc',
        })
    ]
})