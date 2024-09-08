# Intro

TanStack Query with Server-Side Rendering (SSR) and hydration in Next.js, you will need to set up the dehydrate and hydrate functions to serialize the cache on the server and hydrate it on the client. This will allow data fetched on the server to be cached and available for the client on initial load.

## Steps to set up SSR with TanStack Query:

### step 1

- First, let's install the necessary packages:

`npm install @tanstack/react-query @tanstack/react-query-devtools`

```js
// app/lib/getQueryClient.ts
import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';

const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
```

## Step 2

- Now, let's create a custom provider that will wrap our application. We'll call this file `TanstackProvider.tsx`:

```js
'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

## Step 3

Next, let's update our root layout to include this provider. Create or modify the `app/layout.tsx` file:

```js
// app/layout.js
import { QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReactQueryProvider>
          <ModalProvider />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
```

## Using React Query in Your Pages

- Now, let's update the `posts/page.tsx` file to use `HydrationBoundary`:

```js
import getQueryClient from '../utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import Posts from './Posts';

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return posts;
}

export default async function PostsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  );
}
```

- The `Posts.tsx` component remains the same, but let's include it here for completeness:

```js
'use client';

import { useQuery } from '@tanstack/react-query';

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return posts;
}

export default function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <ul>
      {data.map((post: { id: number, title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```
