// Mock data for dashboard
export const mockStats = {
  revenue: {
    value: 45231.89,
    change: 20.1,
    trend: 'up'
  },
  users: {
    value: 2350,
    change: 180.1,
    trend: 'up'
  },
  sales: {
    value: 12234,
    change: 19,
    trend: 'up'
  },
  conversion: {
    value: 3.24,
    change: -4.3,
    trend: 'down'
  }
}

export const mockRevenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Revenue',
    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
  }]
}

export const mockSalesData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Sales',
    data: [1200, 1900, 1500, 2100, 1800, 2400, 2200],
  }]
}

export const mockTrafficData = {
  labels: ['Direct', 'Organic Search', 'Referral', 'Social Media', 'Email'],
  datasets: [{
    data: [35, 30, 15, 12, 8],
    backgroundColor: [
      'rgba(99, 102, 241, 0.8)',
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)',
    ],
  }]
}

export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-02-17'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-20',
    lastLogin: '2024-02-16'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-02-01',
    lastLogin: '2024-02-10'
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-05',
    lastLogin: '2024-02-17'
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'user',
    status: 'pending',
    createdAt: '2024-02-15',
    lastLogin: null
  },
]

export const mockNotifications = [
  {
    id: '1',
    title: 'New user registered',
    message: 'Alice Williams just signed up',
    time: '5 minutes ago',
    read: false
  },
  {
    id: '2',
    title: 'Payment received',
    message: 'Payment of $299 received from John Doe',
    time: '1 hour ago',
    read: false
  },
  {
    id: '3',
    title: 'Server maintenance',
    message: 'Scheduled maintenance on Feb 20',
    time: '3 hours ago',
    read: true
  },
]
