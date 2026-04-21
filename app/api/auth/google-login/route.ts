import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, name, phone, firebaseUid } = await req.json();

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist, create with JOB_SEEKER role
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || "User",
          phone: phone || null,
          role: "JOB_SEEKER",
          password: "", // Google users don't have password in our DB
        },
      });
    } else if (phone && !user.phone) {
      // Update phone if not already set
      user = await prisma.user.update({
        where: { email },
        data: { phone },
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    return NextResponse.json(
      { error: "Failed to process login" },
      { status: 500 }
    );
  }
}
