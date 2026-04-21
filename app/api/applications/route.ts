import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const applicationSchema = z.object({
  jobId: z.string(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = applicationSchema.parse(body);

    const existingApplication = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId: session.user.id,
          jobId: data.jobId,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        jobId: data.jobId,
        coverLetter: data.coverLetter,
        resumeUrl: data.resumeUrl,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
