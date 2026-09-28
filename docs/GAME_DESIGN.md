# Multiplication Adventure — Game Design Document

## 1. Vision
A cozy 2D fantasy web game that introduces multiplication through exploration, helping characters, gathering resources, battles, farming, and building a growing world.

The child should feel that they are going on an adventure and building a home. Mathematics is the power used to interact with that world rather than a separate worksheet layer.

## 2. Target player
- Children beginning to learn multiplication.
- Initial experience assumes little or no familiarity with the multiplication sign.
- The game favors short interactions, visual explanation, minimal text, large targets, and gentle feedback.

## 3. Core fantasy
The player arrives in an undeveloped fantasy land with a small companion/guide. By exploring, helping new friends, overcoming friendly monsters, and solving mathematical situations, the player gathers what is needed to grow the land from a camp into a kingdom.

## 4. Player & companion
### Hero
The child controls a customizable fantasy hero conceptually representing themselves in the adventure.

### Guide
A cute fantasy companion (current direction: fox-like guide) accompanies the hero. The guide:
- introduces mechanics;
- gives learning hints;
- reacts to success;
- explains mistakes visually;
- supports the story without long tutorials.

## 5. Core loop
`Home → Adventure → Activity → Reward → Return Home → Build → World Changes → New Adventure`

Short loop: solve an in-world problem and receive immediate visual feedback/reward.
Long loop: adventures provide progress and materials that permanently change the player's world and unlock new activities.

## 6. Gameplay activities
### Monster Battle
Math powers attacks. Friendly monsters are obstacles rather than frightening enemies. Correct reasoning advances combat; mistakes lead to support and retry rather than severe punishment.

### Gathering
The child identifies groups, quantities, or expressions while collecting wood/food/resources.

### NPC Quest
Characters present simple contextual problems: feeding animals, preparing supplies, repairing objects, etc. Helping NPCs can cause them to join the settlement and unlock buildings.

### Farming
The child creates or reasons about equal rows/groups by planting, feeding, or harvesting. This is particularly useful for constructing multiplication rather than only selecting an answer.

### Exploration — future
Use multiplication to repair bridges, clear paths, or open new areas.

### Puzzle/Treasure — future
Missing factors, multiple representations, arrays, and other flexible-thinking challenges unlock treasure.

## 7. One fact, many experiences
Example `3 × 4 = 12` can appear as:
- battle: calculate `3 × 4`;
- gathering: choose the expression matching 3 groups of 4;
- NPC: 3 animals need 4 items each;
- farming: construct 3 rows of 4;
- puzzle: `? × 4 = 12`;
- exploration: determine materials for 3 equal bridge sections.

This is a foundational design rule.

## 8. World progression
Long-term direction:
1. Camp
2. Settlement
3. Village
4. Castle
5. Kingdom

Buildings unlock gameplay rather than serving only as decoration. Examples:
- Farm → farming activities
- Workshop → building/crafting-related interactions
- Magic Tower → puzzle activities
- Training Ground → advanced battle
- Arena → future timed challenges

World progression is driven primarily by adventures, quests, and learning progress. Resources support the fantasy but should not create grind.

## 9. Stage final events
Each major world stage eventually ends with a story event that reviews content from that stage before progression.

Long-term concepts:
- Camp → Monster Raid
- Settlement → Great Storm
- Village → Magical Forest Crisis
- Castle → Dragon Attack
- Kingdom → Dark Portal

Final events should remix previously learned skills rather than introduce new concepts. Failure should lead to contextual side quests/remediation rather than a blunt fail screen.

## 10. Economy direction
V1 uses:
- Materials → construction/world growth
- Coins → future cosmetics/decorations
- Learning mastery → separate learning state, never a spendable currency

Avoid grind. Important buildings should also require story/adventure milestones, not just large resource totals.

## 11. Future expansion
The initial product is multiplication-only. The game world and activity system should later support division without rebuilding the game. Division should be introduced as the inverse/related operation to multiplication through sharing and grouping experiences.
