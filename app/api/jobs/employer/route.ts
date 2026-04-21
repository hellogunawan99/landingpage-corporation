import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const employerId = searchParams.get("employerId");

    if (!employerId || employerId === "self") {
      return NextResponse.json({ error: "Employer ID required" }, { status: 400 });
    }

    const jobs = await prisma.job.findMany({
      where: { employerId },
      include: {
        category: true,
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
