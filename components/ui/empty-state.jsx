'use client'

import { useEffect, useRef } from 'react'
import { FileQuestion } from 'lucide-react'
import { Button } from './button'
import gsap from 'gsap'

export function EmptyState({ 
  icon: Icon = FileQuestion,
  title = 'No data found',
  description = 'There is no data to display at the moment.',
  action,
  actionLabel = 'Refresh'
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
      {action && (
        <Button onClick={action} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
