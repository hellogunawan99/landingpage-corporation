# Tunaskarya Job Portal Implementation Plan (Phase 2)

> **For agentic workers:** Execute tasks in order. Use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Job Portal with authentication, job listings, job details, and application system.

**Architecture:** Next.js 14+ API Routes + Prisma ORM + PostgreSQL. Email/password authentication using NextAuth.js or custom JWT.

**Tech Stack:** Next.js 14+, Prisma, PostgreSQL, NextAuth.js, Zod (validation)

---

## File Structure

```
tunaskarya/
├── prisma/
│   └── schema.prisma          # Database schema
├── app/
│   ├── api/                   # API routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   └── jobs/
│   │       └── route.ts
│   ├── portal/
│   │   ├── page.tsx           # Job listings
│   │   └── jobs/
│   │       └── [id]/page.tsx  # Job detail
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   └── components/
│       ├── job-card.tsx
│       ├── job-filter.tsx
│       └── application-form.tsx
├── lib/
│   ├── prisma.ts              # Prisma client
│   └── auth.ts                # Auth config
└── types/
    └── index.ts               # TypeScript types
```

---

## Tasks

### Task 1: Set Up Prisma with PostgreSQL

**Files:**
- Create: `prisma/schema.prisma`
- Create: `.env`
- Modify: `package.json`
- Create: `lib/prisma.ts`

- [ ] **Step 1: Install Prisma dependencies**

```bash
npm install prisma @prisma/client next-auth zod bcryptjs
npm install -D @types/bcryptjs
```

- [ ] **Step 2: Initialize Prisma**

```bash
npx prisma init
```

- [ ] **Step 3: Update prisma/schema.prisma**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String        @id @default(cuid())
  email         String        @unique
  password      String
  name          String?
  phone         String?
  role          Role          @default(JOB_SEEKER)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  applications  Application[]
  jobs          Job[]         @relation("EmployerJobs")
}

enum Role {
  JOB_SEEKER
  EMPLOYER
  ADMIN
}

model Job {
  id            String        @id @default(cuid())
  title         String
  description   String
  requirements  String?
  benefits      String?
  salary        String?
  location      String
  destination   String
  category      Category      @relation(fields: [categoryId], references: [id])
  categoryId    String
  employer      User          @relation("EmployerJobs", fields: [employerId], references: [id])
  employerId    String
  status        JobStatus    @default(ACTIVE)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  applications  Application[]
}

enum JobStatus {
  ACTIVE
  CLOSED
  DRAFT
}

model Category {
  id    String @id @default(cuid())
  name  String @unique
  icon  String?
  jobs  Job[]
}

model Application {
  id          String      @id @default(cuid())
  user        User        @relation(fields: [userId], references: [id])
  userId      String
  job         Job         @relation(fields: [jobId], references: [id])
  jobId       String
  status      ApplicationStatus @default(PENDING)
  coverLetter String?
  resumeUrl   String?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@unique([userId, jobId])
}

enum ApplicationStatus {
  PENDING
  REVIEWING
  ACCEPTED
  REJECTED
}
```

- [ ] **Step 4: Create .env file**

```env
DATABASE_URL="postgresql://developer:Tunaskaryaardi2026;@localhost:5432/tunaskarya?schema=public"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

- [ ] **Step 5: Create lib/prisma.ts**

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

- [ ] **Step 6: Push schema to database**

```bash
npx prisma db push
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: Set up Prisma with PostgreSQL schema"
```

---

### Task 2: Set Up Authentication with NextAuth.js

**Files:**
- Create: `lib/auth.ts`
- Create: `app/api/auth/[...nextauth]/route.ts`
- Create: `types/index.ts`
- Create: `app/api/auth/register/route.ts`

- [ ] **Step 1: Create types/index.ts**

