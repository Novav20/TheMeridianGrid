import request from "supertest";
import { app } from "../app";
import { describe, it, expect, beforeEach } from "vitest";
import { PrismaService } from "../services/prisma.service";
import { PasswordService } from "../services/password.service";
import { SystemRole } from "../config/roles";
import { UserStatus } from "@tmg/shared";


const prisma = PrismaService.getInstance().client;
const passwordService = new PasswordService();

describe("Auth Integration Tests", () => {
  let testUser: any;
  const password = "password123";

  // Run before EVERY test (re-seed user after global truncation)
  beforeEach(async () => {
    // 1. Create User (Roles are already seeded by setup.ts)
    const hash = await passwordService.hash(password);
    testUser = await prisma.user.create({
      data: {
        name: "Test Admin",
        email: "test-admin@tmg.com",
        passwordHash: hash,
        status: UserStatus.ACTIVE,
        role: {
          connect: { name: SystemRole.ADMINISTRATOR },
        },
      },
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully and return an HttpOnly cookie", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: password });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      
      const cookies = response.get("Set-Cookie");
      expect(cookies).toBeDefined();
      expect(cookies?.length).toBeGreaterThan(0);
      
      cookies!.forEach((cookie) => {
        expect(cookie).toContain("token=");
        expect(cookie).toContain("HttpOnly");
      });
    });

    it("should reject invalid passwords", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: "wrong_password" });
        
      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/auth/me", () => {
    it("should return user profile when authenticated", async () => {
      // 1. Login
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: password });
      
      const cookies = loginRes.get("Set-Cookie");
      expect(cookies).toBeDefined();

      // 2. Access Protected Route
      const response = await request(app)
        .get("/api/auth/me")
        .set("Cookie", cookies!);

      expect(response.status).toBe(200);
      expect(response.body.data.email).toBe(testUser.email);
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app).get("/api/auth/me");
      expect(response.status).toBe(401);
    });
  });
});
