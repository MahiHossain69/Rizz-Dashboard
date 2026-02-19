import { NextResponse } from 'next/server'
import { mockUsers } from '@/lib/mock-data'

// In-memory storage (in production, use a real database)
let users = [...mockUsers]

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return NextResponse.json(users)
}

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Create new user
    const newUser = {
      id: String(users.length + 1),
      name: body.name,
      email: body.email,
      role: body.role || 'user',
      status: body.status || 'active',
      createdAt: new Date().toISOString(),
      lastLogin: null,
    }
    
    users.push(newUser)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
