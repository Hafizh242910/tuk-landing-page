import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { courseCreateSchema } from "@/lib/validations";
import { apiResponse, apiError, handleApiError } from "@/lib/api";

// GET /api/courses - Get all courses
export async function GET(request) {
  try {
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
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
