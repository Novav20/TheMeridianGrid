import request from "supertest";
import { app } from "../app";
import { describe, it, expect } from "vitest";

describe("Smoke Test", () => {
  it("should return the server status message", async () => {
    const response = await request(app).get("/");
    
    expect(response.status).toBe(200);
    expect(response.text).toBe("TMG Server is running.");
  });

  it("should return 404 for unknown routes", async () => {
    const response = await request(app).get("/api/unknown-route");
    
    expect(response.status).toBe(404);
  });
});
