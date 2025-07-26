import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { userCreateSchema } from "@/lib/validations";
import { hashPassword } from "@/lib/auth";
import { apiResponse, apiError, handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

// GET /api/users - Get all users
export async function GET(request) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return apiResponse(200, users, "Users retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/users - Create new user
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = userCreateSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return apiError(400, "User with this email already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return apiResponse(201, user, "User created successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
