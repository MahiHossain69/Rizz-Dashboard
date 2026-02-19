'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Line, Bar, Pie } from 'react-chartjs-2'
import gsap from 'gsap'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export function ChartCard({ title, type = 'line', data, options = {} }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: type === 'pie' ? 1.5 : 2,
    plugins: {
      legend: {
        display: type === 'pie',
        position: 'bottom',
        labels: {
          padding: 10,
          font: {
            size: 11,
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: type !== 'pie' ? {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          padding: 8,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          padding: 8,
        },
      },
    } : undefined,
    layout: {
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
    },
  }

  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      borderColor: dataset.borderColor || 'rgb(99, 102, 241)',
      backgroundColor: dataset.backgroundColor || 'rgba(99, 102, 241, 0.1)',
      borderWidth: 2,
      tension: 0.4,
      fill: type === 'line',
    })),
  }

  const mergedOptions = { ...defaultOptions, ...options }

  return (
    <Card ref={cardRef} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-4 sm:px-6">
        <div className="w-full">
          {type === 'line' && <Line data={chartData} options={mergedOptions} />}
          {type === 'bar' && <Bar data={chartData} options={mergedOptions} />}
          {type === 'pie' && <Pie data={chartData} options={mergedOptions} />}
        </div>
      </CardContent>
    </Card>
  )
}
