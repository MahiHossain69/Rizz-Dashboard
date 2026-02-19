import { NextResponse } from 'next/server'
import { mockUsers } from '@/lib/mock-data'

// In-memory storage (in production, use a real database)
let users = [...mockUsers]

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    
    const userIndex = users.findIndex(u => u.id === id)
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Update user
    users[userIndex] = {
      ...users[userIndex],
      name: body.name,
      email: body.email,
      role: body.role,
      status: body.status,
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json(users[userIndex])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    const userIndex = users.findIndex(u => u.id === id)
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Delete user
    const deletedUser = users[userIndex]
    users = users.filter(u => u.id !== id)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json(deletedUser)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
