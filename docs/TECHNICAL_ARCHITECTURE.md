# Mathoria — Technical Architecture

## 1. Purpose

This document defines the technical architecture for **Mathoria V1**.

Mathoria is a cozy educational adventure game for children. The first version focuses on helping children understand and practice **multiplication** through gameplay such as exploration, gathering, NPC quests, farming, battles, rewards, and world building.

The architecture must support the current MVP without over-engineering while preserving clear extension points for future content such as **division** and additional languages.

---

# 2. V1 Technical Scope

Mathoria V1 is a frontend-only web application.

### Technology

- React
- TypeScript
- Vite
- Zustand for persistent/global game state
- React local state for temporary UI state
- localStorage for persistence
- Vietnamese as the only player-facing language in V1

### V1 does NOT include

- Backend
- REST API
- GraphQL
- Database
- Authentication
- User accounts
- Cloud save
- Cross-device synchronization
- Multiplayer
- Leaderboards
- Server-side analytics

Do not introduce backend infrastructure unless the product requirements explicitly change.

---

# 3. Core Architecture Principles

## 3.1 Game logic and learning logic are separate

Gameplay must not contain multiplication-specific logic.

For example:

```text
Battle
NPC Quest
Gathering
Farming
```

request learning problems from the Learning Engine.

They must not generate multiplication questions themselves.

The intended dependency direction is:

```text
UI
 ↓
Game Engine
 ↓
Learning Engine
 ↓
Learning Domain
```

Static content can configure both the Game Engine and Learning Engine.

---

## 3.2 V1 content is multiplication-only, architecture is not

V1 enables:

```text
MULTIPLICATION
```

Future versions may enable:

```text
DIVISION
ADDITION
SUBTRACTION
```

Do not create architecture around types such as:

```ts
MultiplicationQuestion;
MultiplicationBattle;
MultiplicationProgress;
```

Prefer generic concepts:

```ts
MathProblem;
MathOperation;
LearningSkill;
SkillMastery;
Battle;
Activity;
LearningProgress;
```

---

## 3.3 Vietnamese-only product, localization-ready architecture

All player-facing content in V1 is Vietnamese.

However, Vietnamese strings must not be spread throughout React components or domain logic.

Use localization keys and localized templates.

V1 does not require:

- language selection UI;
- English translations;
- runtime locale switching.

The architecture should simply allow another locale to be added later without rewriting game logic.

---

## 3.4 Content and runtime state are separate

Static definitions answer questions such as:

```text
How much does the Farm cost?
How much HP does a Slime have?
Which nodes exist in Forest Adventure?
Which activity does a building unlock?
```

Runtime state answers:

```text
Has the Farm been built?
How much HP does the current Slime have?
Has Forest Adventure been completed?
How many materials does the player own?
```

Do not mutate static content definitions.

---

## 3.5 Domain logic must not depend on React

The Learning Engine and core game domain should be testable without rendering UI.

Avoid dependencies such as:

```text
Learning Engine
      ↓
React Component
```

or:

```text
MathProblem
      ↓
BattleScreen
```

React renders domain/game state. Domain logic does not render React.

---

# 4. High-Level Architecture

