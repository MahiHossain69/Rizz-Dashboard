'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, Bell, Moon, Sun, User, Command, Settings, LogOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockNotifications } from '@/lib/mock-data'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()
  const { sidebarCollapsed } = useStore()
  const router = useRouter()
  const navRef = useRef(null)
  const searchInputRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  const unreadCount = mockNotifications.filter(n => !n.read).length

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
    }
  }, [])

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl+K (Windows/Linux) or Cmd+K (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed top-0 z-30 flex h-14 sm:h-16 items-center justify-between',
        'border-b border-border/40 bg-background/95 backdrop-blur-md',
        'supports-[backdrop-filter]:bg-background/60',
        'transition-all duration-300',
        // Mobile: full width with padding for menu button
        'w-full pl-14 pr-3 sm:pl-4 sm:pr-4',
        // Desktop: adjust width and position based on sidebar
        'lg:pr-6',
        sidebarCollapsed ? 'lg:left-16 lg:w-[calc(100%-4rem)]' : 'lg:left-64 lg:w-[calc(100%-16rem)]'
      )}
    >
      <div className="flex flex-1 items-center justify-between max-w-[1600px] mx-auto w-full ">
        {/* Search - Enhanced for all devices */}
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-2.5 sm:left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            className="pl-8 sm:pl-10 pr-3 h-9 sm:h-10 text-sm bg-muted/50 border-border/50 focus:bg-background transition-colors"
          />
          <kbd className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            Ctrl + K
          </kbd>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative h-8 w-8 sm:h-9 sm:w-9 hover:bg-accent/50"
            title={mounted && theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {mounted && theme === 'dark' ? (
              <Sun className="h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem] transition-all" />
            ) : (
              <Moon className="h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem] transition-all" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            {({ open, setOpen }) => (
              <>
                <DropdownMenuTrigger onClick={() => setOpen(!open)}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative h-8 w-8 sm:h-9 sm:w-9 hover:bg-accent/50"
                    title="Notifications"
                  >
                    <Bell className="h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem]" />
                    {unreadCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -right-1 -top-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-[9px] sm:text-[10px] border-2 border-background"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                {open && (
                  <DropdownMenuContent className="w-[calc(100vw-2rem)] sm:w-80" align="end">
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="text-sm font-semibold">Notifications</span>
                      {unreadCount > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {unreadCount} new
                        </Badge>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                          <div className="flex gap-3 w-full">
                            <div className={cn(
                              "flex h-2 w-2 rounded-full mt-1.5 flex-shrink-0",
                              !notification.read ? "bg-primary" : "bg-transparent"
                            )} />
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-medium text-sm">{notification.title}</span>
                              </div>
                              <span className="text-xs text-muted-foreground line-clamp-2">
                                {notification.message}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Button variant="ghost" size="sm" className="w-full justify-center text-xs">
                        View all notifications
                      </Button>
                    </div>
                  </DropdownMenuContent>
                )}
              </>
            )}
          </DropdownMenu>

          {/* Divider - Hidden on mobile */}
          <div className="hidden sm:block h-6 w-px bg-border/50" />

          {/* Profile - Mobile: Icon only, Desktop: Full info */}
          <DropdownMenu>
            {({ open, setOpen }) => (
              <>
                <DropdownMenuTrigger onClick={() => setOpen(!open)}>
                  {/* Mobile: Icon only */}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="flex sm:hidden h-8 w-8 hover:bg-accent/50"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold text-xs shadow-sm">
                      {session?.user?.name?.charAt(0) || 'A'}
                    </div>
                  </Button>
                  
                  {/* Tablet & Desktop: Full info */}
                  <Button 
                    variant="ghost" 
                    className="hidden sm:flex gap-2 sm:gap-3 h-9 sm:h-10 px-2 sm:px-3 hover:bg-accent/50"
                  >
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold text-xs sm:text-sm shadow-sm">
                      {session?.user?.name?.charAt(0) || 'A'}
                    </div>
                    <div className="hidden lg:flex flex-col items-start">
                      <span className="text-sm font-medium leading-none">
                        {session?.user?.name || 'Admin User'}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize leading-none mt-1">
                        {session?.user?.role || 'admin'}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                {open && (
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-3 p-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold shadow-sm">
                        {session?.user?.name?.charAt(0) || 'A'}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-medium truncate">
                          {session?.user?.name || 'Admin User'}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {session?.user?.email || 'admin@example.com'}
                        </span>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                      router.push('/settings')
                      setOpen(false)
                    }}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      router.push('/settings')
                      setOpen(false)
                    }}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      className="text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                )}
              </>
            )}
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
