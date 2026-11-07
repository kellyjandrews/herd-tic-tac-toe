import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/health/route";

describe("GET /api/health", () => {
  it("reports ok with the deployed commit", async () => {
    const response = GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ status: "ok", sha: expect.any(String) });
  });
});
