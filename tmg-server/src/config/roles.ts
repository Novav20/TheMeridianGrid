/**
 * System Roles
 * These are the immutable, built-in roles required by the system.
 * While the database supports dynamic roles, these specific role names
 * are referenced by the application logic for core RBAC checks.
 */
export enum SystemRole {
  ADMINISTRATOR = "ADMINISTRATOR",
  INTEGRATOR = "INTEGRATOR",
  OPERATOR = "OPERATOR",
  VIEWER = "VIEWER",
}