```typescript
export type Role = "JOB_SEEKER" | "EMPLOYER" | "ADMIN";
export type JobStatus = "ACTIVE" | "CLOSED" | "DRAFT";
export type ApplicationStatus = "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED";

export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: Role;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string | null;
  benefits: string | null;
  salary: string | null;
  location: string;
  destination: string;
  categoryId: string;
  category: Category;
  employerId: string;
  employer: User;
  status: JobStatus;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string | null;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
  coverLetter: string | null;
  resumeUrl: string | null;
  createdAt: Date;
  user?: User;
  job?: Job;
}
```

- [ ] **Step 2: Create lib/auth.ts**

```typescript
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
```

- [ ] **Step 3: Create app/api/auth/[...nextauth]/route.ts**

```typescript
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

- [ ] **Step 4: Extend NextAuth types**

Create `types/next-auth.d.ts`:

```typescript
import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
```

- [ ] **Step 5: Create registration API**

Create `app/api/auth/register/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(["JOB_SEEKER", "EMPLOYER"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Set up NextAuth.js authentication"
```

---

### Task 3: Create Auth Pages (Login & Register)

**Files:**
- Create: `app/auth/login/page.tsx`
- Create: `app/auth/register/page.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/label.tsx`

- [ ] **Step 1: Add input and label components**

```bash
npx shadcn@latest add input label
```

- [ ] **Step 2: Create Login Page**

Create `app/auth/login/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your Tunaskarya account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Register Page**

Create `app/auth/register/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "JOB_SEEKER",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      router.push("/auth/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join Tunaskarya today</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Choose your account type</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "JOB_SEEKER" })}
                    className={`flex-1 p-4 border-2 rounded-lg text-center transition-colors ${
                      formData.role === "JOB_SEEKER"
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">Job Seeker</div>
                    <div className="text-sm text-gray-500">Find overseas jobs</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "EMPLOYER" })}
                    className={`flex-1 p-4 border-2 rounded-lg text-center transition-colors ${
                      formData.role === "EMPLOYER"
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">Employer</div>
                    <div className="text-sm text-gray-500">Post jobs & hire</div>
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Add login and register pages"
```

---

### Task 4: Create Job API Routes

**Files:**
- Create: `app/api/jobs/route.ts`
- Create: `app/api/jobs/[id]/route.ts`

- [ ] **Step 1: Create Jobs API (GET & POST)**

Create `app/api/jobs/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const jobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  salary: z.string().optional(),
  location: z.string().min(2),
  destination: z.string().min(2),
  categoryId: z.string(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination");
  const categoryId = searchParams.get("categoryId");
  const search = searchParams.get("search");

  const where: any = { status: "ACTIVE" };

  if (destination) {
    where.destination = destination;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const jobs = await prisma.job.findMany({
    where,
    include: {
      category: true,
      employer: {
        select: { id: true, name: true },
      },
      _count: {
        select: { applications: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "EMPLOYER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = jobSchema.parse(body);

    const job = await prisma.job.create({
      data: {
        ...data,
        employerId: session.user.id,
      },
      include: {
        category: true,
        employer: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Create Single Job API (GET)**

Create `app/api/jobs/[id]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      employer: {
        select: { id: true, name: true },
      },
      _count: {
        select: { applications: true },
      },
    },
  });

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}
```

- [ ] **Step 3: Create Application API**

Create `app/api/applications/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const applicationSchema = z.object({
  jobId: z.string(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = applicationSchema.parse(body);

    const existingApplication = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId: session.user.id,
          jobId: data.jobId,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        jobId: data.jobId,
        coverLetter: data.coverLetter,
        resumeUrl: data.resumeUrl,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 4: Seed Initial Categories**

Create `app/api/seed/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const categories = [
  { name: "Manufacturing", icon: "Factory" },
  { name: "Hospitality", icon: "UtensilsCrossed" },
  { name: "Technology", icon: "Code" },
  { name: "Construction", icon: "HardHat" },
  { name: "Healthcare", icon: "Stethoscope" },
  { name: "Finance", icon: "Briefcase" },
  { name: "Corporate", icon: "Building2" },
  { name: "Transportation", icon: "Car" },
];

export async function POST() {
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  return NextResponse.json({ message: "Categories seeded successfully" });
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Add job and application API routes"
```

---

### Task 5: Build Job Listings Page

**Files:**
- Create: `app/components/job-card.tsx`
- Create: `app/components/job-filter.tsx`
- Create: `app/portal/page.tsx`

- [ ] **Step 1: Create JobCard Component**

Create `app/components/job-card.tsx`:

```tsx
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Clock } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    description: string;
    location: string;
    destination: string;
    salary: string | null;
    category: { name: string };
    employer: { name: string | null };
    createdAt: Date;
    _count: { applications: number };
  };
}

export default function JobCard({ job }: JobCardProps) {
  const postedDate = new Date(job.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/portal/jobs/${job.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
              <div className="flex items-center text-gray-600 text-sm">
                <Building2 className="h-4 w-4 mr-1" />
                {job.employer.name || "Company"}
              </div>
            </div>
            <Badge variant="secondary">{job.category.name}</Badge>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {job.description}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              {job.location} → {job.destination}
            </div>
            {job.salary && (
              <div className="font-medium text-primary">{job.salary}</div>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4 border-t bg-gray-50">
          <div className="flex justify-between items-center w-full text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {postedDate}
            </div>
            <div>{job._count.applications} applicants</div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
```

- [ ] **Step 2: Create JobFilter Component**

Create `app/components/job-filter.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const destinations = [
  { value: "", label: "All Destinations" },
  { value: "Japan", label: "Japan" },
  { value: "China", label: "China" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Singapore", label: "Singapore" },
];

interface Category {
  id: string;
  name: string;
}

interface JobFilterProps {
  categories: Category[];
}

export default function JobFilter({ categories }: JobFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "");

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (destination) params.set("destination", destination);
    if (categoryId) params.set("categoryId", categoryId);

    const query = params.toString();
    router.push(query ? `/portal?${query}` : "/portal", { scroll: false });
  }, [search, destination, categoryId, router]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={destination} onValueChange={setDestination}>
          <SelectTrigger>
            <SelectValue placeholder="Destination" />
          </SelectTrigger>
          <SelectContent>
            {destinations.map((dest) => (
              <SelectItem key={dest.value} value={dest.value}>
                {dest.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
```

Add Select component:

```bash
npx shadcn@latest add select
```

- [ ] **Step 3: Create Portal Page**

Create `app/portal/page.tsx`:

```tsx
import { prisma } from "@/lib/prisma";
import JobCard from "@/components/job-card";
import JobFilter from "@/components/job-filter";

interface SearchParams {
  search?: string;
  destination?: string;
  categoryId?: string;
}

export default async function PortalPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const where: any = { status: "ACTIVE" };

  if (searchParams.destination) {
    where.destination = searchParams.destination;
  }

  if (searchParams.categoryId) {
    where.categoryId = searchParams.categoryId;
  }

  if (searchParams.search) {
    where.OR = [
      { title: { contains: searchParams.search, mode: "insensitive" } },
      { description: { contains: searchParams.search, mode: "insensitive" } },
    ];
  }

  const [jobs, categories] = await Promise.all([
    prisma.job.findMany({
      where,
      include: {
        category: true,
        employer: {
          select: { id: true, name: true },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Job Portal
          </h1>
          <p className="text-white/80 text-lg">
            Find your dream overseas job opportunity
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobFilter categories={categories} />

        <div className="mb-6">
          <p className="text-gray-600">
            {jobs.length} {jobs.length === 1 ? "job" : "jobs"} found
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Add Select component**

```bash
npx shadcn@latest add select
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Add job listings page with filters"
```

---

### Task 6: Build Job Detail Page

**Files:**
- Create: `app/portal/jobs/[id]/page.tsx`
- Create: `app/components/apply-button.tsx`

- [ ] **Step 1: Create ApplyButton Component**

Create `app/components/apply-button.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ApplyButtonProps {
  jobId: string;
}

export default function ApplyButton({ jobId }: ApplyButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!session) {
      router.push(`/auth/login?callbackUrl=/portal/jobs/${jobId}`);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to apply");
      }

      toast.success("Application submitted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleApply}
      disabled={loading}
      className="w-full md:w-auto bg-primary hover:bg-primary/90"
      size="lg"
    >
      {loading ? "Applying..." : "Apply Now"}
    </Button>
  );
}
```

Add Sonner for toast notifications:

```bash
npx shadcn@latest add sonner
```

- [ ] **Step 2: Create JobDetailPage**

Create `app/components/providers.tsx`:

```tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster position="top-right" />
    </SessionProvider>
  );
}
```

Update `app/layout.tsx`:

```tsx
import { Providers } from "./components/providers";
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
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

