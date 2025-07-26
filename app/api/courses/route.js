import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { courseCreateSchema } from "@/lib/validations";
import { apiResponse, apiError, handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

// GET /api/courses - Get all courses
export async function GET(request) {
  try {
    // Test connection first
    await prisma.$connect();

    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { schedules: true },
        },
      },
    });

    return apiResponse(200, courses, "Courses retrieved successfully");
  } catch (error) {
    console.error("Courses API Error:", error);

    // If it's a connection error, return empty array
    if (
      error.message?.includes("Engine is not yet connected") ||
      error.message?.includes("connect")
    ) {
      return apiResponse(200, [], "No courses available");
    }

    return handleApiError(error);
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/courses - Create new course
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = courseCreateSchema.parse(body);

    // Create course
    const course = await prisma.course.create({
      data: validatedData,
    });

    return apiResponse(201, course, "Course created successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
