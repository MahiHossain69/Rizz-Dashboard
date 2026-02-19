'use client'

import { ChartCard } from '@/components/dashboard/chart-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockRevenueData, mockSalesData, mockTrafficData } from '@/lib/mock-data'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Analytics</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Deep dive into your metrics and performance.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Page Views', value: '124,532', icon: Activity, color: 'text-blue-500' },
          { label: 'Unique Visitors', value: '45,231', icon: Users, color: 'text-green-500' },
          { label: 'Avg. Session', value: '4m 32s', icon: TrendingUp, color: 'text-purple-500' },
          { label: 'Revenue/User', value: '$19.45', icon: DollarSign, color: 'text-orange-500' },
        ].map((metric, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4">
        <ChartCard
          title="Revenue Trend (12 Months)"
          type="line"
          data={mockRevenueData}
        />
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
        <ChartCard
          title="Sales by Day"
          type="bar"
          data={mockSalesData}
        />
        <ChartCard
          title="Traffic Distribution"
          type="pie"
          data={mockTrafficData}
        />
      </div>

      {/* Additional Insights */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { page: '/dashboard', views: '12,543' },
                { page: '/products', views: '8,234' },
                { page: '/pricing', views: '6,123' },
                { page: '/about', views: '4,567' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.page}</span>
                  <span className="font-medium">{item.views}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { source: 'Google', visits: '8,234' },
                { source: 'Facebook', visits: '5,123' },
                { source: 'Twitter', visits: '3,456' },
                { source: 'LinkedIn', visits: '2,345' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.source}</span>
                  <span className="font-medium">{item.visits}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { device: 'Desktop', percentage: '65%' },
                { device: 'Mobile', percentage: '28%' },
                { device: 'Tablet', percentage: '7%' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.device}</span>
                    <span className="font-medium">{item.percentage}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: item.percentage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
