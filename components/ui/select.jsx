'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useClickOutside } from '@/hooks/useClickOutside'
import gsap from 'gsap'

export function Select({ value, onValueChange, children, className, placeholder = 'Select...', ...props }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useClickOutside(() => setIsOpen(false))
  const contentRef = useRef(null)
  const triggerRef = useRef(null)

  // Extract options from children
  const options = Array.isArray(children) ? children : [children]
  const selectedOption = options.find(child => child.props.value === value)

  useEffect(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
      )
    }
  }, [isOpen])

  const handleSelect = (optionValue) => {
    onValueChange?.(optionValue)
    setIsOpen(false)
    
    if (triggerRef.current) {
      gsap.fromTo(
        triggerRef.current,
        { scale: 0.98 },
        { scale: 1, duration: 0.2, ease: 'back.out(1.7)' }
      )
    }
  }

  const handleTriggerClick = () => {
    setIsOpen(!isOpen)
    if (triggerRef.current) {
      gsap.to(triggerRef.current, {
        scale: isOpen ? 1 : 0.98,
        duration: 0.1
      })
    }
  }

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleTriggerClick}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all',
          'hover:bg-accent hover:text-accent-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          !value && 'text-muted-foreground',
          className
        )}
        {...props}
      >
        <span className="block truncate">
          {selectedOption ? selectedOption.props.children : placeholder}
        </span>
        <ChevronDown className={cn(
          'h-4 w-4 opacity-50 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div
          ref={contentRef}
          className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border bg-popover shadow-lg"
        >
          <div className="max-h-60 overflow-auto p-1">
            {options.map((option) => {
              const isSelected = option.props.value === value
              return (
                <button
                  key={option.props.value}
                  type="button"
                  onClick={() => handleSelect(option.props.value)}
                  className={cn(
                    'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus:bg-accent focus:text-accent-foreground',
                    isSelected && 'bg-accent'
                  )}
                >
                  <span className="flex-1 text-left">{option.props.children}</span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export function SelectItem({ value, children }) {
  // This is just a placeholder component for JSX syntax
  // The actual rendering is handled by the Select component
  return null
}

export function SelectTrigger({ children, className, ...props }) {
  return (
    <div className={cn('relative', className)} {...props}>
      {children}
    </div>
  )
}

export function SelectValue({ placeholder, children }) {
  return children || <span className="text-muted-foreground">{placeholder}</span>
}

export function SelectContent({ children }) {
  return <>{children}</>
}
