"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users } from "lucide-react";

export default function RoleSelectionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  const handleSelectRole = async (role: string) => {
    try {
      const res = await fetch("/api/auth/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Failed to update role. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome!
          </h2>
          <p className="mt-2 text-gray-600">
            How would you like to use Tunaskarya?
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Choose Your Role</CardTitle>
            <CardDescription>
              Select one option below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <button
              onClick={() => handleSelectRole("JOB_SEEKER")}
              className="w-full border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Users className="h-12 w-12 mx-auto mb-3 text-primary" />
              <div className="text-center">
                <div className="font-bold text-lg">I&apos;m looking for work</div>
                <div className="text-sm text-gray-500">Find overseas jobs</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectRole("EMPLOYER")}
              className="w-full border-2 border-gray-200 rounded-lg p-6 hover:border-secondary hover:bg-secondary/5 transition-colors"
            >
              <Briefcase className="h-12 w-12 mx-auto mb-3 text-secondary" />
              <div className="text-center">
                <div className="font-bold text-lg">I want to hire</div>
                <div className="text-sm text-gray-500">Post jobs & find talent</div>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
