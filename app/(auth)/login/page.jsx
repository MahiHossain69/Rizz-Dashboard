'use client'

import { useState, useEffect, useRef } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutDashboard } from 'lucide-react'
import gsap from 'gsap'

export default function LoginPage() {
  const cardRef = useRef(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )
    }
  }, [])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card ref={cardRef} className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <CardTitle className="text-xl sm:text-2xl">Welcome back</CardTitle>
          <CardDescription className="text-sm">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>

          <div className="mt-6 rounded-lg bg-muted p-3 sm:p-4 text-xs">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p className="text-[11px] sm:text-xs">Admin: admin@example.com / admin123</p>
            <p className="text-[11px] sm:text-xs">User: user@example.com / user123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
