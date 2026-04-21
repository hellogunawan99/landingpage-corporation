import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { userIds, action, adminEmail, targetRole } = await req.json();

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: "No users selected" },
        { status: 400 }
      );
    }

    if (!adminEmail) {
      return NextResponse.json(
        { error: "Admin email required" },
        { status: 400 }
      );
    }

    let updateData: any = {};
    let auditAction = "";

    switch (action) {
      case "activate":
        updateData = { isActive: true };
        auditAction = "ACTIVATE_USER";
        break;
      case "suspend":
        updateData = { isActive: false };
        auditAction = "SUSPEND_USER";
        break;
      case "changeRole":
        if (!targetRole) {
          return NextResponse.json(
            { error: "Target role required" },
            { status: 400 }
          );
        }
        updateData = { role: targetRole };
        auditAction = targetRole === "EMPLOYER" ? "PROMOTE_TO_EMPLOYER" : "DEMOTE_TO_JOB_SEEKER";
        break;
      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    await prisma.user.updateMany({
      where: {
        id: { in: userIds },
        role: { not: "ADMIN" },
      },
      data: updateData,
    });

    for (const userId of userIds) {
      const targetUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (targetUser) {
        await prisma.auditLog.create({
          data: {
            adminEmail,
            action: auditAction,
            targetUserId: userId,
            details: `${action === "changeRole" ? `Changed role to ${targetRole}` : action} for ${targetUser.email}`,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      updated: userIds.length,
    });
  } catch (error) {
    console.error("Bulk action error:", error);
    return NextResponse.json(
      { error: "Failed to perform bulk action" },
      { status: 500 }
    );
  }
}
