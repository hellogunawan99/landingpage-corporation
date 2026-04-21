# Branding Guide

This document explains how to customize the branding for your company.

## Quick Start

All branding settings are centralized in a single file:

```
config/brand.ts
```

### What You Can Customize:

#### 1. **Company Information**
```typescript
company: {
  name: "Your Company Name",
  tagline: "Your company tagline",
  description: "Brief description of your company",
  website: "https://yourcompany.com",
  email: "contact@yourcompany.com",
  phone: "+1 234 567 8900",
  address: "Your Company Address",
}
```

#### 2. **Brand Colors**
```typescript
colors: {
  primary: "#2563eb",          // Main brand color (buttons, links)
  primaryHover: "#1d4ed8",      // Hover state color
  primaryLight: "#dbeafe",      // Light background color
  
  secondary: "#64748b",         // Secondary color
  secondaryHover: "#475569",    // Secondary hover
  
  accent: "#10b981",           // Accent color for highlights
  
  success: "#22c55e",          // Success messages
  warning: "#f59e0b",          // Warning messages
  error: "#ef4444",            // Error messages
  info: "#3b82f6",             // Info messages
}
```

#### 3. **Logo Configuration**
```typescript
logo: {
  url: "/logo.png",           // Path to your logo
  alt: "Company Logo",        // Alt text for accessibility
  width: 180,                  // Logo width in pixels
  height: 60,                  // Logo height in pixels
  
  // Optional: Dark mode logo
  darkModeUrl: "/logo-dark.png",
  darkModeAlt: "Company Logo (Dark Mode)",
}
```

#### 4. **Social Media Links**
```typescript
social: {
  facebook: "https://facebook.com/yourcompany",
  instagram: "https://instagram.com/yourcompany",
  linkedin: "https://linkedin.com/company/yourcompany",
  twitter: "https://twitter.com/yourcompany",
  youtube: "https://youtube.com/yourcompany",
}
```

#### 5. **Navigation Menu**
```typescript
navigation: {
  items: [
    { label: "Home", href: "/" },
    { label: "Jobs", href: "/portal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
}
```

#### 6. **Footer Links**
```typescript
footer: {
  links: {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
    resources: [
      { label: "Help Center", href: "/help" },
      { label: "FAQ", href: "/faq" },
      { label: "Terms", href: "/terms" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  copyright: "© 2024 Your Company. All rights reserved.",
}
```

#### 7. **Authentication Pages**
```typescript
auth: {
  login: {
    title: "Sign In",
    subtitle: "Sign in to your account",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Enter your password",
    submitButton: "Sign In",
    googleButton: "Sign in with Google",
    dividerText: "Or continue with",
    noAccountText: "Don't have an account?",
    signUpLink: "Sign up",
  },
  
  register: {
    title: "Create Account",
    subtitle: "Join us today",
    namePlaceholder: "Full name",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Create a password",
    confirmPasswordPlaceholder: "Confirm your password",
    submitButton: "Create Account",
    googleButton: "Continue with Google",
    hasAccountText: "Already have an account?",
    signInLink: "Sign in",
  },
}
```

#### 8. **SEO & Metadata**
```typescript
seo: {
  title: {
    default: "Your Company - Page Title",
    template: "%s | Your Company",  // %s will be replaced with page title
  },
  description: "Your SEO meta description",
  keywords: ["keyword1", "keyword2", "keyword3"],
  ogImage: "/og-image.png",  // Social media preview image
  twitterHandle: "@yourcompany",
}
```

#### 9. **Support Information**
```typescript
support: {
  email: "support@yourcompany.com",
  phone: "+1 234 567 8900",
  hours: "Monday - Friday, 9:00 AM - 6:00 PM",
  responseTime: "We typically respond within 24 hours",
}
```

#### 10. **Admin Panel**
```typescript
admin: {
  title: "Admin Panel",
  subtitle: "Management Dashboard",
}
```

## Examples

### Example 1: Japanese Company
```typescript
company: {
  name: "JapanWorks",
  tagline: "Connecting Indonesian Talent with Japanese Employers",
  description: "Premier job placement service for Japanese companies",
  website: "https://japanworks.co.id",
  email: "info@japanworks.co.id",
  phone: "+62 21 8088 1234",
  address: "Tokyo Tower, Jakarta",
},
```

### Example 2: Malaysian Company
```typescript
company: {
  name: "MalayHire",
  tagline: "Your Gateway to Malaysian Opportunities",
  description: "Trusted job placement agency for Malaysia",
  website: "https://malayhire.com",
  email: "careers@malayhire.com",
  phone: "+60 3 1234 5678",
  address: "Kuala Lumpur, Malaysia",
},
```

### Example 3: Singapore Company
```typescript
company: {
  name: "SGJobs Pro",
  tagline: "Singapore's Premier Job Portal",
  description: "Connecting talent with Singapore's top employers",
  website: "https://sgjobspro.sg",
  email: "hello@sgjobspro.sg",
  phone: "+65 6789 0123",
  address: "Marina Bay, Singapore",
},
```

## Color Palettes

### Blue Theme (Default)
```typescript
primary: "#2563eb"
primaryHover: "#1d4ed8"
primaryLight: "#dbeafe"
```

### Green Theme
```typescript
primary: "#059669"
primaryHover: "#047857"
primaryLight: "#d1fae5"
```

### Purple Theme
```typescript
primary: "#7c3aed"
primaryHover: "#6d28d9"
primaryLight: "#ede9fe"
```

### Orange Theme
```typescript
primary: "#ea580c"
primaryHover: "#c2410c"
primaryLight: "#ffedd5"
```

### Red Theme
```typescript
primary: "#dc2626"
primaryHover: "#b91c1c"
primaryLight: "#fee2e2"
```

## Adding Your Logo

1. Create your logo image (recommended: PNG with transparent background)
2. Recommended sizes:
   - Light mode logo: 180x60px
   - Dark mode logo: 180x60px
3. Place the logo in the `/public` folder
4. Update `config/brand.ts` with your logo path

```typescript
logo: {
  url: "/your-logo.png",
  alt: "Your Company Logo",
  width: 180,
  height: 60,
}
```

## Testing Your Changes

After modifying `config/brand.ts`:

1. **Save the file**
2. **Restart the development server** (if running)
3. **Test all pages** to ensure changes are applied correctly

## Support

If you need help customizing your branding, please refer to:
- Official documentation
- Support email: support@yourcompany.com

---

**Note:** All changes made to `config/brand.ts` will automatically reflect across the entire application.
