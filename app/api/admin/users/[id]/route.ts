import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { action, adminEmail, targetEmail } = await req.json();

    if (action === "suspend") {
      const user = await prisma.user.update({
        where: { id: params.id },
        data: { isActive: false },
      });

      // Create audit log
      await prisma.auditLog.create({
        data: {
          adminEmail: adminEmail || "unknown",
          action: "SUSPEND_USER",
          targetUserId: params.id,
          details: `Suspended user: ${targetEmail}`,
        },
      });

      return NextResponse.json({ success: true, user });
    }

    if (action === "activate") {
      const user = await prisma.user.update({
        where: { id: params.id },
        data: { isActive: true },
      });

      // Create audit log
      await prisma.auditLog.create({
        data: {
          adminEmail: adminEmail || "unknown",
          action: "ACTIVATE_USER",
          targetUserId: params.id,
          details: `Activated user: ${targetEmail}`,
        },
      });

      return NextResponse.json({ success: true, user });
    }

    if (action === "promote") {
      const user = await prisma.user.update({
        where: { id: params.id },
        data: { role: "EMPLOYER" },
      });

      // Create audit log
      await prisma.auditLog.create({
        data: {
          adminEmail: adminEmail || "unknown",
          action: "PROMOTE_TO_EMPLOYER",
          targetUserId: params.id,
          details: `Promoted to EMPLOYER: ${targetEmail}`,
        },
      });

      return NextResponse.json({ success: true, user });
    }

    if (action === "demote") {
      const user = await prisma.user.update({
        where: { id: params.id },
        data: { role: "JOB_SEEKER" },
      });

      // Create audit log
      await prisma.auditLog.create({
        data: {
          adminEmail: adminEmail || "unknown",
          action: "DEMOTE_TO_JOB_SEEKER",
          targetUserId: params.id,
          details: `Demoted to JOB_SEEKER: ${targetEmail}`,
        },
      });

      return NextResponse.json({ success: true, user });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