Create `app/portal/jobs/[id]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, DollarSign, Clock, Users } from "lucide-react";
import Link from "next/link";
import ApplyButton from "@/components/apply-button";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      employer: {
        select: { id: true, name: true },
      },
      _count: {
        select: { applications: true },
      },
    },
  });

  if (!job) {
    notFound();
  }

  const postedDate = new Date(job.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/portal"
            className="text-white/80 hover:text-white mb-4 inline-block"
          >
            ← Back to Jobs
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-2 items-center text-white/90">
            <Badge className="bg-white/20 text-white">{job.category.name}</Badge>
            <span className="flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              {job.employer.name || "Company"}
            </span>
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location} → {job.destination}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Job Description</h2>
              <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                {job.description}
              </div>
            </div>

            {job.requirements && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Requirements</h2>
                <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                  {job.requirements}
                </div>
              </div>
            )}

            {job.benefits && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Benefits</h2>
                <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                  {job.benefits}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Job Details</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="font-medium">{job.salary || "Negotiable"}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="font-medium">{job.destination}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Applicants</p>
                    <p className="font-medium">{job._count.applications}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Posted</p>
                    <p className="font-medium">{postedDate}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <ApplyButton jobId={job.id} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">About Employer</h3>
              <p className="text-gray-600">{job.employer.name || "Company"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: Add job detail page with apply functionality"
```

