import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/middleware";

async function handler(req) {
  try {
    const [
      totalUsers,
      totalCourses,
      totalSchedules,
      totalStructures,
      recentSchedules,
      upcomingSchedules,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.schedule.count(),
      prisma.organizationalStructure.count(),
      prisma.schedule.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { course: true },
      }),
      prisma.schedule.findMany({
        where: {
          startDate: {
            gte: new Date(),
          },
        },
        take: 5,
        orderBy: { startDate: "asc" },
        include: { course: true },
      }),
    ]);

    const stats = {
      totalUsers,
      totalCourses,
      totalSchedules,
      totalStructures,
      recentSchedules,
      upcomingSchedules,
    };

    return NextResponse.json({
      success: true,
      data: stats,
      message: "Dashboard stats retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard stats",
      },
      { status: 500 }
    );
  }
}

export const GET = requireAdmin(handler);
