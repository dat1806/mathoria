# Mathoria — Phase 03: First Adventure

## 1. Purpose

Phase 03 implements Mathoria's first real adventure after the multiplication tutorial.

The purpose is to prove the core loop:

**Learn → Apply → Adventure → Earn → Prepare to Build**

The child explores the Forest, gathers resources, helps an NPC, discovers a non-math world interaction, and completes the first friendly Slime battle. The phase ends back at Camp with enough Materials to prepare for Farm construction.

Phase 03 does **not** build the Farm.

## 2. Read Before Implementation

Read, in order:

1. `AGENTS.md`
2. `docs/GAME_DESIGN.md`
3. `docs/LEARNING_SYSTEM.md`
4. `docs/DESIGN_SYSTEM.md`
5. `docs/VISUAL_DESIGN.md`
6. `docs/MVP_SPEC.md`
7. `docs/TECHNICAL_ARCHITECTURE.md`
8. `docs/SPEC_CONSISTENCY.md`
9. `docs/phases/PHASE_01_FOUNDATION.md`
10. `docs/phases/PHASE_02_MULTIPLICATION_TUTORIAL.md`
11. this document

For player-facing work, inspect `docs/references/mathoria-visual-anchor.png`.

The visual anchor defines visual language, not pixel-perfect layout.

## 3. Phase Goal

Implement one complete 10–15 minute adventure:

**Nguyên liệu đầu tiên**

Narrative:

The Hero and Fox want to turn the empty Camp plot into a Farm, but they need Materials. Fox leads the Hero into the Forest.

The child:

1. gathers berries;
2. recognizes a mushroom array;
3. helps Forest Keeper Mầm;
4. discovers something without solving math;
5. encounters a friendly Forest Slime;
6. uses multiple math representations during battle;
7. returns to Camp with enough Materials for the future Farm.

## 4. Core Experience Principle

Phase 03 must feel like:

**Explore → Encounter → Understand → Act → World reacts → Reward → Continue**

Do not structure it as a sequence of worksheet questions.

Math should enable meaningful actions in the world.

## 5. Canonical Adventure Flow

**Camp → Forest Entrance → Berry Grove → Mushroom Path → Mầm's Clearing → Glowing Tree → Slime Clearing → Camp**

Do not add additional mandatory encounters in Phase 03.

## 6. Adventure Identity

Player-facing title:

**Nguyên liệu đầu tiên**

Recommended internal ID:

`FIRST_MATERIALS`

Use the repository's existing naming convention if one is already established.

## 7. Scope

Required:

- explicit adventure/encounter progression;
- Forest presentation;
- gathering;
- NPC help interaction;
- one non-math exploration encounter;
- simple friendly battle;
- persistent rewards;
- persistence/resume;
- learning/mastery integration;
- Vietnamese localization.

Do not build a generic RPG, quest, dialogue, combat, or workflow engine.

## 8. Explicit Non-Goals

Do NOT implement:

- Farm construction or farming;
- Deep Forest;
- Big Slime;
- timed challenges;
- player HP/lives/game over;
- punishment for wrong answers;
- equipment or weapons systems;
- XP/levels;
- crafting;
- shops;
- pets;
- character creator;
- backend/auth/cloud save;
- division gameplay.

## 9. Reuse Existing Architecture

Reuse the existing:

- `MathProblem`;
- `LearningSkill`;
- `ProblemType`;
- `ProblemRepresentation`;
- semantic expression evaluation;
- `LearningAttempt`;
- mastery update pipeline;
- `GameState`;
- Zustand store;
- persistence/migrations;
- Vietnamese i18n;
- existing game UI components.

Do not create a second learning, mastery, resource, save, or localization system.

## 10. Adventure Progress

Extend existing adventure progress only as needed.

A reasonable encounter ID set is:

```ts
export type FirstAdventureEncounterId =
  | "FOREST_ENTRANCE"
  | "BERRY_GROVE"
  | "MUSHROOM_PATH"
  | "MAM_CLEARING"
  | "GLOWING_TREE"
  | "SLIME_CLEARING"
  | "RETURN_TO_CAMP";
```

