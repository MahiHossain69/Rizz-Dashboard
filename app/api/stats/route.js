import { NextResponse } from 'next/server'
import { mockStats } from '@/lib/mock-data'

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return NextResponse.json(mockStats)
}
