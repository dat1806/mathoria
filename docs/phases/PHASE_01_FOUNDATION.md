# Mathoria — Phase 01: Foundation

## 1. Purpose

Phase 01 establishes the technical foundation for Mathoria V1.

This phase does **not** implement the playable game journey.

The objective is to create a small, stable architecture that later phases can build on without coupling gameplay to:

- multiplication;
- Vietnamese presentation strings;
- localStorage implementation details;
- React components.

At the end of this phase, the application should run successfully and expose enough development tooling to verify the core domain, state, localization, and persistence foundations.

---

# 2. Read Before Implementation

Before changing code, read:

1. `AGENTS.md`
2. `docs/GAME_DESIGN.md`
3. `docs/LEARNING_SYSTEM.md`
4. `docs/DESIGN_SYSTEM.md`
5. `docs/MVP_SPEC.md`
6. `docs/TECHNICAL_ARCHITECTURE.md`
7. `docs/SPEC_CONSISTENCY.md`
8. this document

If this phase conflicts with the canonical specifications, do not silently invent a solution.

Follow the specification hierarchy defined in `SPEC_CONSISTENCY.md`.

---

# 3. Phase Goal

Build the minimum foundation required for later Mathoria gameplay.

Phase 01 should establish:

```text
React application
      ↓
Application shell
      ↓
Core domain types
      ↓
Learning foundation
      ↓
Game state
      ↓
Persistence
      ↓
Vietnamese localization
      ↓
Static content foundation
      ↓
Developer debug tools
```

No complete gameplay loop is required yet.

---

# 4. Technical Stack

Use:

```text
React
TypeScript
Vite
Zustand
localStorage
```

Testing:

```text
Vitest
```

A lightweight React testing library may be added only if needed for a meaningful component test.

Do not add a large testing/tooling stack during this phase.

---

# 5. V1 Constraints

The implementation must preserve these frozen decisions.

## Platform

```text
Web
```

## Language

```text
Vietnamese only
```

Architecture remains localization-ready.

## Math operation

```text
MULTIPLICATION
```

Architecture remains operation-agnostic.

## Persistence

```text
localStorage
```

## Backend

```text
None
```

## Authentication

```text
None
```

---

# 6. Explicit Phase 01 Non-Goals

Do NOT implement:

```text
Multiplication Tutorial

Camp gameplay
World Map

Forest Adventure
Deep Forest

Gathering gameplay
NPC Quest gameplay
Battle gameplay
Farming gameplay

Forest Slime
Big Slime

Farm construction gameplay

full adaptive learning behavior
full hint progression

timed challenges
division content

backend
database
authentication
accounts
cloud save

final art
final animations
audio system
shop
pets
equipment
leaderboard
parent dashboard
```

Domain types/configuration needed by later phases are allowed.

Playable implementations are not.

---

# 7. Expected Source Structure

Use the architecture as guidance rather than creating empty folders mechanically.

A reasonable Phase 01 result is:

```text
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx
│
├── game/
│   └── domain/
│
├── learning/
│   ├── domain/
│   └── mastery/
│
├── content/
│   └── math/
│       └── multiplication/
│
├── features/
│   └── debug/
│
├── components/
│   └── ui/
│
├── state/
│   └── gameStore.ts
│
├── persistence/
│   ├── GameRepository.ts
│   └── LocalStorageGameRepository.ts
│
├── i18n/
│   ├── index.ts
│   └── locales/
│       └── vi/
│
├── shared/
│
└── main.tsx
```

Do not create directories for future systems if they contain no useful implementation.

The exact file split may differ when there is a clear reason, but architectural boundaries must remain intact.

---

# 8. Application Shell

Create a minimal Mathoria application shell.

It should prove that:

```text
React
routing
localization
global state
persistence
```

are wired correctly.

The shell is not the final Camp UI.

A simple development landing screen is enough.

Example player-facing content:

```text
Mathoria

Một cuộc phiêu lưu toán học đang chờ bạn!
```

Keep it visually compatible with the Cozy Fantasy direction, but do not spend significant time polishing it.

---

# 9. Routing

Introduce only the routes required by Phase 01.

Recommended:

```text
/
```

and:

