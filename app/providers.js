'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '@/components/ui/toast'
import { useState } from 'react'

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
