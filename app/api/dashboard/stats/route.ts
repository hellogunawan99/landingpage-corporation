import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [activeJobs, recentApplications] = await Promise.all([
      prisma.job.count({ where: { status: "ACTIVE" } }),
      prisma.application.count(),
    ]);

    return NextResponse.json({
      jobs: activeJobs,
      applications: recentApplications,
    });
  } catch (error) {
    return NextResponse.json({ jobs: 0, applications: 0 });
  }
}
