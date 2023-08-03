'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </QueryClientProvider>
  )
}