```text
/debug
```

Do not pre-create routes such as:

```text
/battle
/farm
/forest
/world-map
/adventure
```

before those features exist.

---

# 10. Math Operation Domain

Create a shared math-operation concept.

Example:

```ts
export type MathOperation = "MULTIPLICATION" | "DIVISION";
```

Important:

`DIVISION` may exist as a domain value to establish the extension boundary.

Do NOT:

- create division questions;
- create division content;
- expose division in the UI;
- create division progression.

V1 enabled content remains multiplication-only.

---

# 11. Learning Skills

Use the canonical taxonomy:

```ts
export type LearningSkill =
  | "RECOGNIZE"
  | "CALCULATE"
  | "APPLY"
  | "CONSTRUCT"
  | "MISSING_FACTOR"
  | "FLUENCY";
```

Do not introduce a second taxonomy such as:

```text
recognizeGroups
chooseExpression
applyWordProblem
```

Those may describe interaction variants but must not become competing mastery dimensions.

---

# 12. Problem Types

Create the canonical problem types:

```ts
export type ProblemType =
  | "CALCULATE"
  | "RECOGNIZE"
  | "APPLY"
  | "CONSTRUCT"
  | "MISSING_FACTOR";
```

Timed fluency is not a V1 problem type.

`FLUENCY` belongs to learning/mastery concepts.

---

# 13. Problem Representations

Create:

```ts
export type ProblemRepresentation =
  | "SYMBOLIC"
  | "EQUAL_GROUPS"
  | "ARRAY"
  | "WORD_PROBLEM";
```

Problem type and representation must remain separate concepts.

For example:

```text
type = RECOGNIZE
representation = ARRAY
```

is valid.

---

# 14. Math Fact

Create a generic mathematical fact model.

Example:

```ts
export interface MathFact {
  operation: MathOperation;
  operands: number[];
  result: number;
}
```

Do not create:

```ts
interface MultiplicationFact
```

as the core domain abstraction.

Multiplication-specific content may instantiate `MathFact`.

---

# 15. Fact Key

Create one centralized utility for generating fact identifiers.

Conceptual format:

```text
MULTIPLICATION:3:4
```

Example:

```ts
createFactKey({
  operation: "MULTIPLICATION",
  operands: [3, 4],
});
```

should return:

```text
MULTIPLICATION:3:4
```

Do not manually construct fact keys throughout the application.

Add unit tests.

---

# 16. Math Problem

Create the semantic `MathProblem` domain.

Recommended shape:

```ts
export interface MathProblem {
  id: string;

  operation: MathOperation;

  type: ProblemType;

  representation: ProblemRepresentation;

  operands: number[];

  answer: number;

  choices?: number[];

  difficulty: number;

  skillIds: LearningSkill[];

  context?: ProblemContext;
}
```

A small adjustment to naming is acceptable if it improves type consistency.

Do not store final Vietnamese question sentences directly in the core domain.

---

# 17. Problem Context

Keep context intentionally small.

Example:

```ts
export type ProblemTheme = "FOREST" | "FARM" | "BATTLE" | "GENERIC";
```

```ts
export interface ProblemContext {
  theme?: ProblemTheme;
  actor?: string;
  object?: string;
}
```

Do not design a generic narrative engine during Phase 01.

---

# 18. Mastery Domain

Create the minimum mastery structures needed by future phases.

Example:

```ts
export interface SkillMastery {
  attempts: number;
  correct: number;

  consecutiveCorrect: number;
  consecutiveWrong: number;

  masteryScore: number;

  lastAttemptAt: string | null;
}
```

```ts
export interface FactMastery {
  factKey: string;

  operation: MathOperation;

  operands: number[];

  skills: Partial<Record<LearningSkill, SkillMastery>>;
}
```

Do not implement sophisticated mastery algorithms in Phase 01.

---

# 19. Learning Attempt

Create a minimal learning-attempt model.

Example:

```ts
export interface LearningAttempt {
  problemId: string;

  factKey: string;

  operation: MathOperation;

  skill: LearningSkill;

  correct: boolean;

  hintUsed: boolean;

  attemptedAt: string;
}
```

Do not create an unlimited persistent attempt-history system.

