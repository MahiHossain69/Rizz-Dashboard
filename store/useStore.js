import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      notifications: [],
      addNotification: (notification) => 
        set((state) => ({ 
          notifications: [notification, ...state.notifications] 
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          )
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'dashboard-storage',
    }
  )
)
