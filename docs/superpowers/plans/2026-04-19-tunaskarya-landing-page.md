# Tunaskarya Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, dynamic landing page for Tunaskarya - an overseas career agency from Batam, Indonesia.

**Architecture:** Next.js 14+ App Router with shadcn/ui components, Tailwind CSS with custom green/teal theme. Single-page landing with smooth scroll sections.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion (animations)

---

## File Structure

```
tunaskarya/
├── app/
│   ├── layout.tsx          # Root layout with fonts, providers
│   ├── page.tsx            # Landing page (all sections)
│   ├── globals.css         # Global styles + Tailwind
│   └── components/
│       ├── ui/             # shadcn/ui components
│       ├── navbar.tsx      # Navigation bar
│       ├── hero.tsx        # Hero section
│       ├── destinations.tsx # Featured destinations
│       ├── categories.tsx   # Job categories grid
│       ├── stats.tsx        # Statistics counter
│       ├── how-it-works.tsx # Process explanation
│       ├── testimonials.tsx  # Success stories
│       ├── cta.tsx          # Call to action
│       └── footer.tsx       # Footer
├── components.json         # shadcn/ui config
├── tailwind.config.ts      # Custom theme colors
└── package.json
```

---

## Tasks

### Task 1: Initialize Next.js Project with shadcn/ui

**Files:**
- Create: `package.json`
- Create: `tailwind.config.ts`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `components.json`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx`

- [ ] **Step 1: Initialize Next.js project**

Run in `/Users/gunawan/dev/web/tunaskarya`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --no-git
```

When prompted, select:
- TypeScript: Yes
- Tailwind: Yes
- ESLint: Yes
- App Router: Yes
- Import Alias: @/*
- Turbopack: No

- [ ] **Step 2: Initialize shadcn/ui**

Run:
```bash
npx shadcn@latest init
```

Select:
- Style: Default
- Base Color: Neutral
- CSS file: app/globals.css
- CSS variables: Yes
- Custom prefix: No
- tailwind.config.ts: tailwind.config.ts
- Components: Yes
- Utils: Yes
- App Router: Yes

- [ ] **Step 3: Install additional dependencies**

```bash
npm install framer-motion lucide-react
```

- [ ] **Step 4: Add shadcn/ui components**

```bash
npx shadcn@latest add button card badge
```

- [ ] **Step 5: Configure custom theme in tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#10b981",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#14b8a6",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#0d9488",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

- [ ] **Step 6: Update app/globals.css with custom properties**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 160 84% 39%;
    --primary-foreground: 210 40% 98%;
    --secondary: 174 85% 37%;
    --secondary-foreground: 210 40% 98%;
    --accent: 177 85% 35%;
    --accent-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 160 84% 39%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 7: Update app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tunaskarya | Connecting Talent to Global Opportunities",
  description:
    "Your trusted partner for overseas career opportunities. Find jobs in Japan, China, Malaysia, and Singapore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create minimal app/page.tsx**

```tsx
export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-primary">Tunaskarya</h1>
      <p>Connecting Talent to Global Opportunities</p>
    </main>
  );
}
```

- [ ] **Step 9: Test the setup**

Run:
```bash
npm run dev
```

Open http://localhost:3000 and verify:
- Page loads without errors
- Primary green color (#10b981) is applied to heading
- No console errors

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: Initialize Next.js project with shadcn/ui and custom green/teal theme"
```

---

### Task 2: Build Navigation Component

**Files:**
- Create: `app/components/navbar.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create navbar component**

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#destinations", label: "Destinations" },
  { href: "#categories", label: "Categories" },
  { href: "#how-it-works", label: "How It Works" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tunaskarya
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/portal">Job Portal</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-600 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/portal" onClick={() => setIsMobileMenuOpen(false)}>
                  Job Portal
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Update app/page.tsx to use Navbar**

```tsx
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <h1>Tunaskarya Landing Page</h1>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Test the navbar**

Refresh page and verify:
- Logo displays with gradient
- Desktop navigation links work
- Mobile menu toggles
- Scroll effect changes navbar background

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Add navigation component with mobile menu"
```

---

### Task 3: Build Hero Section

**Files:**
- Create: `app/components/hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create hero component**

```tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Briefcase, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10" />

      {/* Animated Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">From Batam, Indonesia to the World</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
          >
            Connecting Talent to
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Global Opportunities
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Your trusted partner for overseas career opportunities in Japan, China,
            Malaysia, and Singapore. Start your international career journey today.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              asChild
            >
              <Link href="/portal">
                <Briefcase className="mr-2 h-5 w-5" />
                Find Your Dream Job
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
              asChild
            >
              <Link href="/auth/register">
                Post a Job
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: "500+", label: "Workers Placed" },
              { value: "50+", label: "Partner Companies" },
              { value: "10+", label: "Years Experience" },
              { value: "4", label: "Countries" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-gray-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Update page.tsx**

```tsx
import Navbar from "./components/navbar";
import Hero from "./components/hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Test the hero section**

Refresh page and verify:
- Gradient background displays
- Animated circles pulse
- Heading animates in
- CTA buttons are clickable
- Stats preview shows
- Scroll indicator animates

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Add hero section with animations"
```

---

### Task 4: Build Destinations Section

**Files:**
- Create: `app/components/destinations.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create destinations component**

```tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const destinations = [
  {
    country: "Japan",
    flag: "🇯🇵",
    description: "Experience world-class technology and unique work culture",
    jobCount: 120,
    color: "bg-red-500",
  },
  {
    country: "China",
    flag: "🇨🇳",
    description: "Dynamic economy with diverse industry opportunities",
    jobCount: 85,
    color: "bg-yellow-500",
  },
  {
    country: "Malaysia",
    flag: "🇲🇾",
    description: "Southeast Asian hub with familiar culture",
    jobCount: 150,
    color: "bg-blue-600",
  },
  {
    country: "Singapore",
    flag: "🇸🇬",
    description: "Global financial center and innovation hub",
    jobCount: 95,
    color: "bg-red-600",
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Global Career Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore exciting job opportunities in top destinations across Asia
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                {/* Flag Header */}
                <div className={`${dest.color} h-32 flex items-center justify-center relative`}>
                  <span className="text-7xl">{dest.flag}</span>
                  <Badge className="absolute top-4 right-4 bg-white/20 text-white hover:bg-white/30">
                    {dest.jobCount} jobs
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {dest.country}
                  </h3>
                  <p className="text-gray-600 text-sm">{dest.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update page.tsx**

```tsx
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Destinations from "./components/destinations";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Destinations />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Test the destinations section**

Scroll to destinations section and verify:
- All 4 country cards display
- Flags render correctly
- Job counts show
- Cards have hover effects

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Add destinations section with country cards"
```

---

### Task 5: Build Job Categories Section

**Files:**
- Create: `app/components/categories.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create categories component**

```tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Factory,
  UtensilsCrossed,
  Code,
  HardHat,
  Stethoscope,
  Briefcase,
  Building2,
  Car,
} from "lucide-react";