Phase 01 only needs the domain boundary required for future mastery updates.

---

# 20. Learning State

Create a minimal persistent learning state.

Recommended direction:

```ts
export interface LearningState {
  masteryByFact: Record<string, FactMastery>;
}
```

Add fields only when currently required.

Do not add speculative:

```text
AI recommendations
parent analytics
school reports
leaderboards
daily streaks
```

---

# 21. Minimal Mastery Update

Implement one small deterministic mastery update function so the learning domain is not merely a collection of interfaces.

Example responsibility:

```text
current SkillMastery
+
LearningAttempt
      ↓
updated SkillMastery
```

It should update at least:

```text
attempts
correct
consecutiveCorrect
consecutiveWrong
lastAttemptAt
```

A simple `masteryScore` rule may be used.

Keep it easy to replace/tune later.

Do not implement the complete adaptive selection system yet.

---

# 22. Mastery Tests

Add unit tests covering at minimum:

```text
first correct attempt

first wrong attempt

consecutive correct answers

wrong answer resets consecutiveCorrect

correct answer resets consecutiveWrong
```

Tests should validate domain behavior without React.

---

# 23. Game Domain

Create only the game-domain types required to represent persistent V1 foundation state.

These may include:

```ts
export type WorldStage =
  | "CAMP"
  | "SETTLEMENT"
  | "VILLAGE"
  | "CASTLE"
  | "KINGDOM";
```

Later stages are known domain values but are not implemented as playable V1 content.

---

# 24. Inventory State

Use the intentionally simple V1 model:

```ts
export interface InventoryState {
  materials: number;
  coins: number;
}
```

Do not build:

```text
item instances
equipment
stack system
rarity
crafting inventory
```

---

# 25. World State

Create a minimal state representation.

Example:

```ts
export interface WorldState {
  stage: WorldStage;

  unlockedLocations: string[];

  builtBuildings: string[];
}
```

Avoid duplicating adventure completion in both `WorldState` and `AdventureProgressState`.

There must be one canonical source for each persistent fact.

---

# 26. Adventure Progress State

Create the persistence structure, not the adventure engine.

Example:

```ts
export interface AdventureProgressState {
  currentAdventureId: string | null;

  currentNodeId: string | null;

  completedAdventureIds: string[];
}
```

Do not implement Forest Adventure nodes in this phase.

---

# 27. Player State

Keep V1 player state minimal.

Example:

```ts
export interface PlayerState {
  name?: string;
}
```

Do not build:

```text
account profile
avatar inventory
equipment
experience levels
character stats
```

---

# 28. Settings

Create:

```ts
export interface GameSettings {
  locale: "vi";
}
```

There is no language selector in V1.

Do not add English content.

---

# 29. Root Game State

Create one canonical root persistent state.

Example:

```ts
export interface GameState {
  version: number;

  player: PlayerState;

  world: WorldState;

  learning: LearningState;

  inventory: InventoryState;

  adventures: AdventureProgressState;

  settings: GameSettings;
}
```

Initial:

```text
version = 1
```

Create one function for producing valid initial state.

Example:

```ts
createInitialGameState();
```

Do not duplicate default-state objects across tests/components/store code.

---

# 30. Initial Game State

The initial state should represent a new V1 player.

Conceptually:

```text
stage = CAMP

materials = 0
coins = 0

no built buildings
no completed adventures

empty learning mastery

locale = vi
```

Do not unlock future world content simply because its domain types exist.

---

# 31. Zustand Store

Create a global game store based on the canonical `GameState`.

Do not expose arbitrary nested mutation as the normal application API.

Prefer domain actions.

Phase 01 may include:

```text
resetGame()

recordLearningAttempt()

grantReward()
```

Only implement actions that have useful foundation behavior.

Do not add future gameplay actions merely to fill the store.

---

# 32. Reward Foundation

A minimal reward model may be introduced because it is useful for testing state updates.

Example:

```ts
export type ResourceType = "MATERIAL" | "COIN";
```

```ts
export interface Reward {
  type: ResourceType;
  amount: number;
}
```

`grantReward()` should update inventory through domain/store logic.

Add a small test.

Do not implement reward animations or treasure UI.

