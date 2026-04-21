import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();
    const request = await prisma.employerRequest.findUnique({
      where: { id: params.id },
    });

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (status === "APPROVED") {
      const hashedPassword = await bcrypt.hash(request.password, 10);
      await prisma.user.create({
        data: {
          email: request.email,
          password: hashedPassword,
          name: request.companyName,
          phone: request.phone,
          role: "EMPLOYER",
        },
      });
    }

    await prisma.employerRequest.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
