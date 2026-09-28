# Mathoria — Phase 02: Multiplication Tutorial

## 1. Purpose

Phase 02 implements the first player-facing Mathoria learning experience: an approximately 10-minute introduction to multiplication for a child who may not yet understand the multiplication symbol.

The tutorial must teach the meaning of multiplication through the game world before expecting symbolic calculation.

Canonical learning progression:

`Equal Groups → Repeated Addition → Reveal × → Recognize / Construct / Apply → Forest Invitation`

The phase ends by unlocking/teasing the First Adventure. It does **not** implement the Forest Adventure itself.

---

## 2. Read Before Implementation

Before changing code, read:

1. `AGENTS.md`
2. `docs/GAME_DESIGN.md`
3. `docs/LEARNING_SYSTEM.md`
4. `docs/DESIGN_SYSTEM.md`
5. `docs/VISUAL_DESIGN.md`
6. `docs/MVP_SPEC.md`
7. `docs/TECHNICAL_ARCHITECTURE.md`
8. `docs/SPEC_CONSISTENCY.md`
9. `docs/phases/PHASE_01_FOUNDATION.md`
10. this document

For player-facing implementation, inspect:

`docs/references/mathoria-visual-anchor.png`

The visual anchor defines visual language, not pixel-perfect layout or default learning interaction.

---

## 3. Phase Goal

At the end of Phase 02, the player should understand the beginner idea:

> Multiplication describes equal groups of the same quantity.

A successful player experience should connect:

`3 groups of 2 objects`

with:

`2 + 2 + 2 = 6`

and finally:

`3 × 2 = 6`

The child should encounter multiplication as something useful inside Mathoria, not as a worksheet lesson.

---

## 4. Player Assumption

Assume the child:

- is new to multiplication;
- may not know what `×` means;
- can count small quantities;
- can understand simple addition;
- benefits from visual and interactive explanation;
- should not be pressured by time.

Do not begin the tutorial with a symbolic multiplication quiz.

---

## 5. Frozen V1 Decisions

### Language

Player-facing content is Vietnamese.

### Operation

Playable learning content is multiplication only.

### Timer

No countdown timer in Phase 02.

### Wrong answers

No loss of lives, Materials, Coins, progress, or world state for normal learning mistakes.

### Visual direction

**Cozy Storybook Fantasy 2D** with **2D 3/4 top-down** world presentation.

### Persistence

Tutorial progress and meaningful learning progress must survive reload using the Phase 01 persistence foundation.

---

## 6. Explicit Non-Goals

Do NOT implement:

- Forest Adventure gameplay;
- Gathering gameplay;
- NPC Quest gameplay;
- Slime Battle gameplay;
- Farming gameplay;
- Farm construction;
- Deep Forest;
- Big Slime;
- timed challenges;
- division content;
- complete adaptive-learning selection;
- full multiplication curriculum;
- all multiplication tables;
- parent dashboard;
- account/backend/cloud save;
- final production animation library;
- character creator;
- complex inventory;
- score/accuracy summary screen.

Do not expand Phase 02 into the First Adventure.

---

## 7. Canonical Tutorial Journey

The tutorial sequence is:

1. Arrival at Camp
2. Meet Fox Guide
3. Equal Groups interaction
4. Repeated Addition interaction
5. Reveal the multiplication symbol
6. Guided independent practice
7. Gentle support/retry when needed
8. Forest invitation
9. First Adventure becomes available for the next phase

The experience should feel continuous rather than like separate lessons in a course menu.

---

## 8. Approximate Pacing

Pacing is guidance, not a hard timer.

### 0–1 minute

Arrival + Fox introduction.

### 1–3 minutes

Equal Groups.

### 3–5 minutes

Repeated Addition.

### 5–7 minutes

Reveal `×` and connect representations.

### 7–9 minutes

Child tries several small problems through different representations.

### 9–10 minutes

Story transition: Forest invitation.

Do not display a countdown or force the player to finish within ten minutes.

---

## 9. Tutorial State Model

Create an explicit tutorial progression model rather than scattering boolean flags across components.

A small state-machine-like representation is preferred.

Example direction:

