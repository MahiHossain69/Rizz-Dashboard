'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

export function Card({ className, ...props }) {
  const cardRef = useRef(null)

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -4,
      boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.15)',
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm transition-all',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
}
