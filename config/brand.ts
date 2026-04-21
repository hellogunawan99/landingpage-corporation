/**
 * Brand Configuration
 * 
 * Customize these settings to match your company branding.
 * All text, colors, and assets should be configured here.
 */

export const brand = {
  // ============================================
  // COMPANY INFORMATION
  // ============================================
  company: {
    name: "Tunaskarya",
    tagline: "Jasa Penempatan Tenaga Kerja Indonesia",
    description: "Platform penempatan tenaga kerja Indonesia ke luar negeri",
    website: "https://tunaskarya.com",
    email: "info@tunaskarya.com",
    phone: "+62 21 1234 5678",
    address: "Jakarta, Indonesia",
  },

  // ============================================
  // BRANDING & COLORS
  // ============================================
  colors: {
    // Primary color - used for buttons, links, accents
    primary: "#2563eb", // Blue 600
    primaryHover: "#1d4ed8", // Blue 700
    primaryLight: "#dbeafe", // Blue 100
    
    // Secondary color - used for secondary actions
    secondary: "#64748b", // Slate 500
    secondaryHover: "#475569", // Slate 600
    
    // Accent color - used for highlights
    accent: "#10b981", // Emerald 500
    
    // Status colors
    success: "#22c55e", // Green 500
    warning: "#f59e0b", // Amber 500
    error: "#ef4444", // Red 500
    info: "#3b82f6", // Blue 500
    
    // Background colors
    background: "#ffffff",
    backgroundSecondary: "#f9fafb", // Gray 50
    backgroundDark: "#111827", // Gray 900
    
    // Text colors
    text: {
      primary: "#111827", // Gray 900
      secondary: "#6b7280", // Gray 500
      muted: "#9ca3af", // Gray 400
      inverse: "#ffffff",
    },
    
    // Border colors
    border: "#e5e7eb", // Gray 200
    borderHover: "#d1d5db", // Gray 300
  },

  // ============================================
  // LOGO & IMAGES
  // ============================================
  logo: {
    url: "/logo.png",
    alt: "Tunaskarya Logo",
    width: 180,
    height: 60,
    // For dark mode (optional)
    darkModeUrl: "/logo-dark.png",
    darkModeAlt: "Tunaskarya Logo (Dark Mode)",
  },

  // ============================================
  // SOCIAL MEDIA
  // ============================================
  social: {
    facebook: "https://facebook.com/tunaskarya",
    instagram: "https://instagram.com/tunaskarya",
    linkedin: "https://linkedin.com/company/tunaskarya",
    twitter: "https://twitter.com/tunaskarya",
    youtube: "https://youtube.com/tunaskarya",
  },

  // ============================================
  // NAVIGATION
  // ============================================
  navigation: {
    items: [
      { label: "Home", href: "/" },
      { label: "Jobs", href: "/portal" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },

  // ============================================
  // FOOTER LINKS
  // ============================================
  footer: {
    links: {
      company: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Press", href: "/press" },
      ],
      resources: [
        { label: "Help Center", href: "/help" },
        { label: "FAQ", href: "/faq" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
      legal: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
    copyright: `© ${new Date().getFullYear()} Tunaskarya. All rights reserved.`,
  },

  // ============================================
  // AUTHENTICATION
  // ============================================
  auth: {
    // Login page
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
    
    // Register page
    register: {
      title: "Create Account",
      subtitle: "Join us today",
      namePlaceholder: "Full name",
      emailPlaceholder: "you@example.com",
      passwordPlaceholder: "Create a password",
      confirmPasswordPlaceholder: "Confirm your password",
      submitButton: "Create Account",
      googleButton: "Continue with Google",
      dividerText: "Or continue with",
      hasAccountText: "Already have an account?",
      signInLink: "Sign in",
    },
  },

  // ============================================
  // JOBS PORTAL
  // ============================================
  jobs: {
    // Job types available
    categories: [
      "Manufacturing",
      "Hospitality",
      "Technology",
      "Construction",
      "Transportation",
      "Healthcare",
      "Education",
      "Retail",
    ],
    
    // Destination countries
    destinations: [
      "Japan",
      "China",
      "Malaysia",
      "Singapore",
      "South Korea",
      "Taiwan",
      "Hong Kong",
      "Middle East",
    ],
    
    // Employment types
    employmentTypes: [
      "Full-time",
      "Part-time",
      "Contract",
      "Seasonal",
      "Internship",
    ],
  },

  // ============================================
  // ADMIN PANEL
  // ============================================
  admin: {
    title: "Admin Panel",
    subtitle: "Management Dashboard",
  },

  // ============================================
  // SUPPORT & CONTACT
  // ============================================
  support: {
    email: "support@tunaskarya.com",
    phone: "+62 21 1234 5678",
    hours: "Monday - Friday, 9:00 AM - 6:00 PM WIB",
    responseTime: "We typically respond within 24 hours",
  },

  // ============================================
  // SEO & METADATA
  // ============================================
  seo: {
    title: {
      default: "Tunaskarya - Penempatan Tenaga Kerja Indonesia",
      template: "%s | Tunaskarya",
    },
    description:
      "Platform penempatan tenaga kerja Indonesia ke luar negeri. Temukan pekerjaan impian Anda di Jepang, China, Malaysia, Singapore dan negara lainnya.",
    keywords: [
      "tenaga kerja indonesia",
      "penempatan kerja luar negeri",
      "lowongan kerja jepang",
      "kerja di malaysia",
      "kerja di singapore",
      "TKI",
      "JPTK",
    ],
    ogImage: "/og-image.png",
    twitterHandle: "@tunaskarya",
  },
};

// Type definitions for better TypeScript support
export type BrandConfig = typeof brand;
export type CompanyInfo = typeof brand.company;
export type BrandColors = typeof brand.colors;

export default brand;
