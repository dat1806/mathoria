# MVP Specification

## 1. MVP objective
Build a playable vertical slice that tests three hypotheses:
1. A beginner can understand the basic meaning of multiplication.
2. The child enjoys using math across different game activities.
3. Building and permanently changing the world creates motivation to continue.

Target playable content: approximately 30–45 minutes for a first-time player, with progress saved locally.

## 2. MVP flow
`Tutorial → Camp → Forest Adventure → Gathering → Farmer Quest → Slime Battle → Reward → Return to Camp → Build Farm → Deep Forest/Farming → Big Slime Mini Boss → MVP completion`

## 3. Tutorial
Approximately 5–10 minutes.
- Introduce equal groups/repeated addition and the multiplication sign.
- Use very small facts such as 2×2, 2×3, 3×2, 2×4, 3×3.
- Include visual groups, choosing an expression/result, and at least one simple construction interaction.
- No timer and no harsh penalties.

## 4. Camp
Initial home contains Hero, Guide, camp, and Adventure entry point.
After the first adventure, Farm can be built and permanently appears in the world.

## 5. Map
Only a minimal path is required:
- Camp
- Forest
- Deep Forest (initially locked, then unlocked)

## 6. Adventure presentation
Use a simple node/path or guided scene progression. Free movement/WASD is not required.

## 7. MVP activity types
### Gathering
Recognize quantities/groups or choose matching expressions while collecting resources.

### NPC Quest
Farmer asks a contextual multiplication problem, e.g. equal food for animals.

### Battle
Friendly Slime encounter. Math answers power attacks. Wrong answers invoke Guide support and retry.

### Farming
Construct equal groups/rows through planting or similar interactions.

## 8. Characters/assets required conceptually
- Hero
- Fox Guide
- Farmer
- Forest Slime
- Big Slime
- Camp
- Farm
- Forest environment
- basic items: material/log, carrot, plant, coin, chest

Use placeholders/CSS/SVG during early implementation. Final asset production should follow validated gameplay.

## 9. Economy
V1 currencies:
- Materials: required for Farm/world construction.
- Coins: awarded but cosmetic shop is out of scope.

Learning mastery is separate and never spendable.

First Farm construction should be achievable naturally through the first adventure without repetitive grinding.

## 10. Learning engine MVP
Track attempts by math fact and skill type. Minimum skill categories:
- calculate
- recognize
- apply
- construct

Support adaptive reappearance of weak facts/skills using simple deterministic rules.

## 11. Persistence
Persist locally:
- tutorial completion;
- adventure completion;
- resources;
- world/building state;
- learning attempts/mastery state.

No account or cloud save is required.

## 12. Explicit non-goals
Do NOT implement in the MVP:
- authentication/account system;
- backend/database/cloud save;
- multiplayer;
- leaderboard;
- cosmetic shop;
- pets;
- character customization;
- full Settlement/Village/Castle/Kingdom progression;
- division content;
- timed challenges;
- elite monster system;
- stage Final Events;
- full parent dashboard;
- complex crafting;
- large open world/free movement;
- large monster roster.

## 13. Success signals for playtesting
Observe whether:
- the child can explain/recognize what a small multiplication expression represents;
- understanding transfers across visual, contextual, calculate, and construct activities;
- the child can navigate without constant adult explanation;
- wrong-answer support helps rather than frustrates;
- building the Farm feels rewarding;
- the child voluntarily wants to continue after the vertical slice.
