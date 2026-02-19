'use client'

import { useRef } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

export function Checkbox({ checked, onCheckedChange, className, disabled, ...props }) {
  const checkboxRef = useRef(null)
  const checkRef = useRef(null)

  const handleClick = () => {
    if (disabled) return
    
    if (checkboxRef.current) {
      gsap.fromTo(
        checkboxRef.current,
        { scale: 0.8 },
        { scale: 1, duration: 0.2, ease: 'back.out(1.7)' }
      )
    }
    
    if (checkRef.current && !checked) {
      gsap.fromTo(
        checkRef.current,
        { scale: 0, rotate: -90 },
        { scale: 1, rotate: 0, duration: 0.3, ease: 'back.out(2)' }
      )
    }
    
    onCheckedChange?.(!checked)
  }

  return (
    <button
      ref={checkboxRef}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background transition-all',
        'hover:bg-primary/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        checked && 'bg-primary text-primary-foreground border-primary',
        className
      )}
      {...props}
    >
      {checked && (
        <div ref={checkRef} className="flex items-center justify-center">
          <Check className="h-3 w-3" strokeWidth={3} />
        </div>
      )}
    </button>
  )
}