```text
┌─────────────────────────────────────────────┐
│                    UI                       │
│                                             │
│ Camp / Map / Adventure / Battle / NPC       │
│ Gathering / Farming / Building / Rewards    │
└────────────────────┬────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│                GAME ENGINE                  │
│                                             │
│ Adventure                                   │
│ Activity                                    │
│ Battle                                      │
│ Building                                    │
│ Reward                                      │
│ World Progression                           │
└────────────────────┬────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│              LEARNING ENGINE                │
│                                             │
│ Problem Generator                           │
│ Adaptive Selection                          │
│ Mastery                                     │
│ Attempt Recording                           │
│ Hint Generation                             │
└────────────────────┬────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│               LEARNING DOMAIN               │
│                                             │
│ MathOperation                               │
│ MathProblem                                 │
│ MathFact                                    │
│ LearningSkill                               │
│ SkillMastery                                │
└─────────────────────────────────────────────┘

             Static configuration
                     ▲
                     │
┌─────────────────────────────────────────────┐
│                  CONTENT                    │
│                                             │
│ Math content                                │
│ Adventures                                  │
│ Monsters                                    │
│ NPCs                                        │
│ Buildings                                   │
│ Rewards                                     │
│ Localized templates                         │
└─────────────────────────────────────────────┘

                     │
                     ▼
┌─────────────────────────────────────────────┐
│                PERSISTENCE                  │
│                                             │
│ GameRepository                              │
│ LocalStorageGameRepository                  │
└─────────────────────────────────────────────┘
```

---

# 5. Learning Domain

## 5.1 MathOperation

```ts
export type MathOperation = "MULTIPLICATION" | "DIVISION";
```

`DIVISION` exists as a supported domain concept but is not enabled as playable V1 content.

Do not implement division learning content in V1.

---

# 6. Problem Types

A math fact can be practiced in different ways.

```ts
export type ProblemType =
  | "CALCULATE"
  | "RECOGNIZE"
  | "APPLY"
  | "CONSTRUCT"
  | "MISSING_FACTOR";
```

### CALCULATE

Example:

```text
3 × 4 = ?
```

### RECOGNIZE

Example:

```text
● ● ● ●
● ● ● ●
● ● ● ●

Which expression represents this?
```

### APPLY

Math embedded into a meaningful situation.

Example:

```text
There are 3 rabbits.
Each rabbit needs 2 carrots.

How many carrots are needed?
```

The Vietnamese UI will render this in Vietnamese.

### CONSTRUCT

The player creates or arranges groups.

Example:

```text
Create 3 groups of 4 plants.
```

### MISSING_FACTOR

Example:

```text
? × 4 = 12
```

`FLUENCY` should be modeled primarily as a learning skill/mastery dimension rather than requiring a completely separate problem domain.

Timed fluency gameplay is not part of V1.

---

# 7. Problem Representation

Problem type and visual representation are separate concepts.

```ts
export type ProblemRepresentation =
  | "SYMBOLIC"
  | "EQUAL_GROUPS"
  | "ARRAY"
  | "WORD_PROBLEM";
```

For example:

```text
3 × 4 = ?
```

could be:

```ts
{
  type: "CALCULATE",
  representation: "SYMBOLIC"
}
```

while:

```text
● ● ● ●
● ● ● ●
● ● ● ●
```

could be:

```ts
{
  type: "RECOGNIZE",
  representation: "ARRAY"
}
```

This separation allows the same mathematical fact to appear in multiple forms.

---

# 8. MathProblem

Math problems should contain semantic data, not final UI strings.

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

  skillIds: string[];

  context?: ProblemContext;
}
```

Example:

```ts
const problem: MathProblem = {
  id: "problem-001",

  operation: "MULTIPLICATION",

  type: "APPLY",

  representation: "WORD_PROBLEM",

  operands: [3, 2],

  answer: 6,

  choices: [5, 6, 8],

  difficulty: 1,

  skillIds: ["multiplication.equal-groups", "multiplication.apply"],

  context: {
    theme: "FARM",
    actor: "RABBIT",
    object: "CARROT",
  },
};
```

The Learning Engine should not contain a final string such as:

```text
Có 3 chú thỏ. Mỗi chú cần 2 củ cà rốt...
```

The localized presentation layer generates that wording.

---

# 9. Problem Context

```ts
export interface ProblemContext {
  theme?: ProblemTheme;
  actor?: string;
  object?: string;
}
```

Initial themes may include:

```ts
export type ProblemTheme = "FOREST" | "FARM" | "BATTLE" | "GENERIC";
```

Avoid excessive abstraction here.

Only add context fields when actual gameplay requires them.

---

# 10. Math Facts

A mathematical fact should be represented independently of presentation.

```ts
export interface MathFact {
  operation: MathOperation;
  operands: number[];
  result: number;
}
```

Example:

```ts
const fact: MathFact = {
  operation: "MULTIPLICATION",
  operands: [3, 4],
  result: 12,
};
```

V1 multiplication content should focus on small introductory facts first and expand according to the learning progression defined in `LEARNING_SYSTEM.md`.

---

# 11. Learning Skills

Mathoria should distinguish knowing an answer from understanding and applying it.

```ts
export type LearningSkill =
  | "RECOGNIZE"
  | "CALCULATE"
  | "APPLY"
  | "CONSTRUCT"
  | "MISSING_FACTOR"
  | "FLUENCY";
