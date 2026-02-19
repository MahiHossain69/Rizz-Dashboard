'use client'

import { useRef, forwardRef, useImperativeHandle } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

export const Input = forwardRef(function Input({ className, type, ...props }, ref) {
  const inputRef = useRef(null)

  // Expose the input ref to parent components
  useImperativeHandle(ref, () => inputRef.current)

  const handleFocus = () => {
    gsap.to(inputRef.current, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power2.out'
    })
  }

  const handleBlur = () => {
    gsap.to(inputRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }

  return (
    <input
      ref={inputRef}
      type={type}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
        className
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'
