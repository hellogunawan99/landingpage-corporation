"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, MapPin, Loader2 } from "lucide-react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ jobs: 0, applications: 0 });

  useEffect(() => {
    // Get user from localStorage (set by login/register)
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      window.location.href = "/auth/login";
      return;
    }
    
    try {
      const userData = JSON.parse(storedUser);
      if (!userData || !userData.id) {
        window.location.href = "/auth/login";
        return;
      }
      setUser(userData);
      fetchStats();
    } catch (e) {
      console.error("Failed to parse stored user");
      window.location.href = "/auth/login";
      return;
    }
    setLoading(false);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  const isEmployer = user.role === "EMPLOYER";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold">Welcome, {user.name || user.email}</h1>
            <p className="text-gray-600">
              {isEmployer
                ? "Manage your posted jobs and applications"
                : "Track your job applications"}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {isEmployer ? "Posted Jobs" : "Available Jobs"}
                </CardTitle>
                <Briefcase className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.jobs}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {isEmployer ? "Total Applications" : "My Applications"}
                </CardTitle>
                <FileText className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.applications}</div>
              </CardContent>
            </Card>
          </div>

          {isEmployer ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Link href="/dashboard/jobs">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-primary" />
                      Manage Jobs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      View and manage your posted job listings
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/applications">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      View Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Review applications from job seekers
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Link href="/portal">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      Browse Jobs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Explore overseas job opportunities
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/my-applications">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      My Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Track your job applications
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