```

A child may therefore have different mastery levels for the same fact.

Example:

```text
3 × 4

Recognize       90
Calculate       80
Apply           55
Construct       70
Missing Factor  35
Fluency         20
```

This distinction is fundamental to Mathoria's learning philosophy.

---

# 12. Mastery Model

V1 uses a simple rule-based mastery system.

Do not introduce machine learning or AI-based scoring.

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

Fact mastery:

```ts
export interface FactMastery {
  factKey: string;

  operation: MathOperation;

  operands: number[];

  skills: Partial<Record<LearningSkill, SkillMastery>>;
}
```

Example fact key:

```text
MULTIPLICATION:3:4
```

Fact key generation must be centralized.

Do not manually construct fact keys throughout the codebase.

---

# 13. Attempt Recording

Each submitted answer should produce a learning attempt.

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

V1 does not require storing an unlimited history of attempts.

The Learning Engine may update aggregated mastery and retain only the information required by the MVP.

Avoid allowing localStorage to grow indefinitely.

---

# 14. Adaptive Learning

V1 adaptive learning is deterministic and rule-based.

Example rules:

```text
If CALCULATE mastery is low
→ increase visual support.

If RECOGNIZE is strong but CALCULATE is weak
→ increase CALCULATE problems.

If CALCULATE is strong but APPLY is weak
→ increase contextual/NPC problems.

If the same fact is answered incorrectly repeatedly
→ surface it again after other activities.

If mastery is high
→ reduce repetition frequency.

If a mastered fact has not appeared recently
→ include it as review.
```

A useful initial content mix is:

```text
60% current target
30% review
10% stretch
```

These values are configuration, not permanent domain rules.

---

# 15. Problem Generator

Gameplay requests problems through the Learning Engine.

```ts
export interface ProblemRequest {
  operation: MathOperation;

  allowedFacts?: MathFact[];

  preferredSkills?: LearningSkill[];

  allowedRepresentations?: ProblemRepresentation[];

  difficultyRange?: [number, number];

  context?: ProblemContext;
}
```

Conceptual API:

```ts
export interface ProblemGenerator {
  generate(request: ProblemRequest, learningState: LearningState): MathProblem;
}
```

Example:

```ts
problemGenerator.generate(
  {
    operation: "MULTIPLICATION",

    preferredSkills: ["APPLY"],

    difficultyRange: [1, 2],

    context: {
      theme: "FARM",
    },
  },

  learningState,
);
```

The NPC Quest system does not decide that the child should solve `3 × 2`.

It requests an appropriate APPLY problem.

The Learning Engine chooses the fact.

---

# 16. Hint System

Incorrect answers should trigger learning support rather than punishment.

```ts
export type HintType =
  | "VISUAL_GROUPS"
  | "REPEATED_ADDITION"
  | "ARRAY"
  | "GUIDED_STEP";
```

```ts
export interface Hint {
  type: HintType;

  problemId: string;

  data: unknown;
}
```

Example progression for:

```text
3 × 4 = ?
```

First support:

```text
● ● ● ●
● ● ● ●
● ● ● ●
```

Further support:

```text
4 + 4 + 4
```

Then:

```text
4 → 8 → 12
```

The Fox Guide is the character used by the UI to communicate learning support.

The Fox itself does not contain learning logic.

Conceptually:

```text
Learning Engine
      ↓
