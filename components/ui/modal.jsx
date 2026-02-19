'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useClickOutside } from '@/hooks/useClickOutside'
import gsap from 'gsap'

export function Modal({ isOpen, onClose, children, className }) {
  const modalRef = useRef(null)
  const backdropRef = useRef(null)

  useEffect(() => {
    if (isOpen && modalRef.current && backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      )
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
      )
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div 
        ref={modalRef}
        className={cn(
          'relative z-50 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-background p-4 sm:p-6 shadow-2xl',
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-sm opacity-70 transition-all hover:opacity-100 hover:rotate-90"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  )
}

export function ModalHeader({ children, className }) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  )
}

export function ModalTitle({ children, className }) {
  return (
    <h2 className={cn('text-lg font-semibold', className)}>
      {children}
    </h2>
  )
}

export function ModalContent({ children, className }) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  )
}

export function ModalFooter({ children, className }) {
  return (
    <div className={cn('mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2', className)}>
      {children}
    </div>
  )
}
