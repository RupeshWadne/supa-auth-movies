// lib/reactQueryClient.js
'use client'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export { queryClient, QueryClientProvider };