Hint
      ↓
Guide Presentation
      ↓
UI
```

---

# 17. Game Activities

V1 supports:

```ts
export type ActivityType = "GATHERING" | "NPC_QUEST" | "BATTLE" | "FARMING";
```

Activities request problems rather than containing fixed multiplication questions.

```ts
export interface ActivityLearningConfig {
  problemCount: number;

  preferredSkills: LearningSkill[];

  allowedRepresentations?: ProblemRepresentation[];

  difficultyRange?: [number, number];
}
```

```ts
export interface ActivityDefinition {
  id: string;

  type: ActivityType;

  learningConfig: ActivityLearningConfig;

  rewards: Reward[];
}
```

Example:

```ts
const slimeActivity: ActivityDefinition = {
  id: "forest-slime-01",

  type: "BATTLE",

  learningConfig: {
    problemCount: 3,

    preferredSkills: ["CALCULATE", "RECOGNIZE"],

    difficultyRange: [1, 2],
  },

  rewards: [
    {
      type: "MATERIAL",
      amount: 5,
    },
  ],
};
```

---

# 18. Adventure System

Adventures are data-driven.

Do not hard-code an entire adventure sequence inside a React page.

```ts
export interface AdventureDefinition {
  id: string;

  titleKey: string;

  locationId: string;

  nodes: AdventureNodeDefinition[];

  unlockCondition?: UnlockCondition;

  completionRewards?: Reward[];
}
```

Adventure nodes:

```ts
export type AdventureNodeType = "STORY" | "ACTIVITY" | "REWARD";
```

```ts
export interface AdventureNodeDefinition {
  id: string;

  type: AdventureNodeType;

  activityId?: string;

  contentKey?: string;

  nextNodeId?: string;
}
```

Example Forest Adventure:

```text
START
  ↓
Story
  ↓
Gathering
  ↓
Farmer Quest
  ↓
Slime Battle
  ↓
Treasure
  ↓
END
```

Future environments such as Ocean, Mountain, Desert, or Volcano should primarily require new content definitions rather than a new adventure engine.

---

# 19. Battle Architecture

Battle is an activity implementation.

It must remain independent of math operations.

```ts
export interface BattleDefinition {
  enemyId: string;

  maxHp: number;

  damagePerCorrectAnswer: number;

  learningConfig: ActivityLearningConfig;
}
```

Conceptual flow:

```text
Battle starts
     ↓
Request MathProblem
     ↓
Render problem
     ↓
Player answers
     ↓
Record attempt
     ↓
        correct?
       /        \
     yes         no
      ↓           ↓
   attack        hint
      ↓           ↓
 enemy HP       retry
      ↓
 next problem
```

The same battle system must eventually be capable of receiving:

```text
3 × 4 = ?
```

or:

```text
12 ÷ 3 = ?
```

without changing battle mechanics.

Division itself is not implemented in V1.

---

# 20. Rewards

V1 resources:

```ts
export type ResourceType = "MATERIAL" | "COIN";
```

```ts
export interface Reward {
  type: ResourceType;
  amount: number;
}
```

Learning mastery is not currency.

Do not represent mastery as coins, materials, or spendable points.

---

# 21. Inventory

```ts
export interface InventoryState {
  materials: number;
  coins: number;
}
```

Avoid generic inventory complexity until Mathoria actually needs collectible item instances.

V1 does not require a full RPG inventory system.

---

# 22. World Progression

```ts
export type WorldStage =
  | "CAMP"
  | "SETTLEMENT"
  | "VILLAGE"
  | "CASTLE"
  | "KINGDOM";
```

V1 primarily uses:

```text
CAMP
```

The other values exist to preserve the known progression model.

Do not implement later stages in V1.

World state:

```ts
export interface WorldState {
  stage: WorldStage;

