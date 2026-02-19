# 🚀 SaaS Dashboard Application

A production-ready Rizz Dashboard application built with Next.js 16, featuring authentication, role-based access control, analytics, GSAP animations, and a professional Stripe-style UI.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)
![GSAP](https://img.shields.io/badge/GSAP-3-88ce02)
![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-orange)

## ✨ New Features

- **Next.js 16**: Latest version with Turbopack (70% faster builds!)
- **React 19.2**: Enhanced performance and new features
- **Latest ShadCN Components**: All form elements with animations
- **GSAP Animations**: Smooth, professional animations throughout
- **Click Outside to Close**: All dropdowns and modals
- **Enhanced Interactions**: Hover effects, focus states, micro-interactions
- **Fully Functional**: All buttons, dropdowns, and actions working
- **Animated Counters**: Stats animate from 0 to their values
- **Smooth Transitions**: Every interaction is polished

## Features

- **Authentication System**
  - Login / Register / Forgot Password
  - JWT-based session management
  - Role-based access (Admin / User)
  - Protected routes with middleware

- **Dashboard Overview**
  - Real-time statistics cards
  - Interactive charts (Line, Bar, Pie)
  - Revenue and sales analytics
  - Traffic source visualization

- **User Management**
  - Advanced data table with sorting, filtering, search
  - Pagination and bulk selection
  - User status badges
  - Action dropdowns

- **Reports & Analytics**
  - Detailed analytics page
  - Downloadable reports
  - Traffic and performance metrics

- **Settings**
  - Profile management
  - Password change
  - Dark/Light/System theme toggle

- **UI/UX Features**
  - Collapsible sidebar
  - Responsive design (Desktop/Tablet/Mobile)
  - Loading skeletons
  - Toast notifications
  - Modal components
  - Professional Stripe-style design

## Tech Stack

- **Framework:** Next.js 16.1 (App Router) with Turbopack
- **Language:** JavaScript (JSX)
- **Runtime:** React 19.2
- **Styling:** Tailwind CSS 3.4
- **Animations:** GSAP 3.14
- **UI Components:** ShadCN UI (Latest patterns)
- **State Management:** Zustand 5.0
- **Data Fetching:** TanStack Query 5.90
- **Charts:** Chart.js + react-chartjs-2
- **Authentication:** NextAuth.js
- **Theme:** next-themes 0.4
- **Icons:** Lucide React 0.574

## 🎬 Animations

All animations are powered by GSAP for smooth, professional motion:

- **Page Transitions**: Smooth fade and slide effects
- **Card Animations**: Hover lift with shadow
- **Button Effects**: Scale on hover, bounce on click
- **Number Counters**: Animated stat values
- **Dropdown Menus**: Fade and scale entrance
- **Modal Dialogs**: Backdrop fade + content bounce
- **Navigation**: Staggered link animations
- **Input Focus**: Subtle scale effects

See [FEATURES.md](FEATURES.md) for complete animation details.

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

📖 **Quick Start Guide**: See [QUICKSTART.md](QUICKSTART.md) for detailed walkthrough.

### Demo Credentials

**Admin Account:**
- Email: admin@example.com
- Password: admin123

**User Account:**
- Email: user@example.com
- Password: user123

## Project Structure

```
saas-dashboard/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── dashboard/
│   │   ├── analytics/
│   │   ├── users/
│   │   ├── reports/
│   │   └── settings/
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   ├── stats/
│   │   └── users/
│   └── layout.js
├── components/
│   ├── ui/                  # Reusable UI components
│   └── dashboard/           # Dashboard-specific components
├── lib/                     # Utilities and helpers
├── store/                   # Zustand state management
├── hooks/                   # Custom React hooks
└── middleware.js            # Route protection
```

## Key Features Explained

### Authentication & Authorization

- JWT-based authentication with NextAuth.js
- Middleware protection for dashboard routes
- Role-based access control (Admin vs User)
- Session persistence

### Dashboard Components

- **StatCard:** Displays key metrics with trend indicators
- **ChartCard:** Renders Line, Bar, and Pie charts
- **DataTable:** Advanced table with sorting, filtering, pagination
- **Sidebar:** Collapsible navigation menu
- **Navbar:** Search, notifications, theme toggle, profile

### Responsive Design

- Mobile-first approach
- Sidebar auto-collapses on mobile
- Optimized for all screen sizes
- Touch-friendly interactions

### Theme System

- Light/Dark/System modes
- Persistent theme selection
- Smooth transitions
- Consistent color palette

## Environment Variables

Create a `.env.local` file:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
JWT_SECRET=your-jwt-secret-key-change-this
```

## Design System

- **Border Radius:** 16px (lg), 12px (md), 8px (sm)
- **Spacing:** 8px base system
- **Typography:** Inter font family
- **Colors:** Neutral gray palette with primary accent
- **Shadows:** Soft, subtle shadows

## Build for Production

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this project for your own purposes.
