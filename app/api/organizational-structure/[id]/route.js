import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { orgStructureUpdateSchema } from "@/lib/validations";
import { apiResponse, apiError, handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

// GET /api/organizational-structure/[id] - Get organizational structure by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const structure = await prisma.organizationalStructure.findUnique({
      where: { id },
    });

    if (!structure) {
      return apiError(404, "Organizational structure not found");
    }

    return apiResponse(
      200,
      structure,
      "Organizational structure retrieved successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/organizational-structure/[id] - Update organizational structure
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validatedData = orgStructureUpdateSchema.parse(body);

    // Check if structure exists
    const existingStructure = await prisma.organizationalStructure.findUnique({
      where: { id },
    });

    if (!existingStructure) {
      return apiError(404, "Organizational structure not found");
    }

    // Update organizational structure
    const structure = await prisma.organizationalStructure.update({
      where: { id },
      data: validatedData,
    });

    return apiResponse(
      200,
      structure,
      "Organizational structure updated successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/organizational-structure/[id] - Delete organizational structure
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Check if structure exists
    const existingStructure = await prisma.organizationalStructure.findUnique({
      where: { id },
    });

    if (!existingStructure) {
      return apiError(404, "Organizational structure not found");
    }

    // Delete organizational structure
    await prisma.organizationalStructure.delete({
      where: { id },
    });

    return apiResponse(
      200,
      null,
      "Organizational structure deleted successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}