---

### Task 7: Create Dashboard Pages

**Files:**
- Create: `app/dashboard/page.tsx`
- Create: `middleware.ts` (for protected routes)

- [ ] **Step 1: Create middleware.ts**

Create `middleware.ts` in root:

```typescript
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

- [ ] **Step 2: Create Dashboard Page**

Create `app/dashboard/page.tsx`:

```tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, FileText, CheckCircle } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const whereClause = session.user.role === "EMPLOYER"
    ? { employerId: session.user.id }
    : { userId: session.user.id };

  const [jobs, applications] = await Promise.all([
    session.user.role === "EMPLOYER"
      ? prisma.job.count({ where: whereClause })
      : prisma.job.count({ where: { status: "ACTIVE" } }),
    prisma.application.count({ where: whereClause }),
  ]);

  const stats = [
    {
      title: session.user.role === "EMPLOYER" ? "Posted Jobs" : "Available Jobs",
      value: jobs,
      icon: Briefcase,
      color: "text-blue-600",
    },
    {
      title: session.user.role === "EMPLOYER" ? "Total Applications" : "My Applications",
      value: applications,
      icon: FileText,
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
          <p className="text-gray-600">
            {session.user.role === "EMPLOYER"
              ? "Manage your posted jobs and applications"
              : "Track your job applications"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {session.user.role === "EMPLOYER"
                ? "Recent Applications"
                : "My Recent Applications"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              {session.user.role === "EMPLOYER"
                ? "You haven't received any applications yet."
                : "You haven't applied to any jobs yet."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: Add dashboard page with stats"
```

---

### Task 8: Seed Sample Jobs

**Files:**
- Create: `app/api/seed-jobs/route.ts`

- [ ] **Step 1: Create seed jobs API**

Create `app/api/seed-jobs/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST() {
  // Create demo employer
  const hashedPassword = await bcrypt.hash("password123", 10);

  const employer = await prisma.user.upsert({
    where: { email: "employer@tunaskarya.com" },
    update: {},
    create: {
      email: "employer@tunaskarya.com",
      password: hashedPassword,
      name: "Tunaskarya Corp",
      role: "EMPLOYER",
    },
  });

  // Get categories
  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c.id]));

  const jobs = [
    {
      title: "Factory Worker - Electronics",
      description: "Assemble electronic components in a modern manufacturing facility. No experience required, training provided.",
      requirements: "18+ years old, physically fit, basic English",
      benefits: "Free accommodation, meals, health insurance, overtime pay",
      salary: "¥180,000/month",
      location: "Batam, Indonesia",
      destination: "Japan",
      categoryId: categoryMap["Manufacturing"],
      employerId: employer.id,
    },
    {
      title: "Hotel Receptionist",
      description: "Greet guests, handle check-ins/outs, provide tourist information at a 5-star hotel.",
      requirements: "Good communication skills, English fluent, pleasant personality",
      benefits: "Tips, accommodation, meals, career growth",
      salary: "S$2,200/month",
      location: "Batam, Indonesia",
      destination: "Singapore",
      categoryId: categoryMap["Hospitality"],
      employerId: employer.id,
    },
    {
      title: "Software Developer",
      description: "Develop and maintain web applications for a tech startup in Kuala Lumpur.",
      requirements: "Bachelor's in CS, 2+ years experience, React/Node.js",
      benefits: "Remote work options, annual bonus, learning budget",
      salary: "RM 8,000/month",
      location: "Batam, Indonesia",
      destination: "Malaysia",
      categoryId: categoryMap["Technology"],
      employerId: employer.id,
    },
    {
      title: "CNC Machine Operator",
      description: "Operate CNC machines for precision manufacturing in Shanghai.",
      requirements: "Technical diploma, experience with CNC, attention to detail",
      benefits: "Housing allowance, round-trip ticket, yearly bonus",
      salary: "¥15,000/month",
      location: "Batam, Indonesia",
      destination: "China",
      categoryId: categoryMap["Manufacturing"],
      employerId: employer.id,
    },
    {
      title: "Construction Supervisor",
      description: "Lead construction teams for building projects in Singapore.",
      requirements: "5+ years experience, relevant certifications, leadership skills",
      benefits: "High salary, transport allowance, career advancement",
      salary: "S$4,500/month",
      location: "Batam, Indonesia",
      destination: "Singapore",
      categoryId: categoryMap["Construction"],
      employerId: employer.id,
    },
  ];

  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }

  return NextResponse.json({ message: "Jobs seeded successfully" });
}
```

- [ ] **Step 2: Run seed APIs**

Visit these URLs to seed data:
- `http://localhost:3000/api/seed` - Seeds categories
- `http://localhost:3000/api/seed-jobs` - Seeds sample jobs

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: Add sample job data seeder"
```

---

## Self-Review Checklist

- [ ] All API routes tested with curl/Postman
- [ ] Authentication flow works (register, login, logout)
- [ ] Job listings display with filters
- [ ] Job detail page shows all info
- [ ] Apply button prompts login if not authenticated
- [ ] Applications can be submitted
- [ ] Dashboard shows correct stats
- [ ] Protected routes redirect to login
- [ ] Database has categories and sample jobs

---

## Next Steps (Phase 3)

1. Employer job posting form
2. Application management for employers
3. User profile pages
4. Email notifications
5. Admin panel