---

# 33. Persistence Boundary

Create:

```ts
export interface GameRepository {
  load(): Promise<GameState | null>;

  save(state: GameState): Promise<void>;

  clear(): Promise<void>;
}
```

Phase 01 implementation:

```text
LocalStorageGameRepository
```

Do not implement:

```text
ApiGameRepository
```

---

# 34. localStorage Key

Use:

```text
mathoria:save
```

The schema version belongs inside the persisted payload.

Do not create:

```text
mathoria:save:v1
```

as the only source of schema-version information.

---

# 35. Save Serialization

Persist only JSON-safe state.

Do not store:

```text
functions
React elements
class instances
DOM references
animation state
```

in `GameState`.

---

# 36. Save Validation

Do not blindly cast parsed localStorage JSON to `GameState`.

Implement minimum runtime validation.

At minimum validate:

```text
payload is an object
version is supported
required root sections exist
critical primitive/container shapes are valid
```

A lightweight schema library may be used only if it provides clear value and does not unnecessarily increase complexity.

A small explicit validator is also acceptable.

---

# 37. Corrupted Save Recovery

If localStorage contains:

```text
invalid JSON
unsupported version
invalid root structure
```

the application must not crash permanently.

Expected behavior:

```text
load
 ↓
invalid save
 ↓
fall back to initial state
```

The invalid value may be cleared or ignored according to the repository implementation.

Add tests.

---

# 38. Save Version Boundary

Implement a clear migration boundary.

Example:

```ts
migrateSave(rawSave);
```

For Phase 01:

```text
version 1 → version 1
```

No real migration is required yet.

The important requirement is that future migrations have one obvious place to live.

Do not create a generalized migration framework.

---

# 39. Autosave

Meaningful persistent changes should result in a save.

Phase 01 should prove autosave for at least:

```text
learning attempt update
reward update
```

Avoid writing to localStorage for temporary UI state.

Implementation may use Zustand subscription/middleware or a small persistence coordinator.

Choose the simplest solution that keeps persistence out of React components.

---

# 40. Persistence Tests

Add tests covering at minimum:

```text
save → load round trip

missing save

invalid JSON

unsupported version

invalid structure

clear save
```

Where browser localStorage is unavailable in the test environment, use a small storage abstraction/test double rather than coupling tests to a full browser.

---

# 41. Localization Foundation

Create a small localization layer.

V1 locale:

```text
vi
```

Do not implement a language selector.

Do not create English translations.

Recommended structure:

```text
src/i18n/
├── index.ts
└── locales/
    └── vi/
        ├── common.json
        └── game.json
```

Add more locale files only when content requires them.

---

# 42. Initial Vietnamese Strings

Add only strings required by the Phase 01 shell/debug navigation.

For example:

```text
common.continue
common.back

game.title
game.welcome
```

Example values:

```text
Tiếp tục
Quay lại

Mathoria
Một cuộc phiêu lưu toán học đang chờ bạn!
```

Do not fill locale files with speculative future dialogue.

---

# 43. Localization Usage

Player-facing components should not hard-code Vietnamese strings where localization keys are appropriate.

Prefer:

```tsx
t("game.welcome");
```

rather than:

```tsx
"Một cuộc phiêu lưu toán học đang chờ bạn!";
```

Debug/developer-only text may remain English.

Domain code must not depend on localization.

---

# 44. Static Content Foundation

Create only enough content structure to prove separation between:

```text
static content
```

and:

```text
runtime state
```

For Phase 01, a tiny multiplication content sample is sufficient.

Example facts:

```text
2 × 2
2 × 3
3 × 2
```

Represent them as generic `MathFact` data.

Do not create the full multiplication curriculum yet.

---

# 45. Content Rule

Game systems must not import a file such as:

```text
multiplicationQuestions.ts
```

and directly render fixed questions.

Later phases should access learning content through Learning Engine boundaries.

Phase 01 does not need the full Problem Generator yet.

---

# 46. Debug Route

Create:

```text
/debug
```

This is development tooling, not player-facing product UI.

The page should display useful state such as:

```text
save version
locale
world stage
materials
coins
built buildings
completed adventures
learning mastery
```