Persist enough information to know:

- whether the adventure started;
- current encounter;
- completed required encounters;
- adventure completion;
- reward/completion facts needed to prevent duplicate rewards.

Do not persist transient animation/UI state.

## 11. Save Migration

If persistent shape changes:

- increment save version;
- migrate valid Phase 02 saves;
- preserve tutorial completion;
- preserve inventory;
- preserve learning mastery;
- preserve unlocked locations;
- safely initialize new adventure state.

Do not invalidate valid Phase 02 progress.

If persistent shape does not change, do not increment version unnecessarily.

## 12. Resume Behavior

Reload must resume at a sensible stable checkpoint.

At minimum:

- Berry Grove resumes at Berry Grove;
- completed Mầm reward does not repeat;
- Slime encounter resumes without duplicating completed rewards;
- completed adventure remains complete.

Exact animation-frame restoration is not required.

## 13. Camp Departure

After Phase 02, Forest is already unlocked.

Fox draws attention to the empty Farm plot.

Suggested Vietnamese direction:

> “Chỗ này có thể trở thành một nông trại đấy!”

> “Nhưng chúng ta cần thêm nguyên liệu trước.”

> “Trong rừng chắc chắn có thứ chúng ta cần. Đi thôi!”

Keep dialogue short.

Do not introduce a quest-log dashboard.

## 14. Forest Entrance

Purpose:

- establish Forest mood;
- transition from Camp;
- show a readable path forward;
- provide a brief exploration moment.

No math is required here.

## 15. Encounter 1 — Berry Grove

Narrative: Fox notices berry bushes and the group gathers supplies.

Mathematical structure:

**3 groups × 2 berries = 6**

Primary representation:

`EQUAL_GROUPS`

Use an existing canonical skill appropriate to the committed solution.

The child should interact with visible groups before seeing abstract notation.

Preferred reinforcement after success:

`2 + 2 + 2 = 6`

then:

`3 × 2 = 6`

Do not open immediately with `3 × 2 = ?`.

### Learning Recording

A meaningful completed solution uses:

**MathProblem → evaluation → LearningAttempt → mastery**

Do not record each berry click as an attempt.

### Reward

**+2 Materials**

Berries are contextual objects, not a new persistent inventory currency.

## 16. Encounter 2 — Mushroom Path

Mathematical structure:

**2 rows × 4 mushrooms = 8**

Representation:

`ARRAY`

Skill:

`RECOGNIZE`

The child recognizes the multiplication represented by the array.

### Semantic Evaluation

Reuse Phase 02 semantic expression evaluation.

Do not encode an expression choice as a fake numeric result.

If the target representation is `2 × 4`, `4 × 2` must not automatically be accepted merely because both equal 8. A future lesson may explicitly teach commutativity.

### Reward

**+2 Materials**

Mushrooms remain contextual objects.

## 17. Encounter 3 — Help Mầm

Introduce:

**Mầm — Forest Keeper**

Visual direction:

- small friendly hedgehog;
- rounded storybook proportions;
- small backpack;
- leaf/forest accessories;
- warm expression.

Mầm is not the Farmer.

Suggested dialogue:

> “Ôi! Hai cậu có thể giúp mình một chút không?”

> “Mình đang chuẩn bị thức ăn cho mấy bạn thỏ.”

After success:

> “Cảm ơn nhé!”

> “Hai cậu đang tìm nguyên liệu à?”

> “Mình thấy một đống gỗ ở phía sâu trong rừng... nhưng hình như có ai đó đang ở đó.”

This leads toward the Slime.

### Math Encounter

Use:

**3 rabbits × 2 carrots = 6**

Representation:

`WORD_PROBLEM`

Skill:

`APPLY`

Show the rabbits and carrots visually. Avoid a long text problem.

Possible interaction:

- select total carrots;
- distribute carrots;
- construct the groups.

Choose the smallest implementation preserving the learning objective.

Committed solutions use the existing learning/mastery pipeline.

