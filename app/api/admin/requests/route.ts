import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const requests = await prisma.employerRequest.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
