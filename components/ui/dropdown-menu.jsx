'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useClickOutside } from '@/hooks/useClickOutside'
import gsap from 'gsap'

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false)
  const ref = useClickOutside(() => setOpen(false))
  
  return (
    <div ref={ref} className="relative">
      {children({ open, setOpen })}
    </div>
  )
}

export function DropdownMenuTrigger({ children, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  )
}

export function DropdownMenuContent({ children, align = 'end', className }) {
  const contentRef = useRef(null)
  
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { 
          opacity: 0, 
          y: -10,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        }
      )
    }
  }, [])

  const alignments = {
    start: 'left-0',
    end: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  }

  return (
    <div
      ref={contentRef}
      className={cn(
        'absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg',
        alignments[align],
        className
      )}
    >
      {children}
    </div>
  )
}

export function DropdownMenuItem({ children, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-all duration-150 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] focus:bg-accent focus:text-accent-foreground',
        className
      )}
    >
      {children}
    </div>
  )
}

export function DropdownMenuSeparator({ className }) {
  return (
    <div className={cn('-mx-1 my-1 h-px bg-muted', className)} />
  )
}
