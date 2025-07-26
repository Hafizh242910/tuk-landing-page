import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { userUpdateSchema } from "@/lib/validations";
import { hashPassword } from "@/lib/auth";
import { apiResponse, apiError, handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

// GET /api/users/[id] - Get user by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return apiError(404, "User not found");
    }

    return apiResponse(200, user, "User retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validatedData = userUpdateSchema.parse(body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return apiError(404, "User not found");
    }

    // Check if email is being changed and if it already exists
    if (validatedData.email && validatedData.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });

      if (emailExists) {
        return apiError(400, "User with this email already exists");
      }
    }

    // Prepare update data
    const updateData = { ...validatedData };

    // Hash password if provided
    if (validatedData.password) {
      updateData.password = await hashPassword(validatedData.password);
    }

    // Update user
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return apiResponse(200, user, "User updated successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return apiError(404, "User not found");
    }

    // Prevent deletion of admin users
    if (existingUser.role === "ADMIN") {
      return apiError(400, "Cannot delete admin users");
    }

    // Delete user
    await prisma.user.delete({
      where: { id },
    });

    return apiResponse(200, null, "User deleted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
