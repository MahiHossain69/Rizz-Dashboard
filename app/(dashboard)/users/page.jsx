'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DataTable } from '@/components/dashboard/data-table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectItem } from '@/components/ui/select'
import { formatDate } from '@/lib/utils'
import { UserPlus } from 'lucide-react'
import { useToast } from '@/components/ui/toast'

export default function UsersPage() {
  const queryClient = useQueryClient()
  const { addToast } = useToast()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
  })

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users')
      return res.json()
    },
  })

  // Add user mutation
  const addUserMutation = useMutation({
    mutationFn: async (newUser) => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      setIsAddModalOpen(false)
      setFormData({ name: '', email: '', role: 'user', status: 'active' })
      addToast({
        title: 'Success',
        description: 'User added successfully',
        variant: 'success',
      })
    },
  })

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      setIsEditModalOpen(false)
      setSelectedUser(null)
      addToast({
        title: 'Success',
        description: 'User updated successfully',
        variant: 'success',
      })
    },
  })

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      setIsDeleteModalOpen(false)
      setSelectedUser(null)
      addToast({
        title: 'Success',
        description: 'User deleted successfully',
        variant: 'success',
      })
    },
  })

  const handleAddUser = () => {
    addUserMutation.mutate(formData)
  }

  const handleEditUser = () => {
    updateUserMutation.mutate({
      id: selectedUser.id,
      data: formData,
    })
  }

  const handleDeleteUser = () => {
    deleteUserMutation.mutate(selectedUser.id)
  }

  const openEditModal = (user) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
    setIsEditModalOpen(true)
  }

  const openViewModal = (user) => {
    setSelectedUser(user)
    setIsViewModalOpen(true)
  }

  const openDeleteModal = (user) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <Badge variant={value === 'admin' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const variants = {
          active: 'success',
          inactive: 'secondary',
          pending: 'warning',
        }
        return <Badge variant={variants[value]}>{value}</Badge>
      },
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (value) => formatDate(value),
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: (value) => (value ? formatDate(value) : 'Never'),
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage your users and their permissions.</p>
        </div>
        <Skeleton className="h-96" />
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Users</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your users and their permissions.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <DataTable 
        title="All Users" 
        data={users} 
        columns={columns}
        onEdit={openEditModal}
        onView={openViewModal}
        onDelete={openDeleteModal}
      />

      {/* Add User Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>Add New User</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </Select>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddUser} disabled={addUserMutation.isPending}>
            {addUserMutation.isPending ? 'Adding...' : 'Add User'}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>Edit User</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </Select>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleEditUser} disabled={updateUserMutation.isPending}>
            {updateUserMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </ModalFooter>
      </Modal>

      {/* View User Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>User Details</ModalTitle>
        </ModalHeader>
        <ModalContent>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="mt-1 font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="mt-1 font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Role</Label>
                  <div className="mt-1">
                    <Badge variant={selectedUser.role === 'admin' ? 'default' : 'secondary'}>
                      {selectedUser.role}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    <Badge variant={
                      selectedUser.status === 'active' ? 'success' :
                      selectedUser.status === 'pending' ? 'warning' : 'secondary'
                    }>
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Created At</Label>
                  <p className="mt-1 font-medium">{formatDate(selectedUser.createdAt)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Last Login</Label>
                  <p className="mt-1 font-medium">
                    {selectedUser.lastLogin ? formatDate(selectedUser.lastLogin) : 'Never'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>Delete User</ModalTitle>
        </ModalHeader>
        <ModalContent>
          {selectedUser && (
            <div className="space-y-4">
              <p>Are you sure you want to delete this user?</p>
              <div className="rounded-lg bg-muted p-4">
                <p className="font-medium">{selectedUser.name}</p>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
              </div>
              <p className="text-sm text-destructive">This action cannot be undone.</p>
            </div>
          )}
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDeleteUser}
            disabled={deleteUserMutation.isPending}
          >
            {deleteUserMutation.isPending ? 'Deleting...' : 'Delete User'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
