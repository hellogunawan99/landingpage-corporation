"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

interface Application {
  id: string;
  status: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
  job: {
    title: string;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function EmployerApplicationsPage() {
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
    if (userData.role !== "EMPLOYER") {
      window.location.href = "/dashboard";
      return;
    }
    
    setUser(userData);
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications/employer");
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
            <h1 className="text-2xl font-bold">Applications</h1>
            <p className="text-gray-600">Manage job applications from candidates</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {applications.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Applications Yet
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  When candidates apply to your jobs, their applications will appear here.
                </p>
                <Button asChild>
                  <Link href="/dashboard/jobs/new">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Post a New Job
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
                      <div>
                        <CardTitle className="text-lg">{app.user.name || "Unknown"}</CardTitle>
                        <p className="text-sm text-gray-500">{app.user.email}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Applied for: {app.job.title}
                        </p>
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
                    <p className="text-sm text-gray-500">
                      Applied: {new Date(app.createdAt).toLocaleDateString()}
                    </p>
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
