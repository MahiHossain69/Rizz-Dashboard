'use client'

import { useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

export function StatCard({ title, value, change, trend, icon: Icon }) {
  const isPositive = trend === 'up'
  const cardRef = useRef(null)
  const valueRef = useRef(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }

    if (valueRef.current) {
      const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''))
      if (!isNaN(numericValue)) {
        gsap.fromTo(
          valueRef.current,
          { innerText: 0 },
          {
            innerText: numericValue,
            duration: 1.5,
            ease: 'power1.out',
            snap: { innerText: 1 },
            onUpdate: function() {
              const current = this.targets()[0].innerText
              valueRef.current.innerText = value.includes('$') 
                ? `$${parseFloat(current).toLocaleString()}` 
                : value.includes('%')
                ? `${parseFloat(current).toFixed(2)}%`
                : parseFloat(current).toLocaleString()
            }
          }
        )
      }
    }
  }, [value])

  return (
    <Card ref={cardRef} className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div ref={valueRef} className="text-2xl font-bold">{value}</div>
        <div className="mt-1 flex items-center gap-1 text-xs">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span
            className={cn(
              'font-medium',
              isPositive ? 'text-green-500' : 'text-red-500'
            )}
          >
            {change > 0 ? '+' : ''}{change}%
          </span>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}
