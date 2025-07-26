import { NextResponse } from "next/server";

export const apiResponse = (statusCode, data, message = "") => {
  return NextResponse.json(
    {
      success: statusCode >= 200 && statusCode < 300,
      message,
      data,
    },
    { status: statusCode }
  );
};

export const apiError = (statusCode, message, errors = null) => {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status: statusCode }
  );
};

export const handleApiError = (error) => {
  console.error("API Error:", error);

  if (error.name === "ValidationError") {
    return apiError(400, "Validation error", error.errors);
  }

  if (error.code === "P2002") {
    return apiError(409, "Record already exists");
  }

  if (error.code === "P2025") {
    return apiError(404, "Record not found");
  }

  return apiError(500, "Internal server error");
};
