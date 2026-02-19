'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, Calendar } from 'lucide-react'

export default function ReportsPage() {
  const reports = [
    {
      title: 'Monthly Revenue Report',
      description: 'Detailed breakdown of revenue for the current month',
      date: 'February 2026',
      icon: FileText,
    },
    {
      title: 'User Activity Report',
      description: 'User engagement and activity metrics',
      date: 'February 2026',
      icon: FileText,
    },
    {
      title: 'Sales Performance',
      description: 'Sales metrics and conversion rates',
      date: 'February 2026',
      icon: FileText,
    },
    {
      title: 'Traffic Analysis',
      description: 'Website traffic sources and patterns',
      date: 'February 2026',
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Reports</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Generate and download various reports.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
        {reports.map((report, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{report.date}</span>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Report Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Reports Generated</p>
              <p className="text-2xl font-bold">127</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Last Generated</p>
              <p className="text-2xl font-bold">2 hours ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