  unlockedLocations: string[];

  builtBuildings: string[];

  completedAdventures: string[];
}
```

Only store identifiers for persistent progress.

Static location/building/adventure details belong in content definitions.

---

# 23. Buildings

```ts
export interface ResourceCost {
  resource: ResourceType;
  amount: number;
}
```

```ts
export interface BuildingDefinition {
  id: string;

  nameKey: string;

  cost: ResourceCost[];

  unlockCondition?: UnlockCondition;

  unlocks?: UnlockReward[];
}
```

Example Farm:

```ts
const farm: BuildingDefinition = {
  id: "farm",

  nameKey: "building.farm.name",

  cost: [
    {
      resource: "MATERIAL",
      amount: 15,
    },
    {
      resource: "COIN",
      amount: 10,
    },
  ],

  unlocks: [
    {
      type: "ACTIVITY",
      id: "FARMING",
    },
  ],
};
```

Runtime world state only needs to know:

```text
farm has been built
```

The cost and unlock behavior belong to static content.

---

# 24. Unlock Conditions

Keep V1 unlock conditions simple.

Possible initial model:

```ts
export type UnlockCondition =
  | {
      type: "ADVENTURE_COMPLETED";
      adventureId: string;
    }
  | {
      type: "BUILDING_BUILT";
      buildingId: string;
    }
  | {
      type: "ALWAYS";
    };
```

Do not build a generic rule language for V1.

Add conditions only when real game content requires them.

---

# 25. Root Game State

Persistent root state:

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

Example supporting types:

```ts
export interface PlayerState {
  name?: string;
}
```

```ts
export interface GameSettings {
  locale: "vi";
}
```

```ts
export interface AdventureProgressState {
  currentAdventureId: string | null;

  currentNodeId: string | null;

  completedAdventureIds: string[];
}
```

Avoid duplicating the same progress information across multiple state objects.

Choose one canonical source for each persistent fact.

---

# 26. Persistent State vs UI State

Persistent state belongs in the global game store.

Examples:

```text
materials
coins
learning mastery
built buildings
completed adventures
current adventure progress
world progression
```

Temporary UI state should normally remain local to components/features.

Examples:

```text
selected answer
dialogue currently visible
attack animation running
hint panel open
hover state
temporary modal state
```

Do not put every UI interaction into Zustand.

---

# 27. State Management

Use Zustand for global game state.

Prefer small domain-oriented actions such as:

```text
recordLearningAttempt()
grantReward()
completeAdventure()
buildBuilding()
advanceAdventureNode()
```

Avoid components directly mutating arbitrary nested state.

For example, prefer:

```ts
grantReward(reward);
```

instead of UI code manually modifying:

```ts
state.inventory.materials += 5;
```

This keeps game rules outside presentation components.

---

# 28. Persistence Strategy

Mathoria V1 uses localStorage only.

There is:

```text
NO backend
NO database
NO account
NO cloud save
```

Persistence should be accessed through an abstraction.

```ts
export interface GameRepository {
  load(): Promise<GameState | null>;

  save(state: GameState): Promise<void>;

  clear(): Promise<void>;
}
```

V1 implementation:

```text
LocalStorageGameRepository
```

Future versions may introduce:

```text
ApiGameRepository
```

Do not implement `ApiGameRepository` in V1.

---

# 29. Save Key

Use a Mathoria-specific key.

Recommended:

```text
mathoria:save
```

The saved payload contains its schema version.

Example:

```json
{
  "version": 1
}
```

Do not encode the schema version only into the localStorage key.

Keeping the version inside the save payload makes migration logic clearer.

---

# 30. Save Versioning

Persistent state must include:

```ts
version: number;
```

Initial version:

```text
1
```

Persistence loading should be structured so future migrations can be introduced.

Conceptually:

```text
load save
   ↓
inspect version
   ↓
migrate if necessary
   ↓
