import { describe, it, expect } from "vitest";
import { rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  it("permite hasta el límite y bloquea después", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      expect(rateLimit(key, 5, 60_000).ok).toBe(true);
    }
    const blocked = rateLimit(key, 5, 60_000);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("mantiene contadores independientes por clave", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    rateLimit(a, 1, 60_000);
    expect(rateLimit(a, 1, 60_000).ok).toBe(false);
    expect(rateLimit(b, 1, 60_000).ok).toBe(true);
  });

  it("reinicia la ventana cuando expira", async () => {
    const key = `win-${Math.random()}`;
    expect(rateLimit(key, 1, 30).ok).toBe(true);
    expect(rateLimit(key, 1, 30).ok).toBe(false);
    await new Promise((r) => setTimeout(r, 40));
    expect(rateLimit(key, 1, 30).ok).toBe(true);
  });
});
