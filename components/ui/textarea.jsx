'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

export function Textarea({ className, ...props }) {
  const textareaRef = useRef(null)

  const handleFocus = () => {
    if (textareaRef.current) {
      gsap.to(textareaRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out'
      })
    }
  }

  const handleBlur = () => {
    if (textareaRef.current) {
      gsap.to(textareaRef.current, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      })
    }
  }

  return (
    <textarea
      ref={textareaRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        'flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}