validate
   ↓
GameState
```

V1 does not need a complex migration framework.

It only needs an obvious migration boundary.

---

# 31. Save Validation and Recovery

localStorage content must not be blindly trusted.

Possible problems:

- old schema;
- malformed JSON;
- manually edited values;
- incomplete state;
- development changes.

On load:

```text
read
 ↓
parse
 ↓
validate minimum structure
 ↓
use save OR fall back safely
```

A corrupted save should not permanently prevent the game from starting.

Provide a development-only reset mechanism.

A player-facing reset feature can be added later if needed.

---

# 32. Autosave

Players should not need a manual Save button.

Persist after meaningful state changes such as:

```text
learning attempt recorded
reward granted
adventure node advanced
adventure completed
building constructed
world progression changed
```

Avoid writing to localStorage on every animation frame or purely visual interaction.

---

# 33. Localization

V1 language:

```text
Vietnamese (vi)
```

All player-facing UI should be Vietnamese.

Recommended structure:

```text
src/
└── i18n/
    ├── index.ts
    └── locales/
        └── vi/
            ├── common.json
            ├── game.json
            ├── learning.json
            ├── npc.json
            └── story.json
```

Possible future structure:

```text
locales/
├── vi/
└── en/
```

Do not implement English in V1 unless explicitly requested.

---

# 34. Localization Keys

React components should avoid:

```tsx
<button>Tiếp tục</button>
```

Prefer:

```tsx
<button>{t("common.continue")}</button>
```

NPC content should avoid:

```ts
dialogue: "Bạn có thể giúp mình không?";
```

Prefer:

```ts
dialogueKey: "npc.farmer.firstMeeting.helpRequest";
```

Math word problems should use semantic problem data and localized templates.

---

# 35. Vietnamese Content Tone

Player-facing Vietnamese should be:

- short;
- friendly;
- encouraging;
- natural for young children;
- easy to read;
- supported by visuals where possible.

Avoid formal software language.

Avoid:

```text
Đáp án không chính xác. Vui lòng thử lại.
```

Prefer:

```text
Gần đúng rồi! Mình thử lại nhé.
```

Avoid:

```text
Nhiệm vụ đã được hoàn thành thành công.
```

Prefer:

```text
Tuyệt! Chúng ta làm được rồi! 🎉
```

Exact copy belongs in localization/content files, not domain logic.

---

# 36. Recommended Source Structure

```text
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx
│
├── game/
│   ├── adventure/
│   ├── battle/
│   ├── building/
│   ├── reward/
│   └── world/
│
├── learning/
│   ├── domain/
│   ├── generator/
│   ├── mastery/
│   ├── adaptive/
│   └── hints/
│
├── content/
│   ├── math/
│   │   └── multiplication/
│   ├── activities/
│   ├── adventures/
│   ├── buildings/
│   ├── monsters/
│   └── npcs/
│
├── features/
│   ├── camp/
│   ├── worldMap/
│   ├── adventure/
│   ├── gathering/
│   ├── npcQuest/
│   ├── battle/
│   ├── farming/
│   └── building/
│
├── components/
│   ├── game/
│   └── ui/
│
├── state/
│
├── persistence/
│
├── i18n/
│   └── locales/
│       └── vi/
│
├── assets/
│
└── shared/
```

Do not create empty folders for speculative future systems merely to match this diagram.

Create modules as implementation reaches them.

---

# 37. Content Organization

Multiplication content should live under:

```text
content/math/multiplication/
```

Future division content may live under:

```text
content/math/division/
```

Do not create the division folder or implementation until division development begins unless a shared type requires no content implementation.

Game systems should not import multiplication content directly.

They should interact through Learning Engine interfaces.

---

# 38. Feature Boundaries

UI features may depend on game/application services.

Example:

```text
BattleScreen
    ↓
Battle Engine
    ↓
Learning Engine
```

Avoid:

```text
BattleScreen
    ↓
