'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  CirclePile
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Users, label: 'Users', href: '/users' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

function NavLink({ item, index, pathname, sidebarCollapsed, onClick }) {
  const linkRef = useRef(null)
  const Icon = item.icon
  const isActive = pathname === item.href

  useEffect(() => {
    if (linkRef.current) {
      gsap.fromTo(
        linkRef.current,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.3, 
          delay: index * 0.05,
          ease: 'power2.out' 
        }
      )
    }
  }, [index])

  return (
    <Link
      href={item.href}
      ref={linkRef}
      onClick={onClick}
      className={cn(
        'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
        'hover:scale-[1.02]',
        isActive
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        sidebarCollapsed && 'lg:justify-center lg:px-2'
      )}
      title={sidebarCollapsed ? item.label : undefined}
    >
      {isActive && !sidebarCollapsed && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-primary" />
      )}
      <Icon className={cn(
        "h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110",
        sidebarCollapsed && 'lg:h-5 lg:w-5'
      )} />
      <span className={cn(
        "transition-opacity",
        sidebarCollapsed && 'lg:hidden'
      )}>
        {item.label}
      </span>
      {!sidebarCollapsed && isActive && (
        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground" />
      )}
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useStore()
  const sidebarRef = useRef(null)
  const overlayRef = useRef(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
    }
  }, [])

  // Animate mobile menu open/close
  useEffect(() => {
    if (isMobileMenuOpen) {
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        )
      }
      if (sidebarRef.current) {
        gsap.fromTo(
          sidebarRef.current,
          { x: -280 },
          { x: 0, duration: 0.3, ease: 'power2.out' }
        )
      }
    }
  }, [isMobileMenuOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      if (sidebarRef.current) {
        gsap.to(sidebarRef.current, {
          x: -280,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => setIsMobileMenuOpen(false)
        })
      }
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 })
      }
    }
  }, [pathname])

  const closeMobileMenu = () => {
    if (sidebarRef.current) {
      gsap.to(sidebarRef.current, {
        x: -280,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => setIsMobileMenuOpen(false)
      })
    }
  }

  return (
    <>
      {/* Mobile Menu Button - Only shows when sidebar is closed */}
      {!isMobileMenuOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed left-2 top-2 z-[60] lg:hidden shadow-lg "
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          'fixed left-0 top-0 h-screen border-r border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300',
          // Desktop
          'hidden lg:flex lg:flex-col lg:z-10',
          sidebarCollapsed ? 'lg:w-16' : 'lg:w-64',
          // Mobile
          'lg:translate-x-0',
          isMobileMenuOpen ? 'flex flex-col w-72 z-50 shadow-2xl bg-card' : 'hidden'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className={cn(
            "flex h-16 items-center border-b border-border/40 px-4 transition-all",
            sidebarCollapsed ? 'lg:justify-center lg:px-2' : 'justify-between'
          )}>
            <Link 
              href="/dashboard" 
              className={cn(
                "flex items-center gap-3 transition-all group",
                sidebarCollapsed && 'lg:gap-0'
              )}
              onClick={() => isMobileMenuOpen && closeMobileMenu()}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg group-hover:shadow-xl transition-shadow">
                <CirclePile  className="h-6 w-6" />
              </div>
              <div className={cn(
                "flex flex-col transition-opacity",
                sidebarCollapsed && 'lg:hidden'
              )}>
                <span className="text-lg font-bold leading-none">Rizz</span>
                <span className="text-xs text-muted-foreground leading-none mt-0.5">Dashboard</span>
              </div>
            </Link>
            
            {/* Desktop collapse button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn(
                "hidden lg:flex h-8 w-8 hover:bg-accent/50",
                sidebarCollapsed && 'lg:hidden'
              )}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>

            {/* Collapsed expand button */}
            {sidebarCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="hidden lg:flex absolute top-20 -right-3 h-6 w-6 rounded-full border border-border bg-background shadow-md hover:shadow-lg z-20"
                title="Expand sidebar"
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            )}

            {/* Mobile close button - positioned on the right */}
            {isMobileMenuOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileMenu}
                className="lg:hidden h-8 w-8"
              >
                <X className="h-5 w-5 ml-auto" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {/* Main Navigation Label */}
            {!sidebarCollapsed && (
              <div className="hidden lg:block px-3 py-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Main Menu
                </span>
              </div>
            )}
            
            {menuItems.map((item, index) => (
              <NavLink 
                key={item.href}
                item={item}
                index={index}
                pathname={pathname}
                sidebarCollapsed={sidebarCollapsed}
                onClick={() => isMobileMenuOpen && closeMobileMenu()}
              />
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-border/40 p-3 space-y-2">
            {/* User info - expanded desktop */}
            {!sidebarCollapsed && (
              <div className="hidden lg:flex items-center gap-3 rounded-lg bg-muted/50 p-3 border border-border/40">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold shadow-sm">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Admin User</p>
                  <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
                </div>
              </div>
            )}

            {/* Collapsed user avatar */}
            {sidebarCollapsed && (
              <div className="hidden lg:flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold shadow-sm">
                  A
                </div>
              </div>
            )}

            {/* Mobile user info */}
            <div className="lg:hidden flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              onClick={() => signOut({ callbackUrl: '/login' })}
              className={cn(
                'w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10',
                sidebarCollapsed && 'lg:justify-center lg:px-2'
              )}
              title={sidebarCollapsed ? 'Logout' : undefined}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className={cn(sidebarCollapsed && 'lg:hidden')}>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