Wrong answers cause no resource loss or punishment.

### Reward

- **+3 Materials**
- **+1 Coin**

Grant once.

## 18. Encounter 4 — Glowing Tree

This is intentionally a **World Encounter**, not a Math Encounter.

Purpose:

- pacing;
- curiosity;
- exploration;
- demonstrate that not every interaction is a math problem.

Recommended interaction:

- glowing tree/leaves;
- subtle magical effect;
- Fox reacts;
- child explores;
- hidden Coin discovered.

No multiplication question.

No `LearningAttempt`.

### Reward

**+1 Coin**

Grant once.

## 19. Math Encounter vs World Encounter

Phase 03 establishes a conceptual distinction.

**Math Encounter:** has a learning objective and records meaningful committed solutions through the learning/mastery pipeline.

Examples: Berry Grove, Mushroom Path, Mầm, Slime rounds.

**World Encounter:** exists for exploration/story/discovery/pacing and does not fabricate a math problem.

Example: Glowing Tree.

Do not over-engineer a generic class hierarchy for this distinction.

## 20. Encounter 5 — Forest Slime

The Slime is near or blocking the final resource bundle.

It must be:

- cute;
- green;
- rounded;
- bouncy;
- non-frightening.

The battle is the adventure climax.

Conceptual loop:

**Problem → Solve → Hero magic → Slime reaction → Next round**

Do not build a universal RPG combat engine.

## 21. Battle Rules

Use approximately 3 learning rounds.

No:

- player HP;
- lives;
- game over;
- timer;
- score;
- combo;
- punishment for slow/wrong answers.

Correct answer:

- Hero staff glows;
- magic effect plays;
- Slime bounces/reacts;
- next round begins.

Wrong answer:

- no Slime retaliation because of the mistake;
- Fox supports;
- clearer representation/hint appears;
- retry.

## 22. Battle Round 1 — Recognize

Recommended fact:

**3 × 2**

Representation:

`EQUAL_GROUPS`

Skill:

`RECOGNIZE`

Example:

`●●   ●●   ●●`

Child identifies the represented multiplication.

Use semantic expression evaluation.

## 23. Battle Round 2 — Construct / Connect

Recommended fact:

**3 × 3 = 9**

Start from:

`3 + 3 + 3`

Skill:

`CONSTRUCT`

Child selects/builds:

`3 × 3`

The objective is connecting repeated addition to multiplication, not merely selecting numeric `9`.

## 24. Battle Round 3 — Calculate

Recommended fact:

**2 × 4 = 8**

Representation:

`ARRAY`

Skill:

`CALCULATE`

Show a clear 2-by-4 arrangement and ask for the total.

Keep facts beginner-friendly.

## 25. Battle Learning Boundary

Every committed battle solution uses:

**MathProblem → evaluation → LearningAttempt → mastery**

Battle visuals consume the evaluation result.

Battle code must not own a second correctness/mastery system.

## 26. Battle Hint Flow

Wrong answer:

1. gentle feedback;
2. Fox reacts;
3. tail glows;
4. clearer visual representation or short hint;
5. retry.

Do not immediately reveal the answer unless stronger support is already required by the canonical learning rules.

## 27. Slime Resolution

The Slime does not die.

Recommended resolution:

- wobble;
- spin/become briefly dizzy;
- bounce aside;
- calm/friendly reaction.

Hero then accesses the resource bundle.

### Reward

- **+5 Materials**
- **+2 Coins**

Grant once after battle completion.

## 28. Canonical Reward Economy

| Encounter | Materials | Coins |
| --- | ---: | ---: |
| Berry Grove | 2 | 0 |
| Mushroom Path | 2 | 0 |
| Help Mầm | 3 | 1 |
| Glowing Tree | 0 | 1 |
| Forest Slime | 5 | 2 |
| **Total** | **12** | **4** |

The next Farm phase may require **12 Materials**.

Do not implement Farm spending/construction in Phase 03.

## 29. Reward Idempotency

Persistent rewards must be idempotent.

Reloading, revisiting dialogue, remounting a component, or repeated completion actions must not duplicate rewards.

