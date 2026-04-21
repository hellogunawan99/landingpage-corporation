import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      employer: {
        select: { id: true, name: true },
      },
      _count: {
        select: { applications: true },
      },
    },
  });

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}
