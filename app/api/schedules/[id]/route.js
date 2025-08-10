import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { scheduleUpdateSchema } from "@/lib/validations";
import { apiResponse, apiError, handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

// GET /api/schedules/[id] - Get schedule by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const schedule = await prisma.schedule.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            shortTitle: true,
            description: true,
            duration: true,
            price: true,
            category: true,
          },
        },
      },
    });

    if (!schedule) {
      return apiError(404, "Schedule not found");
    }

    return apiResponse(200, schedule, "Schedule retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/schedules/[id] - Update schedule
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validatedData = scheduleUpdateSchema.parse(body);

    // Check if schedule exists
    const existingSchedule = await prisma.schedule.findUnique({
      where: { id },
    });

    if (!existingSchedule) {
      return apiError(404, "Schedule not found");
    }

    // Convert dates if provided
    const updateData = {};

    if (validatedData.startDate) {
      const startDate = new Date(validatedData.startDate);
      if (isNaN(startDate.getTime())) {
        return apiError(400, "Invalid start date format");
      }
      updateData.startDate = startDate;
    }

    if (validatedData.endDate) {
      const endDate = new Date(validatedData.endDate);
      if (isNaN(endDate.getTime())) {
        return apiError(400, "Invalid end date format");
      }
      updateData.endDate = endDate;
    }

    // Map form fields to database fields
    if (validatedData.courseId !== undefined)
      updateData.courseId = validatedData.courseId;
    if (validatedData.time !== undefined) updateData.time = validatedData.time;
    if (validatedData.location !== undefined)
      updateData.location = validatedData.location;
    if (validatedData.seats !== undefined)
      updateData.seats = validatedData.seats;
    if (validatedData.available !== undefined)
      updateData.available = validatedData.available;
    if (validatedData.status !== undefined)
      updateData.status = validatedData.status;
    if (validatedData.color !== undefined)
      updateData.color = validatedData.color;
    if (validatedData.textColor !== undefined)
      updateData.textColor = validatedData.textColor;

    // Update schedule
    const schedule = await prisma.schedule.update({
      where: { id },
      data: updateData,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            competencies: true,
            category: true,
          },
        },
      },
    });

    return apiResponse(200, schedule, "Schedule updated successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/schedules/[id] - Delete schedule
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Check if schedule exists
    const existingSchedule = await prisma.schedule.findUnique({
      where: { id },
    });

    if (!existingSchedule) {
      return apiError(404, "Schedule not found");
    }

    // Delete schedule
    await prisma.schedule.delete({
      where: { id },
    });

    return apiResponse(200, null, "Schedule deleted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
