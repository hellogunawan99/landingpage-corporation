"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Briefcase, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

interface Application {
  id: string;
  status: string;
  createdAt: string;
  job: {
    title: string;
    location: string;
    destination: string;
    salary: string | null;
    category: {
      name: string;
    };
  };
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function JobSeekerDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      window.location.href = "/auth/login";
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);
    fetchApplications(userData.id);
  }, []);

  const fetchApplications = async (userId: string) => {
    try {
      const res = await fetch("/api/applications/seeker?userId=" + userId);
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch applications");
      setApplications([]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold">My Applications</h1>
            <p className="text-gray-600">Track your job applications</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {applications.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Briefcase className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Applications Yet
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Start your journey! Browse our job listings and apply for positions that match your skills.
                </p>
                <Button asChild>
                  <Link href="/portal">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Browse Jobs
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{app.job.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <Badge variant="secondary">{app.job.category?.name || "General"}</Badge>
                          <span className="flex items-center">
                            <Building2 className="h-3 w-3 mr-1" />
                            {app.job.location || "N/A"}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {app.job.destination || "N/A"}
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={
                          app.status === "PENDING"
                            ? "bg-yellow-500"
                            : app.status === "REVIEWING"
                            ? "bg-blue-500"
                            : app.status === "ACCEPTED"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        Applied: {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                      {app.job.salary && (
                        <p className="text-sm font-medium text-blue-600">
                          {app.job.salary}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