```ts
export type MultiplicationTutorialStep =
  | "ARRIVAL"
  | "MEET_FOX"
  | "EQUAL_GROUPS"
  | "REPEATED_ADDITION"
  | "REVEAL_MULTIPLICATION"
  | "GUIDED_PRACTICE"
  | "FOREST_INVITATION"
  | "COMPLETED";
```

A reducer, explicit transition function, or small domain service is acceptable.

Do not add a state-machine framework solely for this phase.

---

## 10. Persistent Tutorial Progress

Tutorial progress must be represented in canonical persistent game state.

Add only the minimum required state.

Recommended direction:

```ts
export interface TutorialProgressState {
  multiplicationIntroStep: MultiplicationTutorialStep;
  multiplicationIntroCompleted: boolean;
}
```

Naming may differ if the existing domain structure suggests a cleaner fit.

Do not store tutorial progress only in React local state.

Reloading the page should not force a player who reached the multiplication reveal to restart from the beginning.

---

## 11. Save Migration

Phase 01 save schema is version `1`.

If adding tutorial state changes the persisted schema, introduce the next save version and implement a real migration through the existing migration boundary.

Existing valid Phase 01 saves must continue to load.

Migration should initialize tutorial progress safely without destroying:

- inventory;
- mastery;
- world state;
- existing settings.

Add migration tests.

Do not silently invalidate all Phase 01 saves merely because Phase 02 adds a field.

---

## 12. Tutorial Runtime Separation

Separate:

- persistent progression;
- learning/domain state;
- temporary interaction/UI state.

Examples of temporary UI state:

- currently dragged berry;
- active animation;
- currently highlighted basket;
- dialogue typing state.

These do not belong in persistent `GameState`.

---

# Tutorial Experience

## 13. Scene 1 — Arrival at Camp

The tutorial begins in a simplified Camp scene.

Required visual elements:

- Hero;
- Fox Guide;
- tent/camp context;
- warm natural environment;
- path/forest suggestion;
- enough empty space for readable interaction.

This is not the full Camp gameplay implementation.

Do not implement building systems or Camp free-roam features here.

The purpose of the scene is to establish place, characters, and motivation.

---

## 14. Scene 2 — Meet Fox

Fox approaches or calls attention to the Hero.

Example Vietnamese tone:

> “Chào cậu! Mình đang chuẩn bị đồ cho chuyến đi. Cậu giúp mình nhé?”

Exact copy may be adjusted for natural Vietnamese, but must remain:

- short;
- child-friendly;
- warm;
- non-instructional in tone.

Do not begin with:

> “Hôm nay chúng ta sẽ học phép nhân.”

The story should create the need for the learning interaction.

---

## 15. Scene 3 — Equal Groups

Fox needs help preparing equal baskets.

Canonical first interaction concept:

- 3 baskets;
- each basket needs 2 berries;
- 6 berries total.

Conceptually:

```text
🧺      🧺      🧺
🍓🍓    🍓🍓    🍓🍓
```

At this point, do **not** require the player to understand `×`.

The learning objective is:

> There are several groups, and every group contains the same number of objects.

---

## 16. Equal Groups Interaction

Prefer a tactile interaction.

Acceptable V1 implementations include:

- click a berry then click a basket;
- drag berries into baskets;
- click/tap baskets to fill them;
- another simple interaction that clearly constructs equal groups.

Choose the simplest reliable web interaction that preserves the learning meaning.

Do not spend the phase building a generalized drag-and-drop engine if click/tap interaction is clearer and more robust.

---

## 17. Equal Group Validation

The interaction should communicate that each basket requires the same quantity.

When complete, visually emphasize:

```text
2     2     2
```

Then connect them as:

```text
2 + 2 + 2
```

Do not immediately replace the visual groups with an abstract equation.

The child should still be able to see the objects/groups when the addition appears.

---

## 18. Scene 4 — Repeated Addition

Introduce another small contextual problem.

Recommended example:

- 3 equal groups;
- 3 mushrooms in each group;
- 9 total.

Conceptually:

```text
🍄🍄🍄
🍄🍄🍄
🍄🍄🍄
```

