import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const jobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  salary: z.string().optional(),
  location: z.string().min(2),
  destination: z.string().min(2),
  categoryId: z.string(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination");
  const categoryId = searchParams.get("categoryId");
  const search = searchParams.get("search");

  const where: any = { status: "ACTIVE" };

  if (destination) {
    where.destination = destination;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const jobs = await prisma.job.findMany({
    where,
    include: {
      category: true,
      employer: {
        select: { id: true, name: true },
      },
      _count: {
        select: { applications: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "EMPLOYER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = jobSchema.parse(body);

    const job = await prisma.job.create({
      data: {
        ...data,
        employerId: session.user.id,
      },
      include: {
        category: true,
        employer: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
