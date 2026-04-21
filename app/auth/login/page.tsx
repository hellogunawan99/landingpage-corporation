"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import brand from "@/config/brand";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(true);
  const [message, setMessage] = useState("");

  const showMessage = (msg: string) => {
    setMessage(msg);
  };

  useEffect(() => {
    checkFirebaseAuth();
  }, []);

  const checkFirebaseAuth = async () => {
    try {
      const { auth, onAuthStateChanged } = await import("@/firebase");
      
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userEmail = user.email;
          const userName = user.displayName;
          
          const res = await fetch("/api/auth/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, name: userName }),
          });
          
          const data = await res.json();
          
          if (data.success && data.user) {
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            if (data.user.role === "ADMIN") {
              window.location.href = "/admin/dashboard";
            } else {
              window.location.href = "/";
            }
            return;
          }
        }
        setGoogleLoading(false);
      });
    } catch (err) {
      console.error("Auth check error:", err);
      setGoogleLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { auth, signInWithEmailAndPassword } = await import("@/firebase");
      
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (firebaseError: any) {
        const errorCode = firebaseError.code;
        
        if (errorCode === "auth/user-not-found" || errorCode === "auth/invalid-credential") {
          showMessage("No account found with this email address");
        } else if (errorCode === "auth/wrong-password" || errorCode === "auth/invalid-credential") {
          showMessage("Incorrect password");
        } else if (errorCode === "auth/too-many-requests") {
          showMessage("Too many failed attempts. Please try again later.");
        } else if (errorCode === "auth/invalid-email") {
          showMessage("Please enter a valid email address");
        } else if (errorCode === "auth/network-request-failed") {
          showMessage("Network error. Please check your connection.");
        } else {
          showMessage("Login failed. Please check your credentials.");
        }
        setLoading(false);
        return;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showMessage(data.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      if (data.user) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
      }

      if (data.role === "ADMIN") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (err: any) {
      console.error("Login error:", err);
      showMessage("Login failed. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");
    
    try {
      const { auth, signInWithRedirect, googleProvider } = await import("@/firebase");
      await signInWithRedirect(auth, googleProvider);
    } catch (err: any) {
      console.error("Google login error:", err);
      showMessage("Google login failed. Please try again.");
      setLoading(false);
    }
  };

  if (googleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Checking login status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{brand.auth.login.title}</h2>
          <p className="mt-2 text-gray-600">{brand.auth.login.subtitle}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{brand.auth.login.title}</CardTitle>
            <CardDescription>{brand.auth.login.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {message && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm">
                {message}
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FcGoogle className="mr-2 h-4 w-4" />
              )}
              {brand.auth.login.googleButton}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {brand.auth.login.dividerText}
                </span>
              </div>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={brand.auth.login.emailPlaceholder}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={brand.auth.login.passwordPlaceholder}
                  required
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  brand.auth.login.submitButton
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600">
              {brand.auth.login.noAccountText}{" "}
              <Link href="/auth/register" className="text-blue-600 hover:underline">
                {brand.auth.login.signUpLink}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