Ask a short contextual question such as:

> “Có tất cả bao nhiêu cây nấm?”

Allow the child to count if needed.

After success, reveal:

`3 + 3 + 3 = 9`

Fox may say:

> “Có 3 nhóm, mỗi nhóm có 3!”

Keep explanation short.

---

## 19. Repeated Addition Goal

The player should begin recognizing:

```text
same amount
+
same amount
+
same amount
```

as a repeating structure.

Do not require the child to memorize terminology such as “repeated addition.”

The game may use the concept without presenting formal terminology.

---

## 20. Scene 5 — Reveal the Multiplication Symbol

This is the key tutorial moment.

Return to a fact the child already understands visually.

Recommended canonical reveal:

```text
🍎🍎    🍎🍎    🍎🍎

2 + 2 + 2 = 6
```

Fox's tail glows.

The visual transition connects:

```text
2 + 2 + 2
```

with:

```text
3 × 2
```

and then:

```text
3 × 2 = 6
```

Fox may introduce it with a short line such as:

> “Có một cách ngắn hơn!”

Then reinforce:

> “3 nhóm, mỗi nhóm có 2.”

The exact animation may be simple in V1, but the conceptual relationship must be clear.

---

## 21. Meaning of Operand Order

For tutorial presentation, use the convention:

`number of groups × amount in each group`

Example:

`3 × 2`

means:

`3 groups, 2 in each group`

Keep tutorial visuals consistent with this convention.

Do not introduce commutativity as a formal concept during Phase 02.

---

## 22. Reveal Animation

A lightweight animation is enough.

Possible sequence:

1. highlight each equal group;
2. highlight `2 + 2 + 2`;
3. Fox tail glows;
4. repeated `2`s visually connect to the group count;
5. show `3 × 2`;
6. show `= 6`.

Avoid a long cinematic.

The animation should support comprehension and remain skippable/quick enough for replay.

---

# Guided Practice

## 23. Guided Practice Goal

After the reveal, the child should use the concept in several different ways.

Do not immediately give ten symbolic equations.

Phase 02 should demonstrate that one mathematical idea can appear through multiple representations.

---

## 24. Practice Fact Range

Keep facts small.

Recommended Phase 02 fact pool:

```text
2 × 2
2 × 3
3 × 2
2 × 4
3 × 3
```

A smaller subset is acceptable if the tutorial remains clearer.

Do not expand into the full multiplication table.

---

## 25. Required Learning Skills

Phase 02 should meaningfully exercise:

- `RECOGNIZE`
- `CONSTRUCT`
- `APPLY`

It may use a small amount of:

- `CALCULATE`

Do not introduce `MISSING_FACTOR` as a required tutorial skill.

Do not implement timed `FLUENCY` challenges.

---

## 26. Practice — Recognize

Example:

Show two rows of four plants:

```text
🌱 🌱 🌱 🌱
🌱 🌱 🌱 🌱
```

Ask the child to identify the matching multiplication expression.

Example options:

- `2 × 4`
- `4 × 4`
- `2 × 2`

This is one acceptable use of multiple choice because the learning goal is expression recognition.

Multiple choice must not become the only interaction pattern.

---

## 27. Practice — Construct

Provide a target such as:

> “Tạo 3 nhóm, mỗi nhóm có 2 quả.”

The child constructs/selects the correct arrangement.

This can reuse the simple equal-group interaction established earlier.

Avoid building a complex free-form editor.

---

## 28. Practice — Apply

Use a short world problem.

Example:

> “Có 3 chú thỏ. Mỗi chú cần 3 củ cà rốt.”

Represent the situation visually.

Ask the child to reason about the groups and connect them to:

`3 × 3`

The task should remain visually grounded.

---

## 29. Optional Calculate Check

A small symbolic check may appear only after the child has seen the meaning.

Example:

`2 × 3 = ?`

Keep visual support available.

Do not treat symbolic calculation as the tutorial's primary proof of understanding.

---

# Learning Engine Integration

## 30. Use Phase 01 Domain Types

Reuse the existing canonical types and mastery foundation.

Do not create tutorial-only competing concepts for:

