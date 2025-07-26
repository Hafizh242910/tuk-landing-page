import { z } from "zod";

// User validation schemas
export const userCreateSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "USER"]).optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const userUpdateSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
});

// Course validation schemas
export const courseCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  competencies: z.string().optional(),
  brochure: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  isActive: z.boolean().optional(),
});

export const courseUpdateSchema = courseCreateSchema.partial();

// Schedule validation schemas
export const scheduleCreateSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  time: z.string().optional(),
  location: z.string().optional(),
  seats: z.number().int().positive("Seats must be a positive integer"),
  available: z.number().int().min(0, "Available seats cannot be negative"),
  status: z.enum(["OPEN", "LIMITED", "FULL", "CLOSED", "CANCELLED"]).optional(),
  color: z.string().optional(),
  textColor: z.string().optional(),
});

export const scheduleUpdateSchema = scheduleCreateSchema.partial();

// Organizational structure validation schemas
export const orgStructureCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  department: z.string().optional(),
  level: z.number().int().min(0, "Level must be a non-negative integer"),
  parentId: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
  photo: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const orgStructureUpdateSchema = orgStructureCreateSchema.partial();