multiplicationQuestions.ts
```

Likewise:

```text
NPCQuest
    ↓
Learning Engine
```

not:

```text
NPCQuest
    ↓
hard-coded 3 × 2
```

---

# 39. End-to-End Example

The child meets the Farmer.

The NPC Quest configuration requests:

```text
skill: APPLY
context: FARM
difficulty: introductory
```

The Adaptive Learning system sees:

```text
3 × 2 APPLY mastery is low
```

The Problem Generator produces semantic data:

```ts
{
  operation: "MULTIPLICATION",

  type: "APPLY",

  representation: "WORD_PROBLEM",

  operands: [3, 2],

  answer: 6,

  context: {
    theme: "FARM",
    actor: "RABBIT",
    object: "CARROT",
  },
}
```

The Vietnamese presentation layer renders something equivalent to:

```text
Có 3 chú thỏ.

Mỗi chú cần 2 củ cà rốt.

Cần tất cả bao nhiêu củ cà rốt?
```

The child answers:

```text
6
```

Learning Engine:

```text
record attempt
update 3 × 2 APPLY mastery
```

Game Engine:

```text
complete NPC activity
```

Reward system:

```text
+3 MATERIAL
```

World/adventure state:

```text
advance to next adventure node
```

Persistence:

```text
autosave updated GameState to localStorage
```

Each subsystem performs one clear responsibility.

---

# 40. Error Handling Philosophy

Mathoria is a children's game.

Expected user mistakes are not application errors.

Wrong math answers should flow through:

```text
answer
 ↓
learning feedback
 ↓
hint
 ↓
retry
```

They should not produce error toasts or console-style UI.

Technical failures should fail safely where possible.

Examples:

- missing save → start new game;
- corrupted save → recover to valid initial state;
- missing optional asset → render safe fallback;
- invalid content definition during development → fail clearly for developers.

---

# 41. Testing Priorities

V1 does not require exhaustive test coverage.

Prioritize tests around domain logic where regressions would damage learning behavior.

Important candidates:

### Learning

- fact key generation;
- answer correctness;
- mastery updates;
- adaptive selection;
- problem generation;
- hint progression.

### Game

- reward calculation;
- building affordability;
- building construction;
- adventure progression;
- unlock conditions.

### Persistence

- save/load round trip;
- invalid save recovery;
- version handling.

UI animation snapshots are lower priority than domain behavior.

---

# 42. Development Debug Tools

V1 development should include a simple developer/debug route or panel.

It may expose:

```text
Current GameState
Learning mastery
Inventory
Built buildings
Completed adventures
Current adventure/node
Reset local save
Grant test resources
```

This is for development only.

It should not become part of the child-facing game UI.

A debug surface will significantly reduce development time while building progression systems.

---

# 43. Performance

Mathoria V1 is a lightweight 2D React web game.

Avoid introducing a heavy game engine unless actual gameplay proves React/CSS/SVG insufficient.

Initial rendering approach may use:

- React;
- CSS;
- SVG;
- lightweight motion/animation tooling.

Optimize for:

- fast initial load;
- smooth transitions;
- responsive input;
- modest asset sizes.

Do not optimize prematurely for large open worlds or hundreds of simultaneous entities.

Mathoria V1 does not have those requirements.

---

# 44. Asset Strategy

Early implementation may use:

- placeholders;
- CSS shapes;
- simple SVG;
- temporary icons.

Do not block core gameplay implementation on final art assets.

Recommended workflow:

```text
wireframe
 ↓
functional prototype
 ↓
validate gameplay
 ↓
generate/finalize assets
 ↓
replace placeholders
 ↓
