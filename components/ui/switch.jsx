'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

export function Switch({ checked, onCheckedChange, className, ...props }) {
  const thumbRef = useRef(null)

  const handleClick = () => {
    if (thumbRef.current) {
      gsap.to(thumbRef.current, {
        x: checked ? 0 : 20,
        duration: 0.2,
        ease: 'power2.out'
      })
    }
    onCheckedChange?.(!checked)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-primary' : 'bg-input',
        className
      )}
      {...props}
    >
      <span
        ref={thumbRef}
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  )
}