Prefer domain/store actions that coordinate encounter completion and reward granting.

Do not rely only on local React state.

Add tests.

## 30. Return to Camp

After Slime completion:

- mark adventure complete;
- return Hero/Fox to Camp;
- retain Materials/Coins;
- visually emphasize the empty Farm plot.

Suggested Fox line:

> “Chúng ta có đủ nguyên liệu rồi!”

The child should understand that the Farm is the next objective.

Do not build it.

## 31. Farm Plot Tease

Allowed:

- soft glow;
- sparkle;
- small `!`;
- build sign;
- Fox attention.

Do not implement Phase 04 construction gameplay.

## 32. No Score Screen

Do not show:

- accuracy;
- stars based on correctness;
- mistakes count;
- grade;
- ranking.

A short in-world reward presentation is allowed.

The emotional ending is:

**“We brought back what we needed.”**

not:

**“You scored 8/10.”**

## 33. Forest Visual Direction

Follow `VISUAL_DESIGN.md`.

Use:

- Cozy Storybook Fantasy 2D;
- 3/4 top-down composition;
- rounded foliage;
- warm natural colors;
- readable paths;
- berries/mushrooms/logs/stones;
- subtle magical accents.

Forest may feel more adventurous than Camp, but not dark or frightening.

## 34. Visual Density

Exploration may be visually rich.

When the child needs to count/recognize:

- reduce decorative noise;
- separate groups clearly;
- keep objects countable;
- distinguish interaction objects from decoration.

Learning clarity outranks decoration.

## 35. Character Direction

**Hero:** child adventurer + magic staff.

**Fox:** orange/golden guide + glowing tail tip.

**Mầm:** friendly hedgehog Forest Keeper, distinct from Farmer.

**Slime:** cute green rounded creature.

Placeholders are acceptable until production assets exist.

## 36. UI & Navigation

Reuse lightweight game UI components where appropriate.

Potential reusable pieces:

- `DialogueBox`;
- `ResourceIndicator`;
- `GameButton`;
- learning option controls.

Do not introduce a large UI framework.

Guide the child primarily with world composition:

- paths;
- glow;
- character placement;
- environmental focus.

Do not require a quest log.

## 37. Vietnamese Localization

All player-facing copy uses the existing i18n layer.

V1 remains Vietnamese-only.

Do not add English locale content.

Do not bake instructions into background images.

## 38. Content vs Runtime State

Static content/configuration may contain:

- encounter order;
- encounter IDs;
- reward definitions;
- `MathProblem` definitions;
- dialogue localization keys.

Persistent state stores progress, not copies of static encounter definitions.

## 39. Learning Content Range

Keep multiplication facts small.

Recommended range:

- `2 × 2`;
- `2 × 3`;
- `3 × 2`;
- `2 × 4`;
- `3 × 3`.

Difficulty increases through representation and reduced scaffolding, not large numbers.

## 40. Interaction Variety

Avoid making every Math Encounter the same three-button quiz.

Use simple variation where practical:

- collect/group;
- expression recognition;
- select total;
- distribute;
- construct/select expression.

Do not create complex generic interaction infrastructure solely for variety.

## 41. Store / Application Actions

Prefer explicit actions such as:

- start adventure;
- complete encounter;
- grant encounter reward;
- record learning attempt;
- complete adventure.

Names may follow existing code conventions.

Avoid arbitrary nested Zustand mutation from React components.

## 42. Battle Architecture

Phase 03 only needs:

- ordered rounds;
- current round;
- learning problem;
- evaluation result;
- visual reaction;
- completion.

Do not add RPG stats such as initiative, defense, mana, elements, status effects, or cooldowns.

## 43. Encounter Architecture

Prefer a small explicit adventure controller/state machine.

Do not build a generic workflow/quest engine.

Generalize only after future adventures demonstrate actual reuse.

## 44. Debug Support

Extend `/debug` only where useful.

Possible information:

- current adventure;
- current encounter;
- completed encounters;
- battle round;
- Materials;
- Coins.

