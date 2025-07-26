import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { orgStructureCreateSchema } from "@/lib/validations";
import { apiResponse, apiError, handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

// GET /api/organizational-structure - Get all structures
export async function GET(request) {
  try {
    // Test connection first
    await prisma.$connect();

    const structures = await prisma.organizationalStructure.findMany({
      orderBy: { level: "asc" },
    });

    return apiResponse(
      200,
      structures,
      "Organizational structures retrieved successfully"
    );
  } catch (error) {
    console.error("Organizational Structure API Error:", error);

    // If it's a connection error, return empty array
    if (
      error.message?.includes("Engine is not yet connected") ||
      error.message?.includes("connect")
    ) {
      return apiResponse(200, [], "No organizational structures available");
    }

    return handleApiError(error);
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/organizational-structure - Create new structure
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = orgStructureCreateSchema.parse(body);

    // Create structure
    const structure = await prisma.organizationalStructure.create({
      data: validatedData,
    });

    return apiResponse(
      201,
      structure,
      "Organizational structure created successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}