- operation;
- learning skill;
- problem type;
- representation;
- fact key;
- mastery.

Tutorial problems should be representable through the existing `MathProblem` model or through the smallest compatible extension if a real gap is discovered.

---

## 31. No Hard-Coded Learning Logic in Components

React components may render a tutorial interaction, but they must not become the canonical owner of math correctness/mastery logic.

Prefer:

`Tutorial interaction → semantic answer/result → learning/domain action → mastery update`

Do not duplicate answer validation across multiple components.

---

## 32. Tutorial Content Configuration

The tutorial sequence may use authored/static content because the pedagogical order is intentional.

However, keep authored content separate from React rendering.

Recommended direction:

```text
src/content/tutorials/multiplicationIntro.ts
```

or another structure consistent with the repository.

The content may reference:

- facts;
- learning skill;
- representation;
- localization keys;
- object/theme configuration.

Do not embed all tutorial facts/dialogue directly inside one large component.

---

## 33. Record Meaningful Attempts

Record learning attempts for practice interactions where the child is actually demonstrating understanding.

Do not inflate mastery by recording every tutorial click as a learning attempt.

For example:

- placing a berry while following explicit instruction may not need a mastery attempt;
- selecting the expression matching an array should record an attempt;
- solving the rabbit/carrot application should record an attempt.

Use the existing mastery update path.

---

## 34. Guided Attempts and Mastery

If a child answers only after a strong hint, record enough information to distinguish that support was used when the existing model permits it.

Do not invent a complicated scoring penalty.

The purpose is future adaptation, not grading the child.

---

# Hint & Wrong-Answer Flow

## 35. General Wrong-Answer Flow

Canonical flow:

`Wrong answer → Fox support → more concrete representation → retry`

Do not automatically advance after a wrong answer.

Do not show a harsh failure screen.

---

## 36. Hint Levels

Use a small progressive hint sequence.

Example for `3 × 2`:

### Initial view

`3 × 2 = ?`

### Hint 1

Show 3 visible groups with 2 objects each.

### Hint 2

Show:

`2 + 2 + 2`

### Hint 3

Highlight counting/group totals step by step.

Then let the child retry.

Do not reveal the final answer immediately unless the interaction cannot progress after sufficient support.

---

## 37. Fox Presentation

The Fox Guide presents support visually.

Use:

- tail glow;
- short supportive Vietnamese copy;
- pointing/highlighting;
- alternative representation.

The Fox component does not own mastery/adaptive logic.

---

## 38. Vietnamese Feedback Tone

Preferred tone examples:

- `Gần đúng rồi! Mình nhìn lại nhé.`
- `Thử đếm từng nhóm cùng mình nào!`
- `Đúng rồi!`
- `Hay lắm!`

Avoid formal/system-like copy such as:

- `Đáp án không chính xác.`
- `Bạn đã thất bại.`
- `Điểm của bạn là 80%.`

All player-facing strings must use localization keys.

---

# Visual Implementation

## 39. Visual Anchor Compliance

Tutorial UI should follow:

- Cozy Storybook Fantasy 2D;
- warm Camp environment;
- rounded organic panels;
- large interaction targets;
- Hero with magic staff;
- orange/golden Fox with glowing tail;
- cream/wood/nature-inspired UI;
- Vietnamese-first readable typography.

Do not reproduce the visual anchor as a flattened background image.

---

## 40. Placeholder Assets

Final character/environment assets are not required to begin Phase 02.

Use placeholders that preserve:

- intended scale;
- composition;
- character location;
- interaction hierarchy;
- approximate visual style.

Do not delay learning-flow implementation waiting for final sprites.

---

## 41. Learning Object Clarity

Berries, mushrooms, plants, carrots, baskets, and similar learning objects must be easy to count.

During a learning interaction:

- reduce decorative noise around learning objects;
- clearly separate groups;
- avoid overlapping countable objects;
- maintain sufficient size and spacing.

Learning clarity outranks environmental richness.

---

## 42. Equation Typography

Equations must be large and readable.

The multiplication symbol must be the proper:

`×`

not lowercase `x`.

Maintain clear spacing around operators.