Possible dev actions:

- reset First Adventure;
- jump to encounter.

Debug actions must not accidentally duplicate production rewards.

## 45. Required Learning Tests

Test at minimum:

- Berry encounter learning recording;
- Mushroom semantic recognition;
- same-result but semantically wrong expression where relevant;
- Mầm `APPLY` problem;
- Slime Round 1 recognition;
- Slime Round 2 construction;
- Slime Round 3 calculation;
- wrong committed answer produces an unsuccessful attempt;
- correct answer updates mastery through the existing pipeline.

Prefer domain tests over decorative snapshots.

## 46. Required Adventure Tests

Test at minimum:

- adventure starts only when allowed;
- canonical encounter order;
- completing encounter advances progress;
- World Encounter creates no `LearningAttempt`;
- each encounter reward grants once;
- repeated completion/reload cannot duplicate rewards;
- Slime reward grants once;
- completing First Adventure marks it complete.

## 47. Required Persistence Tests

If schema changes, test migration from Phase 02 and preservation of:

- tutorial completion;
- mastery;
- inventory;
- unlocked locations.

Also test:

- save/load during First Adventure;
- save/load after Mầm reward;
- save/load after adventure completion;
- existing corrupted-save recovery.

## 48. Manual Verification — Full Flow

Verify:

1. Start from tutorial-complete state.
2. Start `Nguyên liệu đầu tiên`.
3. Enter Forest.
4. Complete Berry Grove → +2 Materials.
5. Complete Mushroom Path → +2 Materials.
6. Help Mầm → +3 Materials, +1 Coin.
7. Interact with Glowing Tree → +1 Coin and no mastery change.
8. Enter Slime battle.
9. Complete all three rounds.
10. Verify Hero magic on correct answers.
11. Verify Fox hint/retry on wrong answers.
12. Verify Slime moves aside rather than dies.
13. Receive +5 Materials, +2 Coins.
14. Return to Camp.
15. Confirm canonical fresh-run total: +12 Materials, +4 Coins.
16. Confirm Farm plot is highlighted.
17. Confirm Farm is not built.

## 49. Manual Verification — Resume & Idempotency

Verify:

1. Reload during Berry Grove.
2. Reload after Berry reward; reward does not duplicate.
3. Reload after Mầm reward; reward does not duplicate.
4. Reload around Slime encounter; completed progress/rewards do not duplicate.
5. Reload after completion; adventure remains complete.

## 50. Manual Verification — Wrong Answers

Test wrong attempts in at least:

- Mushroom Path;
- Mầm;
- Slime.

Confirm:

- no Materials/Coins removed;
- no HP/life lost;
- no game over;
- retry remains available;
- supportive hint appears;
- mastery uses the normal learning pipeline.

## 51. Build & Test Requirements

At completion:

```bash
npm run test
npm run build
```

must succeed.

If linting exists:

```bash
npm run lint
```

must also pass.

Do not remove meaningful tests to make the suite pass.

## 52. Acceptance Criteria — Adventure

- [ ] `Nguyên liệu đầu tiên` is playable after tutorial completion.
- [ ] Forest Entrance exists.
- [ ] Berry Grove exists.
- [ ] Mushroom Path exists.
- [ ] Mầm encounter exists.
- [ ] Glowing Tree World Encounter exists.
- [ ] Forest Slime battle exists.
- [ ] Adventure returns to Camp.
- [ ] Adventure completion persists.
- [ ] Farm construction is not implemented.

## 53. Acceptance Criteria — Learning

- [ ] Berry Grove uses grouped multiplication.
- [ ] Mushroom Path uses `ARRAY` + semantic `RECOGNIZE`.
- [ ] Mầm uses contextual `APPLY`.
- [ ] Slime uses multiple skills/representations.
- [ ] Math Encounters use the existing learning/mastery pipeline.
- [ ] Glowing Tree creates no fake learning attempt.
- [ ] Wrong answers are safe and retryable.
- [ ] No timer.
- [ ] No score/accuracy screen.
- [ ] Beginner facts remain small.

