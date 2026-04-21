import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "MISSING_FIELDS", message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists in our database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "USER_NOT_FOUND", message: "No account found with this email address" },
        { status: 401 }
      );
    }

    // User exists, now check password
    // Note: Firebase handles password verification separately
    // This is just for local database check
    if (user.password) {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return NextResponse.json(
          { error: "INVALID_PASSWORD", message: "Incorrect password" },
          { status: 401 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      role: user.role,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "LOGIN_FAILED", message: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
