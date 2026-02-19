'use client'

import { useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/dashboard/stat-card'
import { ChartCard } from '@/components/dashboard/chart-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { mockRevenueData, mockSalesData, mockTrafficData } from '@/lib/mock-data'
import { formatCurrency, formatNumber, cn } from '@/lib/utils'
import gsap from 'gsap'

export default function DashboardPage() {
  const headerRef = useRef(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [])
  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await fetch('/api/stats')
      return res.json()
    },
  })

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div ref={headerRef}>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.revenue.value)}
          change={stats.revenue.change}
          trend={stats.revenue.trend}
          icon={DollarSign}
        />
        <StatCard
          title="Total Users"
          value={formatNumber(stats.users.value)}
          change={stats.users.change}
          trend={stats.users.trend}
          icon={Users}
        />
        <StatCard
          title="Total Sales"
          value={formatNumber(stats.sales.value)}
          change={stats.sales.change}
          trend={stats.sales.trend}
          icon={ShoppingCart}
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversion.value}%`}
          change={stats.conversion.change}
          trend={stats.conversion.trend}
          icon={TrendingUp}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
        <ChartCard
          title="Revenue Overview"
          type="line"
          data={mockRevenueData}
        />
        <ChartCard
          title="Weekly Sales"
          type="bar"
          data={mockSalesData}
        />
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
        <ChartCard
          title="Traffic Sources"
          type="pie"
          data={mockTrafficData}
        />
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 px-4 sm:px-6">
            <div className="space-y-3">
              {[
                { action: 'New user registered', time: '2 minutes ago', type: 'user' },
                { action: 'Payment received', time: '15 minutes ago', type: 'payment' },
                { action: 'New order placed', time: '1 hour ago', type: 'order' },
                { action: 'User updated profile', time: '2 hours ago', type: 'update' },
                { action: 'New subscription', time: '3 hours ago', type: 'subscription' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      activity.type === 'payment' && "bg-green-500",
                      activity.type === 'user' && "bg-blue-500",
                      activity.type === 'order' && "bg-purple-500",
                      activity.type === 'update' && "bg-orange-500",
                      activity.type === 'subscription' && "bg-pink-500"
                    )} />
                    <span className="text-sm font-medium">{activity.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
