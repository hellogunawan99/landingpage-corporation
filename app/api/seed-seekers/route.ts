import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const jobSeekers = await prisma.user.findMany({
    where: { role: "JOB_SEEKER" },
  });

  if (jobSeekers.length === 0) {
    return NextResponse.json({ error: "No job seekers found in database" }, { status: 400 });
  }

  const jobs = await prisma.job.findMany({
    take: 5,
  });

  let applicationsCreated = 0;

  for (let i = 0; i < Math.min(jobSeekers.length, jobs.length); i++) {
    await prisma.application.create({
      data: {
        userId: jobSeekers[i].id,
        jobId: jobs[i].id,
        status: i % 3 === 0 ? "PENDING" : i % 3 === 1 ? "REVIEWING" : "ACCEPTED",
      },
    });
    applicationsCreated++;
  }

  return NextResponse.json({
    message: "Applications seeded successfully",
    applicationsCreated: applicationsCreated,
    sampleJobSeeker: jobSeekers[0].email,
  });
}
