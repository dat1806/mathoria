import { describe, expect, it } from "vitest";
import { createFactKey } from "./math";

describe("createFactKey", () => {
  it("creates a stable operation-aware key", () => {
    expect(
      createFactKey({ operation: "MULTIPLICATION", operands: [3, 4] }),
    ).toBe("MULTIPLICATION:3:4");
  });

  it("keeps operation identity in the key", () => {
    expect(createFactKey({ operation: "DIVISION", operands: [12, 3] })).toBe(
      "DIVISION:12:3",
    );
  });
});
