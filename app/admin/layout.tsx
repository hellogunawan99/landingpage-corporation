"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2, Users, Activity, LogOut, Home } from "lucide-react";
import brand from "@/config/brand";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }
    const userData = JSON.parse(user);
    if (userData.role !== "ADMIN") {
      window.location.href = "/";
      return;
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const navItems = [
    { href: "/admin/dashboard", label: "Users", icon: Users },
    { href: "/admin/audit-logs", label: "Audit Logs", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <aside
        className="fixed left-0 top-0 h-screen w-64 bg-white border-r flex flex-col"
        style={{ width: "16rem" }}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{brand.admin.title}</h2>
          <p className="text-sm text-gray-500 mt-1">{brand.admin.subtitle}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                style={{
                  borderLeftColor: isActive ? brand.colors.primary : "transparent",
                }}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              window.location.href = "/";
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="ml-64">{children}</main>
    </div>
  );
}