Do not use a decorative display font that makes numbers/operators difficult to distinguish.

---

## 43. Dialogue

Use the established dialogue component/pattern.

Dialogue should:

- show who is speaking;
- remain short;
- support Vietnamese text comfortably;
- use a large obvious continue action;
- avoid covering essential learning objects where possible.

---

## 44. Animation Scope

High-value Phase 02 motion:

- Fox entrance/reaction;
- Fox tail glow;
- object placement feedback;
- repeated-addition reveal;
- `×` reveal;
- Hero/Fox celebration;
- Forest path unlock/highlight.

Simple CSS/SVG animation is acceptable.

Do not add a large animation framework unless the project already requires one for a concrete reason.

---

## 45. Reduced Motion

Where practical, respect reduced-motion preferences.

Critical learning meaning must not depend only on animation.

If the `×` reveal animates, the final static relationship must remain visible and understandable.

---

# Tutorial Completion

## 46. No School-Style Completion Screen

Do not end with:

- `Lesson Complete`;
- score;
- accuracy percentage;
- stars based on mistakes;
- rank.

The tutorial should transition back into the adventure fantasy.

---

## 47. Forest Invitation

After guided practice, Fox creates the next story motivation.

Example direction:

> “Giỏi quá! Nhưng chúng ta sắp hết đồ rồi…”

Then the Forest path becomes visually active.

Fox may continue:

> “Trong rừng có nhiều thứ chúng ta cần. Đi cùng mình nhé!”

Use natural Vietnamese copy; exact wording may be refined.

---

## 48. Completion State

When the tutorial is complete:

- mark multiplication intro complete;
- persist progress;
- make the First Adventure/Forest entry available as a progression hook;
- do not implement Forest Adventure gameplay.

If the current world-state model needs a minimal unlock identifier, add the smallest domain-consistent value required.

Avoid building a generic unlock framework unless genuinely needed.

---

## 49. End-of-Phase Player Experience

The final visible state should communicate:

`I learned something useful → the world is opening → adventure continues`

not:

`I finished lesson 1 → return to course menu`.

---

# Routing & Entry

## 50. Tutorial Entry

A new player should enter the multiplication tutorial naturally from the current application flow.

Do not require `/debug` or a developer action to start it.

The exact route may follow the existing app architecture.

Avoid creating many future routes during this phase.

---

## 51. Returning Player

On reload/re-entry:

- resume an incomplete tutorial from a sensible persisted step;
- do not replay completed introductory steps unnecessarily;
- completed players should not be forced through the tutorial again.

A developer-only reset/restart tutorial action may be added to `/debug` if useful for testing.

---

# Components

## 52. Recommended Component Boundaries

Create components only where they provide clear reuse or readability.

Potential components:

```text
TutorialScene
FoxGuide
DialogueBox
EqualGroupsActivity
RepeatedAdditionView
MultiplicationReveal
LearningObjectGroup
AnswerOption
HintPanel
TutorialProgress/step controller
```

Names may differ.

Do not build a generic educational component framework.

---

## 53. Reuse Existing UI Foundation

Reuse or evolve Phase 01 UI primitives where appropriate.

If introducing components such as:

- `GameButton`;
- `GamePanel`;
- `DialogueBox`;
- `AnswerOption`;

keep them small and aligned with `VISUAL_DESIGN.md`.

Do not introduce a large third-party UI framework for this phase.

---

# Accessibility & Input

## 54. Input

Core tutorial interactions must work with mouse/click.

Prefer designs that can also work with touch.

If drag-and-drop is used, provide a practical click/tap alternative or ensure the interaction remains accessible and robust.

Do not require keyboard-heavy controls.

---

## 55. Interaction Targets

Use large targets with generous spacing.

Do not make children click tiny berries or tiny mathematical symbols.

Core interaction must not depend on hover.

---

## 56. Semantic UI

Use real buttons for button actions where practical.

Keep player-facing text as HTML/UI text rather than baking Vietnamese copy into images.

Use accessible labels where visual controls would otherwise be ambiguous.

---

# Tests

## 57. Domain Tests

Add tests for tutorial progression transitions.

At minimum cover:

