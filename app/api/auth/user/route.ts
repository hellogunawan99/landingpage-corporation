import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(null);
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist, create them with JOB_SEEKER role
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: "User",
          password: "", // Firebase handles password
          role: "JOB_SEEKER",
        },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("User fetch error:", error);
    return NextResponse.json(null);
  }
}
