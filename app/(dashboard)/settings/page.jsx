'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Moon, Sun, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
  })
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert('Profile updated successfully!')
    }, 1000)
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (passwordData.new !== passwordData.confirm) {
      alert('Passwords do not match')
      return
    }
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setPasswordData({ current: '', new: '', confirm: '' })
      alert('Password changed successfully!')
    }, 1000)
  }

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <div>
                <Badge variant="default" className="capitalize">
                  {session?.user?.role}
                </Badge>
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current">Current Password</Label>
              <Input
                id="current"
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <Input
                id="new"
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input
                id="confirm"
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the dashboard looks</CardDescription>
        </CardHeader>
        <CardContent>
          {!mounted ? (
            <div className="h-32 flex items-center justify-center">
              <div className="animate-pulse text-muted-foreground">Loading theme options...</div>
            </div>
          ) : (
            <div className="space-y-4">
              <Label>Theme</Label>
              <RadioGroup value={theme} onValueChange={setTheme}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {themes.map((themeOption) => {
                    const Icon = themeOption.icon
                    const isSelected = theme === themeOption.value
                    return (
                      <div
                        key={themeOption.value}
                        className={cn(
                          'relative flex flex-col items-center gap-2 rounded-lg border-2 p-4 cursor-pointer transition-all hover:bg-accent',
                          isSelected
                            ? 'border-primary bg-accent'
                            : 'border-transparent'
                        )}
                        onClick={() => setTheme(themeOption.value)}
                      >
                        <RadioGroupItem
                          value={themeOption.value}
                          id={themeOption.value}
                          checked={isSelected}
                          onCheckedChange={setTheme}
                          className="absolute top-2 right-2"
                        />
                        <Icon className="h-6 w-6" />
                        <span className="text-sm font-medium">{themeOption.label}</span>
                      </div>
                    )
                  })}
                </div>
              </RadioGroup>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
