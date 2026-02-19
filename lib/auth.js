import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret'

// Mock user database
export const users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10),
    name: 'Admin User',
    role: 'admin',
    avatar: null,
  },
  {
    id: '2',
    email: 'user@example.com',
    password: bcrypt.hashSync('user123', 10),
    name: 'Regular User',
    role: 'user',
    avatar: null,
  },
]

export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export function findUserByEmail(email) {
  return users.find(user => user.email === email)
}

export function findUserById(id) {
  return users.find(user => user.id === id)
}