Readable JSON for part of `GameState` is acceptable in Phase 01.

---

# 47. Debug Actions

Provide simple development actions:

```text
Grant 5 Materials

Grant 5 Coins

Record Sample Correct Attempt

Record Sample Wrong Attempt

Reset Game
```

These actions must call the same domain/store APIs that later gameplay will use.

Do not mutate state directly from the debug component.

---

# 48. Debug Persistence Verification

The debug page should make it easy to manually verify:

```text
grant resource
 ↓
reload browser
 ↓
resource remains
```

and:

```text
record attempt
 ↓
mastery changes
 ↓
reload browser
 ↓
mastery remains
```

This is one of the most important manual Phase 01 checks.

---

# 49. Debug Environment

The `/debug` route may exist during development.

If production environment handling is already straightforward, hide or disable it in production.

Do not introduce complicated environment infrastructure solely for this requirement.

At minimum, the debug page must be clearly identified as developer tooling.

---

# 50. UI Scope

Use minimal UI.

The Phase 01 UI only needs:

```text
application shell
basic navigation
debug page
basic buttons/cards
```

Do not spend this phase implementing:

```text
final Camp
animated map
character sprites
battle HUD
Farm
final responsive polish
```

---

# 51. Styling

Use the existing project styling approach if one already exists.

If no styling solution exists, prefer simple CSS/CSS Modules or another lightweight existing approach.

Do not introduce a large UI framework solely for Phase 01.

The shell should loosely reflect:

```text
Cozy Fantasy 2D
```

through:

```text
rounded shapes
comfortable spacing
large controls
friendly presentation
```

but final art is not required.

---

# 52. Dependency Discipline

Do not add a package unless it solves a current Phase 01 requirement.

Avoid installing libraries for:

```text
battle
animation
audio
backend
database
authentication
AI
complex state machines
```

before those requirements exist.

---

# 53. Architecture Dependency Rules

Maintain:

```text
React UI
   ↓
Store / application actions
   ↓
Game / Learning domain
```

Persistence:

```text
GameState
   ↓
GameRepository
   ↓
LocalStorageGameRepository
```

Localization:

```text
UI
 ↓
i18n
```

Forbidden examples:

```text
Learning domain → React

Learning domain → Vietnamese strings

Game domain → localStorage

React component → arbitrary localStorage writes

Debug component → direct nested Zustand mutation
```

---

# 54. Required Tests

Phase 01 should include meaningful unit tests for at least:

### Learning

```text
fact key generation
mastery update
```

### Game

```text
reward/inventory update
```

### Persistence

```text
save/load
corrupted save recovery
unsupported version
clear
```

Do not target arbitrary coverage percentages.

Test important domain boundaries.

---

# 55. Code Quality

Use TypeScript strictly enough to catch meaningful domain mistakes.

Avoid:

```ts
any;
```

unless there is a strong reason.

Prefer:

```text
small functions
explicit domain types
pure domain logic
clear module boundaries
```

Avoid giant files that combine:

```text
React
game rules
learning rules
localStorage
localization
```

---

# 56. No Premature Abstraction

Do not implement:

```text
dependency injection framework
event bus
ECS
plugin system
microservices
event sourcing
generic rules engine
generic workflow engine
```

Phase 01 should remain understandable by reading a small number of TypeScript modules.

---

# 57. Required Scripts

Ensure the project has working commands equivalent to:

```bash
npm run dev
npm run build
npm run test
```

If linting is already configured:

```bash
npm run lint
```

must also pass.

Do not replace working project tooling without a reason.

---

# 58. Build Requirement

At completion:

```bash
npm run build
```

must succeed.

TypeScript compilation errors are not acceptable.

---

# 59. Test Requirement

At completion:

```bash
npm run test
```

must succeed.

Do not leave intentionally failing placeholder tests.

---

# 60. Manual Verification

Before marking Phase 01 complete, manually verify:

1. Start the app.
2. Open `/`.
3. Confirm Vietnamese player-facing shell renders.
4. Open `/debug`.
5. Grant Materials.
6. Grant Coins.
7. Record a correct sample learning attempt.
8. Confirm mastery changes.
9. Reload the page.
10. Confirm state remains.
11. Reset the game.
12. Confirm initial state returns.
13. Reload again.
14. Confirm reset state remains.

