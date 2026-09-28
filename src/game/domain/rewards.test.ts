import { describe, expect, it } from "vitest";
import { applyReward } from "./rewards";

describe("applyReward", () => {
  it("updates only the rewarded inventory resource", () => {
    const inventory = { materials: 2, coins: 3 };
    expect(applyReward(inventory, { type: "MATERIAL", amount: 5 })).toEqual({
      materials: 7,
      coins: 3,
    });
    expect(applyReward(inventory, { type: "COIN", amount: 5 })).toEqual({
      materials: 2,
      coins: 8,
    });
  });

  it("rejects invalid reward amounts", () => {
    expect(() => applyReward({ materials: 0, coins: 0 }, { type: "COIN", amount: -1 })).toThrow();
  });
});
