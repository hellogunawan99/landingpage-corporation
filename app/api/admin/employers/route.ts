import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const employers = await prisma.user.findMany({
      where: { role: "EMPLOYER" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(employers);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