---

# 61. Acceptance Criteria

Phase 01 is complete only when all of the following are true.

## Application

- [ ] React + TypeScript + Vite application runs.
- [ ] Production build succeeds.
- [ ] `/` renders the minimal Mathoria shell.
- [ ] Player-facing shell uses Vietnamese localization.
- [ ] `/debug` provides development inspection.

## Learning Domain

- [ ] `MathOperation` exists.
- [ ] V1 supports multiplication content.
- [ ] Division has no playable content.
- [ ] Canonical `LearningSkill` exists.
- [ ] Canonical `ProblemType` exists.
- [ ] Canonical `ProblemRepresentation` exists.
- [ ] `MathFact` exists.
- [ ] `MathProblem` exists.
- [ ] Fact key generation is centralized.
- [ ] Minimal mastery state exists.
- [ ] Minimal deterministic mastery update works.
- [ ] Learning domain tests pass.

## Game State

- [ ] Canonical `GameState` exists.
- [ ] Initial state is centralized.
- [ ] Inventory supports Materials and Coins.
- [ ] World starts at Camp.
- [ ] Adventure progress structure exists without implementing adventures.
- [ ] Settings locale is `vi`.

## State Management

- [ ] Zustand owns persistent/global game state.
- [ ] Temporary UI state is not unnecessarily stored globally.
- [ ] State changes use actions rather than arbitrary component mutation.
- [ ] Reward update works.
- [ ] Learning-attempt update works.

## Persistence

- [ ] `GameRepository` exists.
- [ ] `LocalStorageGameRepository` exists.
- [ ] Storage key is `mathoria:save`.
- [ ] Save payload contains `version`.
- [ ] Initial save version is `1`.
- [ ] Save/load works.
- [ ] Autosave works for meaningful state changes.
- [ ] Invalid JSON does not crash the application.
- [ ] Unsupported save version does not crash the application.
- [ ] Invalid save structure does not crash the application.
- [ ] Reset/clear works.
- [ ] Persistence tests pass.

## Localization

- [ ] Vietnamese locale foundation exists.
- [ ] No English locale is implemented.
- [ ] No language selector is implemented.
- [ ] Player-facing shell strings come from localization.
- [ ] Domain logic contains no player-facing Vietnamese copy.

## Debugging

- [ ] `/debug` displays useful current game state.
- [ ] Debug can grant Materials.
- [ ] Debug can grant Coins.
- [ ] Debug can record a sample correct attempt.
- [ ] Debug can record a sample wrong attempt.
- [ ] Debug can reset progress.
- [ ] Debug actions use normal application/domain actions.

## Scope

- [ ] No backend was introduced.
- [ ] No authentication was introduced.
- [ ] No database was introduced.
- [ ] No cloud save was introduced.
- [ ] No division gameplay was introduced.
- [ ] No full Tutorial was implemented.
- [ ] No Camp gameplay was implemented.
- [ ] No Adventure gameplay was implemented.
- [ ] No Battle gameplay was implemented.
- [ ] No Farming gameplay was implemented.
- [ ] No final art dependency blocks implementation.

---

# 62. Definition of Done

Phase 01 is done when the repository provides a stable technical foundation that allows Phase 02 to implement the multiplication introduction without needing to redesign:

```text
math domain
learning mastery
global state
persistence
localization
content separation
```

A successful Phase 01 should be intentionally boring from a player's perspective.

It is infrastructure for the game, not the game itself.

---

# 63. Expected Codex Completion Report

When implementation is complete, report:

```text
1. Summary of changes
2. Files/modules created or changed
3. Dependencies added and why
4. Architecture decisions made
5. Tests added
6. Commands run and results
7. Manual verification performed
8. Known limitations
9. Any deviations from PHASE_01_FOUNDATION.md
```

Do not claim completion if build/tests are failing.

Do not silently expand the phase scope.

---

# 64. Next Phase

After Phase 01 is reviewed and accepted:

```text
PHASE_02_MULTIPLICATION_TUTORIAL.md
```

Phase 02 will implement the first child-facing learning experience using the foundation created here.