const categories = [
  {
    name: "Manufacturing",
    icon: Factory,
    description: "Factory work, assembly, production",
    color: "bg-blue-500",
    count: 234,
  },
  {
    name: "Hospitality",
    icon: UtensilsCrossed,
    description: "Hotels, restaurants, retail",
    color: "bg-orange-500",
    count: 156,
  },
  {
    name: "Technology",
    icon: Code,
    description: "IT, software, engineering",
    color: "bg-purple-500",
    count: 89,
  },
  {
    name: "Construction",
    icon: HardHat,
    description: "Skilled trades, infrastructure",
    color: "bg-yellow-600",
    count: 178,
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    description: "Medical, nursing, care",
    color: "bg-red-500",
    count: 67,
  },
  {
    name: "Finance",
    icon: Briefcase,
    description: "Banking, accounting, finance",
    color: "bg-green-600",
    count: 45,
  },
  {
    name: "Corporate",
    icon: Building2,
    description: "Management, admin, HR",
    color: "bg-indigo-500",
    count: 98,
  },
  {
    name: "Transportation",
    icon: Car,
    description: "Logistics, driving, delivery",
    color: "bg-cyan-500",
    count: 123,
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Browse by Industry
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find opportunities across diverse industries matching your skills
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className={`${cat.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                    <cat.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{cat.description}</p>
                  <p className="text-sm font-medium text-primary">{cat.count} jobs</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update page.tsx**

```tsx
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Destinations from "./components/destinations";
import Categories from "./components/categories";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Destinations />
        <Categories />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Test the categories section**

Scroll to categories section and verify:
- 8 category cards display
- Icons render correctly
- Job counts show
- Cards have hover lift effect

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Add job categories section with industry grid"
```

---

### Task 6: Build Statistics Section with Counter Animation

**Files:**
- Create: `app/components/stats.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create stats component**

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Workers Placed",
    description: "Successful placements worldwide",
  },
  {
    value: 50,
    suffix: "+",
    label: "Partner Companies",
    description: "Trusted employer partnerships",
  },
  {
    value: 10,
    suffix: "+",
    label: "Years Experience",
    description: "Industry expertise since 2014",
  },
  {
    value: 4,
    suffix: "",
    label: "Countries",
    description: "Japan, China, Malaysia, Singapore",
  },
];

function Counter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Track Record
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Years of experience connecting Indonesian talent with global opportunities
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
                <Counter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              <div className="text-xl font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-sm text-white/70">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update page.tsx**

```tsx
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Destinations from "./components/destinations";
import Categories from "./components/categories";
import Stats from "./components/stats";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Destinations />
        <Categories />
        <Stats />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Test the stats section**

Scroll to stats section and verify:
- Gradient background displays
- Counter animation starts when in view
- All 4 stats show with proper values

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Add statistics section with animated counters"
```

---

### Task 7: Build How It Works Section

**Files:**
- Create: `app/components/how-it-works.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create how-it-works component**

```tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Search, FileText, Plane, Users, Briefcase, CheckCircle } from "lucide-react";

