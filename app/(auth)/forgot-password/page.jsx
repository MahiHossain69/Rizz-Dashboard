'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutDashboard, ArrowLeft } from 'lucide-react'
import gsap from 'gsap'

export default function ForgotPasswordPage() {
  const cardRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card ref={cardRef} className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Forgot password?</CardTitle>
          <CardDescription>
            {submitted
              ? 'Check your email for reset instructions'
              : 'Enter your email to receive reset instructions'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send reset link'}
              </Button>
            </form>
          ) : (
            <div className="rounded-lg bg-green-500/10 p-4 text-center text-sm text-green-600">
              Password reset link has been sent to your email
            </div>
          )}

          <div className="mt-4 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