- initial tutorial step;
- valid forward transition;
- tutorial completion;
- completed state does not regress accidentally.

If transition rules are simple, keep tests equally simple.

---

## 58. Save Migration Tests

If save version changes, test:

- Phase 01 valid save migrates successfully;
- existing inventory is preserved;
- existing mastery is preserved;
- tutorial state receives valid defaults;
- migrated save validates under the new schema.

---

## 59. Learning Integration Tests

Add tests covering meaningful learning behavior, for example:

- recognized correct answer records the expected fact/skill attempt;
- wrong answer updates mastery through the existing path;
- hint usage is represented correctly where applicable;
- tutorial UI does not manually construct a competing fact key.

Focus on domain/application behavior rather than pixel-level UI tests.

---

## 60. Persistence Tests

Verify:

- tutorial step persists;
- tutorial completion persists;
- reload restores progress;
- reset returns to the canonical initial tutorial state;
- ordered persistence behavior from Phase 01 remains intact.

---

## 61. Component Tests

Add only useful component tests.

Good candidates include:

- a learning activity exposes the correct semantic answer choices/state;
- wrong answer shows retry/hint state;
- multiplication reveal reaches the final static representation.

Do not test every decorative element.

---

# Debugging

## 62. Debug Support

Extend `/debug` only if it materially helps Phase 02 verification.

Useful actions may include:

- reset tutorial;
- jump to a tutorial step;
- mark tutorial completed;
- inspect tutorial state.

Developer actions must use normal state/domain APIs where practical.

Do not expose debug controls in player-facing UI.

---

# Manual Verification

## 63. New Player Flow

Manually verify:

1. Start from a fresh save.
2. Enter Mathoria.
3. Meet Fox.
4. Complete the Equal Groups interaction.
5. Confirm repeated addition is visually connected to groups.
6. Reach the multiplication-symbol reveal.
7. Confirm `3 × 2 = 6` is connected to the existing visual groups.
8. Complete RECOGNIZE practice.
9. Complete CONSTRUCT practice.
10. Complete APPLY practice.
11. Trigger at least one wrong answer.
12. Confirm Fox gives support without punishment.
13. Retry successfully.
14. Reach Forest invitation.
15. Confirm tutorial completion persists after reload.

---

## 64. Resume Flow

Manually verify:

1. Start tutorial.
2. Progress to at least Repeated Addition or Reveal Multiplication.
3. Reload the browser.
4. Confirm the tutorial resumes sensibly rather than restarting from Arrival.
5. Complete tutorial.
6. Reload again.
7. Confirm completed tutorial is not forced to restart.

---

## 65. Existing Save Flow

If migration is introduced:

1. Load a valid Phase 01 save.
2. Confirm it migrates without crash.
3. Confirm inventory remains intact.
4. Confirm mastery remains intact.
5. Confirm tutorial starts from the expected default state.

---

# Acceptance Criteria

## 66. Experience

- [ ] A new player can start the multiplication tutorial naturally.
- [ ] Tutorial is approximately a short ~10-minute beginner experience, not a long course.
- [ ] The child encounters equal groups before multiplication notation.
- [ ] Repeated addition is visually connected to equal groups.
- [ ] `×` is introduced only after the child has seen its meaning.
- [ ] Tutorial uses multiple learning representations/interactions.
- [ ] Tutorial ends with a Forest/adventure invitation rather than a score screen.

## 67. Learning

- [ ] V1 tutorial content is multiplication-only.
- [ ] Facts remain small and beginner-friendly.
- [ ] `RECOGNIZE` is exercised.
- [ ] `CONSTRUCT` is exercised.
- [ ] `APPLY` is exercised.
- [ ] Symbolic `CALCULATE` is secondary, not the entire tutorial.
- [ ] No required `MISSING_FACTOR` activity is introduced.
- [ ] No timed `FLUENCY` challenge is introduced.
- [ ] Meaningful attempts use the Phase 01 mastery path.

## 68. Wrong Answers & Hints

- [ ] Wrong answers do not remove lives.
- [ ] Wrong answers do not remove Materials or Coins.
- [ ] Wrong answers do not reset the tutorial.
- [ ] Fox provides supportive feedback.
- [ ] At least one more-concrete representation can be shown as a hint.
- [ ] Player can retry.

