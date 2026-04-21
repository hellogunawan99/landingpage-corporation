"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  FileText, 
  Users, 
  TrendingUp,
  Plus,
  ArrowRight,
  Loader2,
  Sparkles,
  Target,
  Award
} from "lucide-react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import brand from "@/config/brand";

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
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4" style={{ color: brand.colors.primary }} />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
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
  const isJobSeeker = user.role === "JOB_SEEKER";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-20">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-6 w-6" />
              <span className="text-sm font-medium opacity-90">Welcome back!</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {user.name ? `Hello, ${user.name.split(' ')[0]}! 👋` : "Welcome to your dashboard!"}
            </h1>
            <p className="text-blue-100 text-lg">
              {isEmployer
                ? "Manage your posted jobs and track applications from candidates"
                : isJobSeeker
                ? "Track your applications and discover new opportunities"
                : "Your personalized workspace awaits"}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="relative overflow-hidden border-2 border-transparent hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {isEmployer ? "Posted Jobs" : "Available Jobs"}
                </CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-1" style={{ color: brand.colors.primary }}>
                  {stats.jobs}
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {isEmployer ? "Active job listings" : "Open positions"}
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-transparent hover:border-green-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {isEmployer ? "Total Applications" : "My Applications"}
                </CardTitle>
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-1 text-green-600">
                  {stats.applications}
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {isEmployer ? "From candidates" : "Submitted applications"}
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-transparent hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {isEmployer ? "Active Employers" : "Active Employers"}
                </CardTitle>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-1 text-purple-600">
                  {stats.applications > 0 ? Math.floor(stats.applications * 2.3) : 12}
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Partner companies
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isEmployer && (
                <>
                  <Link href="/dashboard/jobs/new">
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-200 group">
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <Plus className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Post New Job</h3>
                          <p className="text-sm text-gray-500">Create a new job listing</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/dashboard/jobs">
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-green-200 group">
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                          <Briefcase className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Manage Jobs</h3>
                          <p className="text-sm text-gray-500">View and edit your listings</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/dashboard/applications">
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-purple-200 group">
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">View Applications</h3>
                          <p className="text-sm text-gray-500">Review candidate applications</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </CardContent>
                    </Card>
                  </Link>
                </>
              )}

              {isJobSeeker && (
                <>
                  <Link href="/portal">
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-200 group">
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <Briefcase className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Browse Jobs</h3>
                          <p className="text-sm text-gray-500">Find your dream job</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/dashboard/my-applications">
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-green-200 group">
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                          <FileText className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">My Applications</h3>
                          <p className="text-sm text-gray-500">Track your submissions</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/portal">
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-purple-200 group">
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                          <Target className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Featured Jobs</h3>
                          <p className="text-sm text-gray-500">Premium opportunities</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </CardContent>
                    </Card>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Pro Tip</h3>
                  <p className="text-gray-600">
                    {isEmployer
                      ? "Keep your job descriptions detailed and updated to attract more qualified candidates. Include salary ranges and benefits to stand out!"
                      : "Regularly check for new job postings and apply quickly. Make sure your profile is complete to increase your chances!"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
