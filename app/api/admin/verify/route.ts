import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ isAdmin: false });
    }

    // Check if user is admin in database
    const admin = await prisma.admin.findUnique({
      where: { firebaseUid: uid },
    });

    return NextResponse.json({ isAdmin: !!admin, admin });
  } catch (error) {
    return NextResponse.json({ isAdmin: false });
  }
}