## 69. Architecture

- [ ] Tutorial progression has an explicit model.
- [ ] Persistent tutorial state is not scattered across React components.
- [ ] Temporary animation/interaction state is not unnecessarily persisted.
- [ ] Existing `MathOperation`, `LearningSkill`, `MathProblem`, fact-key, and mastery concepts are reused.
- [ ] No competing tutorial-only learning taxonomy is introduced.
- [ ] Learning correctness/mastery logic is not duplicated across UI components.
- [ ] Authored tutorial content is separated from large React rendering components.

## 70. Persistence

- [ ] Tutorial progress survives reload.
- [ ] Tutorial completion survives reload.
- [ ] Completed tutorial is not forced to restart.
- [ ] Existing Phase 01 saves remain loadable if schema changes.
- [ ] Save migration is tested if version changes.
- [ ] Phase 01 ordered persistence behavior remains working.

## 71. Visual Design

- [ ] Player-facing tutorial follows `VISUAL_DESIGN.md`.
- [ ] Visual anchor is used as style reference, not flattened screen implementation.
- [ ] Hero and Fox fit the canonical visual direction.
- [ ] Fox hint presentation uses the glowing-tail visual motif where practical.
- [ ] Learning objects are large and easy to count.
- [ ] Vietnamese text is readable and not clipped.
- [ ] Equation typography uses `×`, not `x`.
- [ ] UI feels game-like rather than dashboard-like.
- [ ] No harsh failure visuals are used.

## 72. Localization

- [ ] Player-facing copy is Vietnamese.
- [ ] Player-facing copy uses localization keys/templates.
- [ ] Learning/domain code does not contain final Vietnamese presentation sentences.
- [ ] No language selector is introduced.
- [ ] No English player locale is required.

## 73. Scope

- [ ] Forest Adventure gameplay is not implemented.
- [ ] Gathering gameplay is not implemented.
- [ ] Battle gameplay is not implemented.
- [ ] Farming gameplay is not implemented.
- [ ] Farm construction is not implemented.
- [ ] Division gameplay is not implemented.
- [ ] Timer/countdown is not implemented.
- [ ] Full multiplication curriculum is not implemented.
- [ ] Backend/auth/database/cloud save are not introduced.

## 74. Quality

- [ ] `npm run test` succeeds.
- [ ] `npm run build` succeeds.
- [ ] Existing Phase 01 tests remain passing.
- [ ] New tests cover tutorial progression and persistence/migration where relevant.
- [ ] No intentionally failing placeholder tests remain.

---

# Definition of Done

## 75. Phase 02 Definition of Done

Phase 02 is complete when a new child can enter Mathoria and experience a coherent beginner learning journey:

```text
Meet Fox
   ↓
Build equal groups
   ↓
See repeated addition
   ↓
Discover ×
   ↓
Use the idea in different forms
   ↓
Receive gentle help when needed
   ↓
Unlock the motivation to enter the Forest
```

The child should leave the tutorial with the conceptual understanding:

> “Phép nhân là nhiều nhóm có cùng số lượng.”

The implementation must prove that the Phase 01 architecture can support real player-facing learning without coupling gameplay to hard-coded UI logic.

---

# Expected Codex Completion Report

## 76. Completion Report

When implementation is complete, report:

1. Summary of changes
2. Tutorial flow implemented
3. Files/modules created or changed
4. Persistent state/schema changes
5. Save migration details, if any
6. Learning/mastery integration
7. Visual/UI implementation decisions
8. Dependencies added and why
9. Tests added
10. `npm run test` result
11. `npm run build` result
12. Manual verification performed
13. Known limitations/placeholders
14. Any deviations from this phase specification

Do not claim completion if required tests/build are failing.

Do not silently implement later phases.

---

# Next Phase

After Phase 02 is reviewed and accepted, the next phase should implement the **First Adventure / Forest experience** using the multiplication understanding established here.

The exact phase filename and scope should be finalized after reviewing the Phase 02 implementation rather than pre-building Forest systems now.