## 54. Acceptance Criteria — Rewards

- [ ] Berry Grove grants +2 Materials once.
- [ ] Mushroom Path grants +2 Materials once.
- [ ] Mầm grants +3 Materials and +1 Coin once.
- [ ] Glowing Tree grants +1 Coin once.
- [ ] Forest Slime grants +5 Materials and +2 Coins once.
- [ ] Fresh-run total is +12 Materials and +4 Coins.
- [ ] Reload/revisit cannot duplicate rewards.
- [ ] No unnecessary persistent Berry/Mushroom/Carrot inventory types.

## 55. Acceptance Criteria — Battle

- [ ] Slime is cute/non-frightening.
- [ ] Battle has approximately 3 canonical learning rounds.
- [ ] Correct answers trigger Hero magic feedback.
- [ ] Wrong answers trigger support/retry.
- [ ] No player HP/lives/game over/timer.
- [ ] Slime does not die.
- [ ] Battle uses existing learning evaluation/mastery.
- [ ] No generic RPG stat system.

## 56. Acceptance Criteria — Narrative & World

- [ ] Child understands why Hero enters Forest.
- [ ] Mầm has a clear story role.
- [ ] Mầm points toward the final resource/Slime.
- [ ] At least one encounter contains no math.
- [ ] World composition communicates next action.
- [ ] Return to Camp sets up Farm as next objective.
- [ ] No quest-log dashboard is required.

## 57. Acceptance Criteria — Visual

- [ ] Follows `VISUAL_DESIGN.md`.
- [ ] Forest follows Cozy Storybook Fantasy.
- [ ] 3/4 top-down composition is preserved where applicable.
- [ ] Fox remains the hint guide.
- [ ] Mầm is distinct from Farmer.
- [ ] Slime is friendly.
- [ ] UI remains organic/game-like.
- [ ] Learning objects are easy to count.
- [ ] Visual anchor is not used as a flattened gameplay background.
- [ ] Vietnamese text remains real UI text.

## 58. Acceptance Criteria — Persistence

- [ ] Current encounter restores sensibly.
- [ ] Completed encounter state persists.
- [ ] Rewards are idempotent.
- [ ] Tutorial completion is preserved.
- [ ] Existing mastery/inventory is preserved.
- [ ] Previous valid saves migrate if schema changes.
- [ ] Corrupted-save recovery still works.

## 59. Acceptance Criteria — Scope

- [ ] No Farm construction/farming.
- [ ] No Deep Forest/Big Slime.
- [ ] No timed challenge.
- [ ] No player health/lives.
- [ ] No XP/levels.
- [ ] No generic inventory/quest/combat engine.
- [ ] No backend/auth/cloud save.
- [ ] No division gameplay.

## 60. Definition of Done

Phase 03 is done when a child can:

1. leave Camp with Fox;
2. explore the Forest;
3. gather resources using multiplication understanding;
4. recognize multiplication in another representation;
5. help Mầm using math in context;
6. discover something without being asked math;
7. overcome a friendly Slime through multiple representations;
8. earn persistent Materials and Coins;
9. return to Camp;
10. see the Farm as the next meaningful objective.

The experience should communicate:

**“I used math while having an adventure.”**

not:

**“I completed another multiplication worksheet.”**

## 61. Expected Codex Completion Report

Report:

1. Summary of changes
2. Files/modules changed
3. Adventure progression decisions
4. Learning problems/skills
5. Reward/idempotency design
6. Save schema/migration changes
7. Reusable UI/game components introduced
8. Tests added
9. `npm run test` result
10. `npm run build` result
11. Manual full-flow verification
12. Manual reload/resume verification
13. Known limitations
14. Deviations from this spec

Do not claim completion if tests/build fail.

Do not silently implement Phase 04.

## 62. Next Phase

After Phase 03 review, the expected direction is:

**Farm Construction / First World Upgrade**

Conceptual loop:

**12 Materials → Build Farm → Camp visibly changes → new gameplay becomes available**

Design Phase 04 only after Phase 03 is validated.
