'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

export function RadioGroup({ value, onValueChange, className, children, ...props }) {
  return (
    <div className={cn('grid gap-2', className)} role="radiogroup" {...props}>
      {children}
    </div>
  )
}

export function RadioGroupItem({ value, id, checked, onCheckedChange, className, disabled, ...props }) {
  const radioRef = useRef(null)
  const dotRef = useRef(null)

  const handleClick = () => {
    if (disabled) return
    
    if (radioRef.current) {
      gsap.fromTo(
        radioRef.current,
        { scale: 0.8 },
        { scale: 1, duration: 0.2, ease: 'back.out(1.7)' }
      )
    }
    
    if (dotRef.current && !checked) {
      gsap.fromTo(
        dotRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.3, ease: 'back.out(2)' }
      )
    }
    
    onCheckedChange?.(value)
  }

  return (
    <button
      ref={radioRef}
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background transition-all',
        'hover:bg-primary/10',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        checked && 'border-primary',
        className
      )}
      {...props}
    >
      {checked && (
        <span ref={dotRef} className="flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-primary" />
        </span>
      )}
    </button>
  )
}
