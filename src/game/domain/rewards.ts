import type { InventoryState } from "./gameState";

export type ResourceType = "MATERIAL" | "COIN";

export interface Reward {
  type: ResourceType;
  amount: number;
}

export function applyReward(
  inventory: InventoryState,
  reward: Reward,
): InventoryState {
  if (!Number.isFinite(reward.amount) || reward.amount < 0) {
    throw new Error("Reward amount must be a non-negative finite number");
  }

  return reward.type === "MATERIAL"
    ? { ...inventory, materials: inventory.materials + reward.amount }
    : { ...inventory, coins: inventory.coins + reward.amount };
}
