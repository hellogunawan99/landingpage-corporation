# Tunaskarya Design Specification

**Date:** 2026-04-19  
**Project:** Tunaskarya - Career Agency Web Application  
**Location:** Batam, Indonesia

---

## 1. Overview

### Project Description
Tunaskarya is a web application for an overseas career agency based in Batam, Indonesia. The platform connects Indonesian workers with international employment opportunities in Japan, China, Malaysia, and Singapore.

### Mission
**Tagline:** "Connecting Talent to Global Opportunities"

### Target Audience
- **Job Seekers:** Indonesian workers from Batam and surrounding areas seeking overseas employment
- **Employers/Agencies:** Companies and recruitment agencies looking to hire Indonesian talent

### Industries Served
- Manufacturing (factory, assembly, production)
- Hospitality & Service (hotels, restaurants, retail)
- Technology (IT, software, engineering)
- Construction (skilled trades, infrastructure)
- Healthcare, Finance, and other professional sectors

### Destination Countries
- Japan
- China
- Malaysia
- Singapore

---

## 2. Design System

### Visual Style
**Modern & Dynamic** — Bold, innovative feel with smooth animations, creative layouts, and contemporary aesthetics. Stands out from typical job boards.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | `#10b981` | Primary actions, highlights |
| Teal | `#14b8a6` | Secondary accent, links |
| Dark Teal | `#0d9488` | Hover states |
| Deep Green | `#064e3b` | Dark accents, text on light |
| Background | `#ffffff` | Main background |
| Surface | `#f9fafb` | Card backgrounds |
| Text Primary | `#111827` | Headings, important text |
| Text Secondary | `#6b7280` | Body text, descriptions |

### Typography
- **Headings:** Inter or system sans-serif (bold weights)
- **Body:** Inter or system sans-serif (regular/medium weights)
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Logo
**Text-based:** "Tunaskarya" in modern typography with optional gradient or teal accent

### UI Framework
**shadcn/ui** — Component library built on Radix UI with Tailwind CSS

---

## 3. Technical Architecture

### Stack
| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | Email/Password (NextAuth.js / Custom) |

### Database Connection
- **Host:** localhost
- **Port:** 5432
- **User:** developer
- **Database:** tunaskarya
- **Password:** Tunaskaryaardi2026;

---

## 4. Application Structure

### Phase 1: Landing Page
Public-facing marketing page showcasing Tunaskarya's services.

#### Sections
1. **Navigation Bar**
   - Logo (left)
   - Menu items: Home, Job Portal, About, Contact
   - CTA: "Post a Job" / "Find Jobs"

2. **Hero Section**
   - Headline: "Connecting Talent to Global Opportunities"
   - Subheadline highlighting overseas career benefits
   - Primary CTA: "Find Your Dream Job Abroad"
   - Secondary CTA: "Post a Job"
   - Background: Dynamic gradient or subtle animation

3. **Featured Destinations**
   - Cards for Japan, China, Malaysia, Singapore
   - Each with country flag, brief description, job count

4. **Job Categories**
   - Grid of industry categories with icons
   - Manufacturing, Hospitality, Technology, Construction, Healthcare, Finance

5. **Success Statistics**
   - Counter animation displaying:
     - Total workers placed
     - Partner companies
     - Years of experience
     - Destination countries

6. **How It Works**
   - 3-step process for job seekers
   - 3-step process for employers

7. **Testimonials/Success Stories**
   - Cards with worker testimonials
   - Photo, name, destination country, role

8. **Call to Action Section**
   - Strong CTA encouraging sign-up
   - Dual buttons: Job Seekers / Employers

9. **Footer**
   - Company info
   - Quick links
   - Contact information
   - Social media links

### Phase 2: Job Portal
Full-featured job board with authentication.

#### Features
- **Public Access:** Browse jobs without login
- **Authentication:** Email/password signup and login
- **Job Listings:** Search, filter by category, location, destination
- **Job Details:** Full description, requirements, benefits, company info
- **Application System:** Submit applications with resume/CV
- **User Dashboards:**
  - Job Seeker: Track applications, manage profile
  - Employer: Post jobs, manage applications, view candidates
- **Admin Panel:** Manage users, jobs, applications

#### Database Entities
- Users (job seekers, employers, admins)
- Jobs (title, description, requirements, destination, category)
- Applications (job_id, user_id, status, resume)
- Categories (industry categories)
- Destinations (destination countries)

---

## 5. Page Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/portal` | Job portal (job listings) |
| `/portal/jobs/[id]` | Job detail page |
| `/portal/apply/[id]` | Job application form |
| `/auth/login` | Login page |
| `/auth/register` | Registration page |
| `/dashboard` | User dashboard (protected) |
| `/dashboard/applications` | Job seeker applications |
| `/dashboard/jobs` | Employer job management |
| `/admin` | Admin panel (protected) |

---

## 6. Development Phases

### Phase 1: Landing Page
- [ ] Project setup (Next.js, shadcn/ui)
- [ ] Configure Tailwind with teal/green theme
- [ ] Build navigation component
- [ ] Build hero section
- [ ] Build destinations section
- [ ] Build job categories section
- [ ] Build statistics section
- [ ] Build how-it-works section
- [ ] Build testimonials section
- [ ] Build footer
- [ ] Responsive testing

### Phase 2: Job Portal Core
- [ ] Database schema design (Prisma)
- [ ] Authentication system
- [ ] Job listing page with filters
- [ ] Job detail page
- [ ] Application form
- [ ] User registration/login

### Phase 3: Dashboards
- [ ] Job seeker dashboard
- [ ] Employer dashboard
- [ ] Application tracking
- [ ] Job management for employers

### Phase 4: Polish & Launch
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Mobile testing
- [ ] Deployment preparation

---

## 7. Success Criteria

### Landing Page
- Visually impressive, modern design
- Clear value proposition
- Easy navigation to job portal
- Responsive on mobile and desktop
- Fast load times

### Job Portal
- Seamless user experience
- Intuitive job search and filtering
- Simple application process
- Secure authentication
- Clean, functional dashboards

---

## 8. Assumptions & Notes

1. **Job Matching Only:** Platform focuses on job matching, not documentation/visa processing
2. **Bilingual Ready:** UI designed to support both Indonesian and English
3. **Email Communication:** System sends email notifications for applications
4. **Guest Browsing:** Users can browse jobs without account; login required to apply
5. **Mobile-First:** Design prioritizes mobile experience for Indonesian users
