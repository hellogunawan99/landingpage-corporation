import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const adminId = searchParams.get("adminId");
    const search = searchParams.get("search");

    let where: any = {};

    if (action && action !== "all") {
      where.action = action;
    }

    if (adminId && adminId !== "all") {
      where.adminId = adminId;
    }

    if (search) {
      where.details = {
        contains: search,
        mode: "insensitive",
      };
    }

    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json([], { status: 500 });
  }
}
