import { z } from "zod";

/**
 * Schema: LoginSchema
 * Purpose: Validates the request body for the POST /api/auth/login endpoint.
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

/**
 * Type: LoginDto
 * Purpose: TypeScript type inferred from the Zod schema.
 */
export type LoginDto = z.infer<typeof loginSchema>;
