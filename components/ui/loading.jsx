'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function LoadingSpinner({ size = 'md' }) {
  const spinnerRef = useRef(null)

  useEffect(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: 'linear'
      })
    }
  }, [])

  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div ref={spinnerRef} className={`${sizes[size]} animate-spin`}>
      <svg
        className="h-full w-full text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

export function LoadingPage() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen items-center justify-center"
    >
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

export function LoadingOverlay({ show }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (overlayRef.current) {
      if (show) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.2
        })
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.2
        })
      }
    }
  }, [show])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{ opacity: 0, pointerEvents: 'none' }}
    >
      <div className="rounded-lg bg-background p-6 shadow-xl">
        <LoadingSpinner size="lg" />
      </div>
    </div>
  )
}
