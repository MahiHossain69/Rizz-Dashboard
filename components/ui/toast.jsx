'use client'

import { createContext, useContext, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = (toast) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { ...toast, id }])
    setTimeout(() => removeToast(id), toast.duration || 3000)
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

function Toast({ title, description, variant = 'default', onClose }) {
  const variants = {
    default: 'bg-background border',
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
  }

  return (
    <div
      className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg',
        variants[variant]
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-1">
            {title && <p className="text-sm font-semibold">{title}</p>}
            {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="ml-4 inline-flex rounded-md hover:opacity-70"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