const jobSeekerSteps = [
  {
    icon: Search,
    title: "Browse Jobs",
    description: "Explore thousands of overseas job opportunities",
  },
  {
    icon: FileText,
    title: "Apply Online",
    description: "Submit your application with resume",
  },
  {
    icon: CheckCircle,
    title: "Get Hired",
    description: "Interview and secure your position",
  },
];

const employerSteps = [
  {
    icon: Briefcase,
    title: "Post a Job",
    description: "Create your job listing in minutes",
  },
  {
    icon: Users,
    title: "Review Candidates",
    description: "Browse qualified Indonesian talent",
  },
  {
    icon: Plane,
    title: "Hire & Place",
    description: "Onboard your new team member",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, transparent process for both job seekers and employers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* For Job Seekers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">
              For Job Seekers
            </h3>
            <div className="space-y-6">
              {jobSeekerSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-primary">
                              Step {index + 1}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">
                            {step.title}
                          </h4>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* For Employers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">
              For Employers
            </h3>
            <div className="space-y-6">
              {employerSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <step.icon className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-secondary">
                              Step {index + 1}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">
                            {step.title}
                          </h4>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update page.tsx**

```tsx
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Destinations from "./components/destinations";
import Categories from "./components/categories";
import Stats from "./components/stats";
import HowItWorks from "./components/how-it-works";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Destinations />
        <Categories />
        <Stats />
        <HowItWorks />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Test the how-it-works section**

Scroll to how-it-works section and verify:
- Two columns display correctly
- All 6 step cards show
- Icons render
- Animations work on scroll

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Add how it works section with step cards"
```

---

### Task 8: Build Testimonials Section

**Files:**
- Create: `app/components/testimonials.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create testimonials component**

```tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad Wijaya",
    role: "Factory Worker",
    destination: "Japan",
    flag: "🇯🇵",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    quote:
      "Tunaskarya made my dream of working in Japan a reality. The process was smooth and the support was amazing throughout.",
    rating: 5,
  },
  {
    name: "Siti Nurhaliza",
    role: "Hotel Staff",
    destination: "Singapore",
    flag: "🇸🇬",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    quote:
      "From application to placement, Tunaskarya was professional and caring. Now I'm working at a top hotel in Singapore!",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "CNC Technician",
    destination: "Malaysia",
    flag: "🇲🇾",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    quote:
      "The team understood my skills and matched me with the perfect job. My salary tripled compared to local jobs.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from Indonesian workers who built their careers abroad with Tunaskarya
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                    <div className="ml-auto text-3xl">{testimonial.flag}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update page.tsx**

```tsx
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Destinations from "./components/destinations";
import Categories from "./components/categories";
import Stats from "./components/stats";
import HowItWorks from "./components/how-it-works";
import Testimonials from "./components/testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Destinations />
        <Categories />
        <Stats />
        <HowItWorks />
        <Testimonials />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Test the testimonials section**

Scroll to testimonials section and verify:
- 3 testimonial cards display
- Images load correctly
- Flags show
- Star ratings display
- Cards have hover effect

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Add testimonials section with success stories"
```

---

### Task 9: Build Call to Action Section

**Files:**
- Create: `app/components/cta.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create CTA component**

```tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Users, Briefcase } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Global Career?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Join thousands of Indonesian workers who have successfully built their careers abroad with Tunaskarya.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* For Job Seekers */}
            <div className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full hover:bg-gray-700 transition-colors">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Find a Job</h3>
              <p className="text-gray-400 mb-6">
                Browse thousands of overseas opportunities and apply today
              </p>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white"
                asChild
              >
                <Link href="/portal">
                  Browse Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* For Employers */}
            <div className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full hover:bg-gray-700 transition-colors">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Hire Talent</h3>
              <p className="text-gray-400 mb-6">
                Post jobs and connect with qualified Indonesian workers
              </p>
              <Button
                className="w-full bg-secondary hover:bg-secondary/90 text-white"
                asChild
              >
                <Link href="/auth/register">
                  Post a Job
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update page.tsx**

```tsx
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Destinations from "./components/destinations";
import Categories from "./components/categories";
import Stats from "./components/stats";
import HowItWorks from "./components/how-it-works";
import Testimonials from "./components/testimonials";
import CTA from "./components/cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Destinations />
        <Categories />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Test the CTA section**

Scroll to CTA section and verify:
- Dark background displays
- Two cards show (job seekers & employers)
- Icons render correctly
- Buttons are clickable

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Add call to action section with dual cards"
```

---

### Task 10: Build Footer Component

**Files:**
- Create: `app/components/footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create footer component**

```tsx
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Tunaskarya
              </span>
            </h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for overseas career opportunities. Connecting Indonesian talent with global employers since 2014.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-primary transition-colors">
                  Job Portal
                </Link>
              </li>
              <li>
                <Link href="/#destinations" className="hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* For Candidates */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">For Candidates</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/register" className="hover:text-primary transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-primary transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Batam Centre, Jl. Pembangunan No. 123, Kota Batam, Kepulauan Riau 29461, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span>+62 778 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span>info@tunaskarya.co.id</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Mon - Fri: 9:00 - 17:00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 Tunaskarya. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Update page.tsx**

```tsx
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Destinations from "./components/destinations";
import Categories from "./components/categories";
import Stats from "./components/stats";
import HowItWorks from "./components/how-it-works";
import Testimonials from "./components/testimonials";
import CTA from "./components/cta";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Destinations />
        <Categories />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Test the footer**

Scroll to bottom and verify:
- All footer sections display
- Links are clickable
- Social icons show
- Contact info displays
- Responsive layout works

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Add footer component with contact info and links"
```

---

### Task 11: Final Testing & Polish

- [ ] **Step 1: Test complete page flow**

Open http://localhost:3000 and verify:
- [ ] Navbar scrolls and changes style
- [ ] Hero section animations work
- [ ] All sections scroll smoothly
- [ ] Destinations cards hover
- [ ] Categories cards animate
- [ ] Stats counters animate
- [ ] How it works cards animate
- [ ] Testimonials display
- [ ] CTA buttons work
- [ ] Footer links work

- [ ] **Step 2: Test responsive design**

Resize browser to test:
- [ ] Mobile view (375px)
- [ ] Tablet view (768px)
- [ ] Desktop view (1280px)

- [ ] **Step 3: Test navigation smooth scroll**

Click each nav link and verify smooth scroll to section.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: Complete Tunaskarya landing page with all sections"
```

---

## Self-Review Checklist

Before marking complete, verify:

- [ ] All sections implemented per spec
- [ ] Green/teal color palette applied throughout
- [ ] shadcn/ui components used correctly
- [ ] Framer Motion animations smooth
- [ ] Responsive on mobile/tablet/desktop
- [ ] All buttons link to correct pages
- [ ] No console errors
- [ ] No placeholder content (all text is real)
- [ ] Images load from Unsplash

---

## Next Steps

After landing page is complete:

1. **Phase 2: Job Portal Setup**
   - Configure Prisma with PostgreSQL
   - Create database schema
   - Set up authentication
   - Build job listing pages

2. **Phase 3: Authentication**
   - Login/Register pages
   - User session management
   - Protected routes
