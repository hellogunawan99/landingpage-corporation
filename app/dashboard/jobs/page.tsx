"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Briefcase, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

interface Job {
  id: string;
  title: string;
  destination: string;
  salary: string | null;
  status: string;
  createdAt: string;
  category: { name: string };
  _count: { applications: number };
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function EmployerJobsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
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
    fetchJobs(userData.id);
  }, []);

  const fetchJobs = async (employerId: string) => {
    try {
      const res = await fetch("/api/jobs/employer?employerId=" + employerId);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch jobs");
      setJobs([]);
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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">My Posted Jobs</h1>
                <p className="text-gray-600">Manage your job listings</p>
              </div>
              <Button asChild>
                <Link href="/dashboard/jobs/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {jobs.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Briefcase className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Jobs Posted Yet
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Start posting jobs to find talented Indonesian workers for your company.
                </p>
                <Button asChild>
                  <Link href="/dashboard/jobs/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Post Your First Job
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <Badge variant="secondary">{job.category?.name || "General"}</Badge>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.destination}
                          </span>
                          <Badge
                            variant={job.status === "ACTIVE" ? "default" : "outline"}
                            className={
                              job.status === "ACTIVE"
                                ? "bg-green-500"
                                : ""
                            }
                          >
                            {job.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {job._count?.applications || 0}
                        </p>
                        <p className="text-sm text-gray-500">applications</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <p>Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                      {job.salary && <p>Salary: {job.salary}</p>}
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
