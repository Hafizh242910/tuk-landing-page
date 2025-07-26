import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { courseUpdateSchema } from "@/lib/validations";
import { apiResponse, apiError, handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

// GET /api/courses/[id] - Get course by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        schedules: {
          orderBy: { startDate: "asc" },
        },
        _count: {
          select: { schedules: true },
        },
      },
    });

    if (!course) {
      return apiError(404, "Course not found");
    }

    return apiResponse(200, course, "Course retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/courses/[id] - Update course
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validatedData = courseUpdateSchema.parse(body);

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return apiError(404, "Course not found");
    }

    // Update course
    const course = await prisma.course.update({
      where: { id },
      data: validatedData,
    });

    return apiResponse(200, course, "Course updated successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/courses/[id] - Delete course
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id },
      include: {
        _count: {
          select: { schedules: true },
        },
      },
    });

    if (!existingCourse) {
      return apiError(404, "Course not found");
    }

    // Check if course has schedules
    if (existingCourse._count.schedules > 0) {
      return apiError(400, "Cannot delete course with existing schedules");
    }

    // Delete course
    await prisma.course.delete({
      where: { id },
    });

    return apiResponse(200, null, "Course deleted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