polish
```

Final visual direction is defined in:

```text
docs/DESIGN_SYSTEM.md
```

---

# 45. Accessibility and Child-Friendly Interaction

Core interaction should assume young users.

Prefer:

- large hit targets;
- strong visual feedback;
- limited simultaneous choices;
- minimal text;
- clear iconography;
- no reliance on hover;
- forgiving interaction;
- no punishment for accidental clicks.

Do not require keyboard-heavy interaction for core gameplay.

Adventure movement should initially be click/tap driven rather than WASD-driven.

---

# 46. V1 Architecture Non-Goals

Do not implement any of the following unless explicitly added to the MVP scope:

```text
backend architecture
authentication architecture
database schema
cloud synchronization
multiplayer architecture
event sourcing
microservices
ECS
generic plugin systems
dependency injection frameworks
complex event buses
AI-generated runtime questions
LLM integration
server-side learning analytics
```

Simple code with clear boundaries is preferred over generalized infrastructure.

---

# 47. Dependency Rules

Preferred direction:

```text
UI / Features
      ↓
Game Engine
      ↓
Learning Engine
      ↓
Domain
```

Content provides configuration:

```text
Content
   ↓
Game / Learning Engine
```

Persistence handles state storage:

```text
Game State
    ↓
GameRepository
    ↓
LocalStorageGameRepository
```

Forbidden directions include:

```text
Learning Domain → React

Learning Engine → BattleScreen

MathProblem → NPC Component

Game Engine → Vietnamese UI string

Battle → multiplication content file

localStorage calls scattered through components
```

---

# 48. V1 Extension Boundaries

Mathoria V1 intentionally prepares for three future changes without implementing them.

## New math operation

Current:

```text
MULTIPLICATION
```

Future:

```text
DIVISION
```

Expected change:

```text
new math content
new learning rules/templates where necessary
```

Not:

```text
rewrite Battle
rewrite Adventure
rewrite NPC Quest
rewrite World
```

---

## New language

Current:

```text
vi
```

Future example:

```text
en
```

Expected change:

```text
add locale content/templates
```

Not:

```text
rewrite learning engine
rewrite game engine
```

---

## Backend/cloud persistence

Current:

```text
LocalStorageGameRepository
```

Future:

```text
ApiGameRepository
```

Expected change:

```text
new repository implementation
authentication/account work
sync strategy
```

Not:

```text
rewrite GameState domain
```

These are extension boundaries, not features that V1 should implement early.

---

# 49. Architecture Decision Summary

Mathoria V1 uses:

```text
React + TypeScript + Vite

Zustand
    ↓
persistent game state

React local state
    ↓
temporary UI interaction

Game Engine
    ↓
generic gameplay

Learning Engine
    ↓
problem generation
mastery
adaptation
hints

Math Content
    ↓
MULTIPLICATION only in V1

Localization
    ↓
Vietnamese only in V1

Persistence
    ↓
localStorage only in V1
```

The two most important architectural boundaries are:

> **Gameplay must remain independent from specific math operations.**

and:

> **Learning/domain logic must remain independent from language and presentation.**

---

# 50. Source of Truth

Before implementing features, contributors and coding agents should read:

1. `AGENTS.md`
2. `docs/GAME_DESIGN.md`
3. `docs/LEARNING_SYSTEM.md`
4. `docs/DESIGN_SYSTEM.md`
5. `docs/MVP_SPEC.md`
6. `docs/TECHNICAL_ARCHITECTURE.md`
7. the relevant phase specification

If implementation decisions conflict with these documents, do not silently invent a new product direction.

Update or clarify the specification first.

---

# 51. Next Implementation Step

After this architecture is accepted, create:

```text
docs/phases/PHASE_01_FOUNDATION.md
```

Phase 01 should focus only on:

```text
React/Vite/TypeScript setup

project structure

core learning domain types

core game domain types

Vietnamese localization foundation

Zustand GameState

LocalStorageGameRepository

save versioning

initial static content structure

development/debug screen

basic unit tests for domain and persistence
```

Phase 01 should **not** implement the actual Forest Adventure, polished Camp, Slime Battle, Farm building animation, or final visual assets.

Those belong to later phases.
