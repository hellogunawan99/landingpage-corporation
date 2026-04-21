# 🎯 Job Portal - SaaS Template

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/Prisma-5.22-5A67D8?style=for-the-badge&logo=prisma" alt="Prisma">
  <img src="https://img.shields.io/badge/Firebase-9.23-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase">
</p>

> **Production-ready job portal platform built with modern technologies. Perfect as a starting point for your next project or client engagement.**

---

## 📋 Overview

This is a **fully-featured job portal template** designed for quick deployment and easy customization. Whether you're building for a specific client or creating a SaaS product, this codebase provides a solid foundation to accelerate your development.

### 🎯 Key Features

<details open>
<summary><b>👤 For Job Seekers</b></summary>

| Feature | Description |
|---------|-------------|
| 🔐 **Secure Auth** | Google OAuth login via Firebase |
| 🔍 **Smart Search** | Browse and filter job listings effortlessly |
| 📄 **Easy Apply** | One-click applications |
| 📊 **Track Status** | Monitor your application progress |

</details>

<details>
<summary><b>🏢 For Employers</b></summary>

| Feature | Description |
|---------|-------------|
| 📝 **Post Jobs** | Create detailed job listings |
| 📈 **Manage Listings** | Edit, update, or close postings |
| 📥 **View Applications** | Review candidates in real-time |
| 🔔 **Instant Notifications** | Know when new applications arrive |

</details>

<details>
<summary><b>🛡️ For Administrators</b></summary>

| Feature | Description |
|---------|-------------|
| 📊 **Admin Dashboard** | Comprehensive analytics overview |
| 👥 **User Management** | Activate, suspend, or modify roles |
| 📝 **Audit Logs** | Full tracking of system changes |
| 🔒 **Role-Based Access** | Secure multi-level permissions |

</details>

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 14 (App Router) |
| **Language** | TypeScript 5.4 |
| **Styling** | Tailwind CSS 3.4 + NextUI |
| **Backend** | Next.js API Routes |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | Firebase Authentication |
| **Animations** | Framer Motion |
| **Validation** | Zod |

---

## 📁 Project Architecture

```
├── app/
│   ├── admin/                 # 🛡️ Admin Panel
│   │   ├── dashboard/
│   │   ├── audit-logs/
│   │   └── login/
│   ├── auth/                 # 🔐 Authentication
│   │   ├── login/
│   │   ├── register/
│   │   └── role-selection/
│   ├── dashboard/             # 👤 User Dashboard
│   │   ├── jobs/
│   │   └── applications/
│   ├── portal/                # 🌐 Public Portal
│   │   └── jobs/[id]/
│   └── page.tsx              # 🏠 Landing Page
├── lib/
│   ├── auth.ts               # Auth utilities
│   └── prisma.ts            # DB client
├── prisma/
│   └── schema.prisma        # Database schema
└── public/                  # Static assets
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Firebase project

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/your_db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Firebase (Client-side - must use NEXT_PUBLIC_)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Initialize Database

```bash
npx prisma generate
npx prisma db push
```

### 4. Launch Development Server

```bash
npm run dev
```

> ✨ Open [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open DB GUI |
| `npx prisma db seed` | Seed database |

---

## 🔐 Security

- ✅ Environment variables for all secrets
- ✅ Firebase Auth with Google OAuth
- ✅ Role-based access control (RBAC)
- ✅ Password hashing with bcrypt
- ✅ Input validation with Zod
- ✅ SQL injection protection via Prisma

---

## 📊 Database Models

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│   User     │────<│    Job      │────<│ Application  │
├─────────────┤     ├─────────────┤     ├──────────────┤
│ id         │     │ id          │     │ id           │
│ email      │     │ title       │     │ userId       │
│ name       │     │ description │     │ jobId        │
│ role       │     │ location    │     │ status       │
│ status     │     │ salary      │     │ appliedAt    │
│ createdAt  │     │ employerId  │     │ updatedAt    │
└─────────────┘     └─────────────┘     └──────────────┘
```

---

## 🔧 Customization Guide

### Branding

1. **Update Site Name**: Search and replace "Tunas Karya" with your brand name
2. **Update Logo**: Replace assets in `/public` folder
3. **Update Colors**: Modify `tailwind.config.js` and CSS variables
4. **Update Meta**: Edit metadata in `app/layout.tsx`

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication → Google sign-in provider
3. Copy your web app config to `.env.local`
4. Add authorized domains in Firebase Console

### Database Configuration

1. Set up PostgreSQL (local or cloud provider like Supabase, Neon, etc.)
2. Update `DATABASE_URL` in `.env.local`
3. Run `npx prisma db push` to sync schema

### Deployment

Recommended hosting platforms:
- **Vercel** - Best for Next.js apps (recommended)
- **Railway** - Easy PostgreSQL + Node.js hosting
- **Supabase** - PostgreSQL + Auth included

---

## 📦 What's Included

| Category | Details |
|----------|---------|
| **Auth** | Firebase Google OAuth, email/password, role selection |
| **Users** | Job seekers, employers, admins |
| **Jobs** | CRUD operations, filtering, search |
| **Applications** | Apply, track status, employer review |
| **Admin** | Dashboard, user management, audit logs |
| **UI** | Responsive design, animations, modern components |

---

## 💰 Licensing

This is an open-source template for your personal or commercial projects. 
Feel free to customize and use it as a base for client work or your own products.

---

<p align="center">
  <strong>Built with ❤️ using modern technologies</strong>
</p>
