import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { userLoginSchema } from "@/lib/validations";
import { comparePassword, generateToken } from "@/lib/auth";
import { apiResponse, apiError, handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = userLoginSchema.parse(body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return apiError(401, "Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await comparePassword(
      validatedData.password,
      user.password
    );

    if (!isPasswordValid) {
      return apiError(401, "Invalid email or password");
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Return user data and token
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const response = apiResponse(
      200,
      { user: userData, token },
      "Login successful"
    );

    // Set token in cookie for admin access
    if (user.role === "ADMIN") {
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });
    }

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
