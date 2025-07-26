import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { scheduleCreateSchema } from "@/lib/validations";
import { apiResponse, apiError, handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

// GET /api/schedules - Get all schedules
export async function GET(request) {
  try {
    // Test connection first
    await prisma.$connect();

    const schedules = await prisma.schedule.findMany({
      orderBy: { startDate: "asc" },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            shortTitle: true,
            category: true,
          },
        },
      },
    });

    return apiResponse(200, schedules, "Schedules retrieved successfully");
  } catch (error) {
    console.error("Schedules API Error:", error);

    // If it's a connection error, return empty array
    if (
      error.message?.includes("Engine is not yet connected") ||
      error.message?.includes("connect")
    ) {
      return apiResponse(200, [], "No schedules available");
    }

    return handleApiError(error);
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/schedules - Create new schedule
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = scheduleCreateSchema.parse(body);

    // Convert dates
    const startDate = new Date(validatedData.startDate);
    const endDate = validatedData.endDate
      ? new Date(validatedData.endDate)
      : null;

    // Create schedule
    const schedule = await prisma.schedule.create({
      data: {
        courseId: validatedData.courseId,
        startDate,
        endDate,
        time: validatedData.time,
        location: validatedData.location,
        seats: validatedData.maxSeats,
        available: validatedData.availableSeats,
        status: validatedData.status,
        description: validatedData.description,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            shortTitle: true,
            category: true,
          },
        },
      },
    });

    return apiResponse(201, schedule, "Schedule created successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
