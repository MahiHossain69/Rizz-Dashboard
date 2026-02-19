'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { Navbar } from '@/components/dashboard/navbar'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'

export default function DashboardLayout({ children }) {
  const { sidebarCollapsed } = useStore()

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <Navbar />
      <main
        className={cn(
          'pt-14 sm:pt-16 transition-all duration-300',
          // Mobile: no left padding
          'lg:pl-0',
          // Desktop: adjust based on sidebar state
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        )}
      >
        <div className="container max-w-[1600px] mx-auto p-3 sm:p-4 md:p-6 lg:p-4">
          {children}
        </div>
      </main>
    </div>
  )
}
