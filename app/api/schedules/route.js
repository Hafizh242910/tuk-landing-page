import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { scheduleCreateSchema } from "@/lib/validations";
import { apiResponse, apiError, handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

// GET /api/schedules - Get all schedules
export async function GET(request) {
  try {
    const schedules = await prisma.schedule.findMany({
      orderBy: { startDate: "asc" },
      include: {
        course: {
          select: {
            id: true,
            title: true,
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
  }
}

// POST /api/schedules - Create new schedule
export async function POST(request) {
  try {
    const body = await request.json();

    // Debug logging
    console.log("=== API RECEIVED DATA ===");
    console.log("Received body:", body);
    console.log("Body type:", typeof body);
    console.log("Body keys:", Object.keys(body));
    console.log("Seats value:", body.seats, "Type:", typeof body.seats);
    console.log(
      "Available value:",
      body.available,
      "Type:",
      typeof body.available
    );
    console.log("Raw body string:", JSON.stringify(body));

    // Check if seats and available are missing
    if (body.seats === undefined) {
      console.error("ERROR: seats is undefined in request body");
    }
    if (body.available === undefined) {
      console.error("ERROR: available is undefined in request body");
    }

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
        seats: validatedData.seats,
        available: validatedData.available,
        status: validatedData.status,
        color: validatedData.color,
        textColor: validatedData.textColor,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            category: true,
          },
        },
      },
    });

    return apiResponse(201, schedule, "Schedule created successfully");
  } catch (error) {
    console.error("Schedule creation error:", error);
    return handleApiError(error);
  }
}
