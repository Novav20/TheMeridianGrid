import { z } from "zod";

/**
 * Schema: CreateUserSchema
 * Purpose: Validates the request body for creating a new user (Admin only).
 */
export const createUserSchema = z.object({
  email: z.email("Invalid email format"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  roleId: z.uuid("Invalid Role ID"),
});

/**
 * Schema: UpdateUserSchema
 * Purpose: Validates the request body for updating user details.
 */
export const updateUserSchema = z.object({
  email: z.email("Invalid email format").optional(),
  name: z.string().min(2, "Name must be at least 2 characters long").optional(),
  roleId: z.uuid("Invalid Role ID").optional(),
});

/**
 * Types inferred from Zod schemas
 */
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
