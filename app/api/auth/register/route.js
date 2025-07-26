import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { userCreateSchema } from "@/lib/validations";
import { hashPassword } from "@/lib/auth";
import { apiResponse, apiError, handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

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
      return apiError(409, "User with this email already exists");
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
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return apiResponse(201, user, "User created successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
