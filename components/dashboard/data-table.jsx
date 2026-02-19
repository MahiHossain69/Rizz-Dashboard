'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, MoreVertical, Search, Edit, Eye, Trash2, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

export function DataTable({ title, data, columns, onEdit, onView, onDelete }) {
  const tableRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [selectedRows, setSelectedRows] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [])

  // Filter data
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0
    
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleAllRows = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(paginatedData.map((item) => item.id))
    }
  }

  return (
    <Card ref={tableRef} className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {paginatedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No users found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding a new user'}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left">
                      <Checkbox
                        checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                        onCheckedChange={toggleAllRows}
                      />
                    </th>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="p-3 text-left text-sm font-medium text-muted-foreground"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSort(column.key)}
                          className="flex items-center gap-1 h-auto p-0 hover:text-foreground"
                        >
                          {column.label}
                          {sortConfig.key === column.key && (
                            sortConfig.direction === 'asc' ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )
                          )}
                        </Button>
                      </th>
                    ))}
                    <th className="p-3 text-left text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row) => (
                    <tr key={row.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-3">
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={() => toggleRowSelection(row.id)}
                        />
                      </td>
                      {columns.map((column) => (
                        <td key={column.key} className="p-3 text-sm">
                          {column.render ? column.render(row[column.key], row) : row[column.key]}
                        </td>
                      ))}
                      <td className="p-3">
                        <DropdownMenu>
                          {({ open, setOpen }) => (
                            <>
                              <DropdownMenuTrigger onClick={() => setOpen(!open)}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              {open && (
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => {
                                    if (onEdit) onEdit(row)
                                    setOpen(false)
                                  }}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    if (onView) onView(row)
                                    setOpen(false)
                                  }}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-red-500"
                                    onClick={() => {
                                      if (onDelete) onDelete(row)
                                      setOpen(false)
                                    }}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              )}
                            </>
                          )}
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-muted-foreground">
                Showing {sortedData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
                {sortedData.length} results
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  // Show first page, last page, current page, and pages around current
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="px-2 py-1 text-sm">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
