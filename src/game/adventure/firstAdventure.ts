import type { Reward } from "../domain/rewards";

export const FIRST_ADVENTURE_ID = "FIRST_MATERIALS";

export const firstAdventureEncounters = [
  "FOREST_ENTRANCE",
  "BERRY_GROVE",
  "MUSHROOM_PATH",
  "MAM_CLEARING",
  "GLOWING_TREE",
  "SLIME_CLEARING",
  "RETURN_TO_CAMP",
] as const;

export type FirstAdventureEncounterId =
  (typeof firstAdventureEncounters)[number];

export const firstAdventureRewards: Readonly<
  Partial<Record<FirstAdventureEncounterId, readonly Reward[]>>
> = {
  BERRY_GROVE: [{ type: "MATERIAL", amount: 2 }],
  MUSHROOM_PATH: [{ type: "MATERIAL", amount: 2 }],
  MAM_CLEARING: [
    { type: "MATERIAL", amount: 3 },
    { type: "COIN", amount: 1 },
  ],
  GLOWING_TREE: [{ type: "COIN", amount: 1 }],
  SLIME_CLEARING: [
    { type: "MATERIAL", amount: 5 },
    { type: "COIN", amount: 2 },
  ],
};

export function nextFirstAdventureEncounter(
  current: FirstAdventureEncounterId,
): FirstAdventureEncounterId | null {
  const index = firstAdventureEncounters.indexOf(current);
  return firstAdventureEncounters[index + 1] ?? null;
}
