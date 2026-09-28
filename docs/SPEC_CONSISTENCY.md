# Mathoria — Specification Consistency

## 1. Purpose

This document defines the canonical decisions that all Mathoria specifications must follow.

It exists to prevent contradictions between:

- `AGENTS.md`
- `docs/GAME_DESIGN.md`
- `docs/LEARNING_SYSTEM.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/MVP_SPEC.md`
- `docs/TECHNICAL_ARCHITECTURE.md`
- future phase specifications

This document does not introduce new gameplay features.

It freezes the decisions already made for Mathoria V1.

If an older specification conflicts with this document, update the older specification.

---

# 2. Canonical Project Identity

Official project/game name:

```text
Mathoria
```

Repository name:

```text
mathoria
```

Do not use the old project name:

```text
Multiplication Adventure
```

except when discussing historical documents.

Replace old titles such as:

```text
Multiplication Adventure — Game Design
```

with:

```text
Mathoria — Game Design
```

---

# 3. Product Definition

Mathoria is:

> A cozy educational adventure game where children learn mathematics through exploration, helping characters, solving problems, battling friendly monsters, collecting rewards, and building a growing world.

Mathoria should feel like:

```text
GAME
+
ADVENTURE
+
WORLD BUILDING
+
LEARNING
```

It should not feel primarily like:

```text
QUIZ APP
WORKSHEET
LEARNING DASHBOARD
```

---

# 4. Target Player

Mathoria V1 is designed for:

> Children who are beginning to learn multiplication.

This means the game must assume that the player may not yet understand multiplication notation.

The game should first build conceptual understanding through:

```text
equal groups
visual objects
repeated addition
arrays
real-world situations
construction/manipulation
```

before expecting fluent symbolic calculation.

---

# 5. V1 Learning Scope

The only enabled math operation in V1 is:

```text
MULTIPLICATION
```

Future Mathoria versions may support:

```text
DIVISION
ADDITION
SUBTRACTION
```

Division is explicitly planned as a future extension.

However:

```text
Future support ≠ V1 implementation
```

Do not create playable division content in V1.

---

# 6. Operation-Agnostic Architecture

Although V1 content is multiplication-only, core architecture must not be multiplication-specific.

Avoid:

```text
MultiplicationBattle
MultiplicationAdventure
MultiplicationProgress
MultiplicationQuestion
```

Prefer:

```text
Battle
Adventure
LearningProgress
MathProblem
MathOperation
```

The goal is:

```text
V1

Gameplay
   ↓
Learning Engine
   ↓
MULTIPLICATION
```

Future:

```text
Gameplay
   ↓
Learning Engine
   ├── MULTIPLICATION
   └── DIVISION
```

Battle, Adventure, NPC Quest, Gathering, Farming, Reward, and World systems should not require redesign when another math operation is added.

---

# 7. V1 Language

The only player-facing language in V1 is:

```text
Vietnamese (vi)
```

All player-facing content must be Vietnamese, including:

```text
UI
tutorial
dialogue
NPC text
learning instructions
word problems
hints
rewards
building text
adventure text
```

V1 does NOT require:

```text
English
language selector
runtime language switching
```

---

# 8. Localization Architecture

Although V1 only provides Vietnamese, architecture must remain localization-ready.

Do not scatter Vietnamese strings through domain/game logic.

Prefer:

```text
localization key
       ↓
Vietnamese locale
       ↓
player-facing string
```

Example:

```text
common.continue
```

↓

```text
Tiếp tục
```

Math word problems should be generated from:

```text
semantic MathProblem
+
localized template
```

not stored as final Vietnamese sentences inside the Learning Engine.

Future English support should primarily require new locale content rather than changes to learning/game logic.

---

# 9. Vietnamese Tone

Vietnamese copy should be appropriate for young children.

Use:

```text
short
friendly
warm
encouraging
simple
playful
```

Avoid formal application language.

Avoid:

```text
Đáp án không chính xác. Vui lòng thử lại.
```

Prefer:

```text
Gần đúng rồi! Mình thử lại nhé.
```

Avoid punishment-oriented language.

The Fox Guide should support the child rather than judge the child.

---

# 10. V1 Platform

Mathoria V1 is a:

```text
web application
```

Primary implementation:

```text
React
TypeScript
Vite
```

Do not introduce a native mobile application during V1.

The web experience should still support practical responsive layouts where reasonable.

---

# 11. V1 Backend Decision

Mathoria V1 is:

```text
FRONTEND ONLY
```

There is no backend.

Do not implement:

```text
Node server
REST API
GraphQL
database
Firebase backend
Supabase backend
authentication server
cloud save
```

unless the product scope is explicitly changed.

---

# 12. V1 Authentication Decision

V1 has:

```text
NO LOGIN
NO ACCOUNT
NO AUTHENTICATION
```

The child should be able to open Mathoria and play.

Do not create:

```text
sign in
sign up
password
email
social login
parent account
```

for the MVP.

---

# 13. Persistence

V1 progress is stored using:

```text
localStorage
```

Persistent information includes:

```text
learning mastery
resources
world progress
built buildings
adventure progress
settings
```

Reloading the page should preserve progress.

Accepted MVP limitation:

> Clearing browser storage can remove the player's progress.

Cross-device synchronization is not required.

---

# 14. Persistence Boundary

Do not access localStorage throughout arbitrary components.

Preferred architecture:

```text
GameState
   ↓
GameRepository
   ↓
LocalStorageGameRepository
   ↓
localStorage
```

Future:

```text
GameRepository
   ├── LocalStorageGameRepository
   └── ApiGameRepository
```

Do not implement `ApiGameRepository` in V1.

---

# 15. Save Versioning

Saved data must contain:

```text
version
```

Initial schema:

```text
version = 1
```

Recommended storage key:

```text
mathoria:save
```

The application should be able to recover safely from malformed or incompatible local save data.

---

# 16. State Management

Use:

```text
Zustand
```

for persistent/global game state.

Examples:

```text
resources
learning mastery
world progress
built buildings
adventure progress
settings
```

Use React local state for temporary UI state.

Examples:

```text
selected answer
animation running
dialogue open
hover state
hint visibility
```

Do not put every interaction into Zustand.

---

# 17. Core Product Loop

The canonical Mathoria loop is:

```text
Learn
  ↓
Adventure
  ↓
Activity
  ↓
Reward
  ↓
Build
  ↓
World grows
  ↓
New Adventure
```

Another useful representation is:

```text
Adventure
→ Learn through gameplay
→ Earn resources
→ Return home
→ Build
→ Unlock/change world
→ Adventure again
```

All specifications should describe compatible versions of this loop.

---

# 18. V1 Playable Flow

Canonical V1 journey:

```text
Start
  ↓
Multiplication Tutorial
  ↓
Camp
  ↓
Forest Adventure
  ↓
Gathering
  ↓
Farmer NPC Quest
  ↓
Forest Slime Battle
  ↓
Reward / Treasure
  ↓
Return to Camp
  ↓
Build Farm
  ↓
Camp visually changes
  ↓
Deep Forest Adventure
  ↓
Farming
  ↓
Additional learning activities
  ↓
Big Slime Mini Boss
  ↓
MVP Complete
```

Older documents describing a substantially different MVP sequence should be updated.

---

# 19. MVP Content Duration

Target initial playable content:

```text
approximately 30–45 minutes
```

This is a target, not a hard technical requirement.

Playtesting may change the final duration.

---

# 20. Tutorial

Tutorial goal:

> Help a child understand what multiplication means before requiring memorized answers.

Approximate target:

```text
5–10 minutes
```

Initial examples should use small facts such as:

```text
2 × 2
2 × 3
3 × 2
2 × 4
3 × 3
```

No timer.

No lives.

No punishment.

---

# 21. Core V1 Gameplay Types

Canonical V1 activity families:

```text
GATHERING
NPC_QUEST
BATTLE
FARMING
```

These are the core MVP gameplay systems.

Ideas discussed for future versions such as:

```text
Puzzle
Exploration
Timed Challenge
```

must be marked as future content and must not silently enter V1 scope.

---

# 22. Learning Philosophy

Mathoria must avoid rote memorization as the only learning method.

The same fact should appear in different forms.

Example:

```text
3 × 4 = 12
```

may appear through:

```text
CALCULATE
RECOGNIZE
APPLY
CONSTRUCT
MISSING_FACTOR
```

and through representations such as:

```text
SYMBOLIC
EQUAL_GROUPS
ARRAY
WORD_PROBLEM
```

This is a core product requirement, not optional polish.

---

# 23. Learning Skills

Canonical learning dimensions:

```text
RECOGNIZE
CALCULATE
APPLY
CONSTRUCT
MISSING_FACTOR
FLUENCY
```

A child may have different mastery levels for the same math fact.

Example:

```text
3 × 4

Recognize       strong
Calculate       medium
Apply           weak
Construct       medium
```

Do not reduce learning progress to only:

```text
correct / wrong
```

or:

```text
3 × 4 mastered / not mastered
```

---

# 24. Fluency and Timer

Fluency is part of the long-term learning model.

However:

```text
TIMED CHALLENGE IS NOT V1
```

The previously discussed idea of introducing countdown pressure after later world progression remains a future feature.

Do not introduce time pressure during the beginner experience.

The architecture may track `FLUENCY`, but V1 should not require countdown gameplay.

---

# 25. Adaptive Learning

V1 includes basic adaptive learning.

It is:

```text
RULE BASED
```

It is NOT:

```text
AI
machine learning
LLM
```

The system should use learning mastery to influence future problem selection.

Initial conceptual mix:

```text
60% current target
30% review
10% stretch
```

These values are configurable and may change during playtesting.

---

# 26. Hint System

Hints are a core V1 feature.

Wrong answers should lead to:

```text
support
↓
alternative representation
↓
retry
```

Example:

```text
3 × 4 = ?
```

↓

```text
● ● ● ●
● ● ● ●
● ● ● ●
```

↓

```text
4 + 4 + 4
```

↓

```text
4 → 8 → 12
```

Do not immediately reveal the answer unless the learning design explicitly requires it.

---

# 27. Wrong Answer Philosophy

Do not punish normal learning mistakes.

Avoid:

```text
lose heart
lose coins
lose materials
restart entire adventure
negative score
harsh failure message
```

The player should feel safe experimenting.

Battle damage/progression should primarily reward correct understanding rather than punish incorrect attempts.

---

# 28. Fox Guide

The Fox Guide is:

```text
companion
teacher
hint presenter
encourager
tutorial guide
```

The Fox is not the Learning Engine.

Architecture:

```text
Learning Engine
      ↓
Hint / Feedback
      ↓
Fox presentation
      ↓
Player
```

Do not place mastery/adaptive logic inside Fox React components.

---

# 29. World Progression

Long-term planned progression:

```text
Camp
  ↓
Settlement
  ↓
Village
  ↓
Castle
  ↓
Kingdom
```

V1 only needs to demonstrate the beginning of this fantasy.

Canonical V1 stage:

```text
CAMP
```

Do not implement Settlement, Village, Castle, or Kingdom during the MVP unless scope changes.

---

# 30. End-of-Stage Events

The long-term game design includes major events at the end of world stages.

Examples discussed:

```text
monster attack
natural disaster
disease/problem affecting the world
magical crisis
```

Their purpose is to review the mathematics learned during the stage before progressing.

These are part of the long-term game vision.

They are NOT required for the initial MVP unless explicitly added later.

The Big Slime in V1 acts as a small MVP climax, not the complete future Final Event system.

---

# 31. World Navigation

V1 does not require free-roaming open-world movement.

Preferred approach:

```text
node-based adventure
```

Example:

```text
Hero
 ↓
Gathering
 ↓
Farmer
 ↓
Slime
 ↓
Treasure
```

Movement may be animated between nodes.

Core interaction should work with click/tap.

Do not require WASD.

---

# 32. Camp

Camp is the player's home.

It should feel like an in-world location rather than an application dashboard.

Avoid navigation dominated by:

```text
Home
Learn
Practice
Statistics
Settings
```

where world objects can provide the same navigation more naturally.

The Camp must visibly change after building the Farm.

---

# 33. V1 Building

Canonical V1 building:

```text
Farm
```

The Farm connects:

```text
Farmer
+
rabbits
+
Farming activity
+
world progression
```

Do not add Workshop, Magic Tower, Castle, or other major buildings to V1.

---

# 34. V1 Economy

Canonical resources:

```text
Materials
Coins
```

The initial Farm cost may be approximately:

```text
15 Materials
10 Coins
```

Exact numbers are balancing values and may change.

Do not treat these values as immutable architecture.

---

# 35. Economy Philosophy

V1 must not rely on grinding.

The expected first adventure should provide enough progress to reasonably reach the first meaningful build.

The child should not need to repeat the same activity many times merely to continue the core learning journey.

---

# 36. Learning Mastery vs Game Currency

These systems are separate.

Do not convert:

```text
mastery
accuracy
learning score
```

directly into spendable:

```text
coins
materials
```

Learning mistakes must not threaten world/economy progress.

---

# 37. V1 Characters

Canonical core cast:

```text
Hero
Fox Guide
Farmer
Forest Slime
Big Slime
```

Additional NPCs/monsters belong to future content unless required by a later approved phase.

---

# 38. Visual Direction

Canonical art direction:

```text
Cozy Fantasy 2D
```

Desired feeling:

```text
warm
friendly
playful
safe
magical
colorful
soft
expressive
```

Avoid:

```text
SaaS UI
corporate dashboard
dark fantasy
realistic violence
frightening monsters
dense text
tiny controls
```

---

# 39. Asset Strategy

Final assets do not need to exist before implementation begins.

Canonical workflow:

```text
wireframe / placeholder
        ↓
functional gameplay
        ↓
validate
        ↓
final assets
        ↓
polish
```

Codex may use:

```text
CSS
simple SVG
temporary icons
placeholder art
```

during early phases.

Do not allow placeholder visual choices to redefine the final Cozy Fantasy direction.

---

# 40. Battle Scope

V1 battle is intentionally simple.

Correct answer:

```text
answer
 ↓
Hero attack
 ↓
enemy HP decreases
```

Incorrect answer:

```text
answer
 ↓
Fox support
 ↓
hint
 ↓
retry
```

V1 battle is not a full RPG combat system.

Do not add:

```text
equipment
skill trees
complex stats
critical hits
armor
mana
element systems
```

unless future scope requires them.

---

# 41. Adventure Definitions

Adventures should be data-driven.

Adventure content defines:

```text
nodes
activities
rewards
unlock conditions
story references
```

React pages should not hard-code entire adventure sequences.

---

# 42. Content vs Runtime State

Static content:

```text
Slime definition
Farm definition
Adventure definition
NPC definition
activity configuration
```

Runtime state:

```text
Farm built
adventure completed
resources owned
learning mastery
current node
```

These must remain separate across all specifications and implementation phases.

---

# 43. V1 Game State

Persistent V1 state should conceptually cover:

```text
Player
World
Learning
Inventory
Adventure Progress
Settings
Save Version
```

Avoid adding speculative persistent systems before they are needed.

---

# 44. Development Debugging

A development-only debug surface is allowed and recommended.

It may provide:

```text
inspect GameState
inspect mastery
grant resources
complete/reset progress
reset localStorage save
```

It must not become part of the normal child-facing experience.

---

# 45. Testing Priority

Prioritize automated tests for:

```text
problem generation
fact key generation
mastery updates
adaptive selection
hint logic
reward calculation
building affordability
adventure progression
unlock conditions
save/load
save recovery
```

Do not spend disproportionate MVP effort on snapshot-testing animations.

---

# 46. Explicit V1 Non-Goals

The following are NOT part of V1:

```text
Backend
Database
Authentication
Login
Accounts
Cloud save
Cross-device sync

Division learning content
Addition learning content
Subtraction learning content

Multiplayer
Leaderboard

Shop
Complete cosmetic economy
Pets
Equipment
Crafting

Timed challenges
Countdown pressure

Elite monster system
Complex RPG combat

Settlement
Village
Castle
Kingdom

Full Final Event system

Parent dashboard

Native mobile application

Open world movement

Runtime AI
LLM integration
AI-generated questions

Microservices
ECS
Event sourcing
Complex plugin architecture
```

If another specification includes one of these as an MVP requirement, that specification must be corrected or this consistency document must be intentionally revised.

---

# 47. Canonical Source Structure

The architecture may evolve during implementation, but the conceptual structure is:

```text
src/
├── app/
├── game/
├── learning/
├── content/
├── features/
├── components/
├── state/
├── persistence/
├── i18n/
├── assets/
└── shared/
```

Do not create speculative empty architecture merely to match the diagram.

Folders should be introduced when implementation needs them.

---

# 48. Canonical Specification Hierarchy

Use the documents for different purposes.

## `GAME_DESIGN.md`

Answers:

```text
What is Mathoria?
Why is it fun?
What is the world fantasy?
What is the long-term game vision?
```

It may describe future features if clearly marked as future.

---

## `LEARNING_SYSTEM.md`

Answers:

```text
How does Mathoria teach?
How do representations work?
How is mastery understood?
How do hints/adaptation work?
```

It may describe long-term learning direction but must clearly separate V1 from future learning features.

---

## `DESIGN_SYSTEM.md`

Answers:

```text
What should Mathoria look and feel like?
How should UI behave?
What is the Cozy Fantasy direction?
```

---

## `MVP_SPEC.md`

Answers:

```text
What exactly are we building now?
What is included?
What is explicitly excluded?
When is MVP complete?
```

If a future idea appears in `GAME_DESIGN.md` but not in `MVP_SPEC.md`, do not implement it in V1.

---

## `TECHNICAL_ARCHITECTURE.md`

Answers:

```text
How is Mathoria structured technically?
What are the system boundaries?
How is state persisted?
How do game and learning systems interact?
```

---

## Phase Specifications

Answer:

```text
What should Codex implement in this phase?
What should it not implement?
What are the acceptance criteria?
```

Phase specs must not silently expand `MVP_SPEC.md`.

---

# 49. Conflict Resolution Rule

If documents appear to conflict, use this process:

```text
Is this about current MVP scope?
        ↓
MVP_SPEC.md

Is this about architecture?
        ↓
TECHNICAL_ARCHITECTURE.md

Is this about learning behavior?
        ↓
LEARNING_SYSTEM.md

Is this about visual behavior?
        ↓
DESIGN_SYSTEM.md

Is this about long-term game vision?
        ↓
GAME_DESIGN.md
```

`AGENTS.md` provides implementation rules across all of them.

This document records the canonical consistency decisions.

Do not resolve contradictions by guessing.

---

# 50. Files Requiring Immediate Consistency Updates

Run the following pass before Phase 01 implementation.

## `GAME_DESIGN.md`

Check and update:

```text
Multiplication Adventure
→ Mathoria
```

Ensure:

```text
V1 = multiplication
future = division and other math operations
```

Mark clearly as future:

```text
Settlement
Village
Castle
Kingdom
Final Events
Timed Challenge
additional gameplay types
```

Ensure Mathoria is described as a broader math world rather than a game permanently limited to multiplication.

---

## `LEARNING_SYSTEM.md`

Ensure:

```text
V1 operation = MULTIPLICATION
```

but architecture/learning concepts can support:

```text
DIVISION later
```

Ensure the document contains or agrees with:

```text
RECOGNIZE
CALCULATE
APPLY
CONSTRUCT
MISSING_FACTOR
FLUENCY
```

Ensure:

```text
timer/fluency pressure = future
```

Ensure adaptive learning is:

```text
rule-based in V1
```

not AI-based.

---

## `DESIGN_SYSTEM.md`

Replace old game name with:

```text
Mathoria
```

Ensure:

```text
Cozy Fantasy 2D
```

is canonical.

Ensure child-friendly UI principles agree with:

```text
large targets
minimal text
friendly feedback
click/tap
no hover dependency
```

Add if missing:

```text
V1 player-facing language = Vietnamese
```

The design system should account for Vietnamese text length and diacritics.

---

## `MVP_SPEC.md`

Use the current Mathoria version.

Ensure explicit:

```text
Vietnamese only
Frontend only
localStorage
No backend
No authentication
Multiplication only
Division future
```

---

## `TECHNICAL_ARCHITECTURE.md`

Ensure explicit:

```text
React + TypeScript + Vite
Zustand
localStorage
GameRepository abstraction
Vietnamese localization
operation-agnostic learning architecture
```

Do not include implementation of:

```text
backend
API repository
division content
English content
```

---

## `AGENTS.md`

Ensure Codex is explicitly instructed:

```text
do not expand MVP scope

do not build backend

do not hard-code multiplication into gameplay

do not hard-code Vietnamese into domain logic

do not punish wrong answers

do not turn Mathoria into a quiz dashboard

read specs before implementation
```

---

# 51. Consistency Checklist

Before writing `PHASE_01_FOUNDATION.md`, verify:

- [ ] Every current document uses **Mathoria** as the project name.
- [ ] No current document treats `Multiplication Adventure` as the product name.
- [ ] V1 learning content is multiplication only.
- [ ] Division is clearly future scope.
- [ ] Gameplay architecture is operation-agnostic.
- [ ] V1 player-facing language is Vietnamese.
- [ ] English is not required in V1.
- [ ] Localization architecture remains extensible.
- [ ] V1 is frontend-only.
- [ ] No backend is required.
- [ ] No authentication is required.
- [ ] Persistence uses localStorage.
- [ ] Persistent save state is versioned.
- [ ] Zustand is used for global/persistent game state.
- [ ] Temporary UI state remains local where appropriate.
- [ ] Core loop is consistent.
- [ ] Tutorial focuses on conceptual understanding.
- [ ] V1 core activities are Gathering, NPC Quest, Battle, and Farming.
- [ ] Wrong answers trigger support rather than punishment.
- [ ] Hint system is part of MVP.
- [ ] Adaptive learning is rule-based.
- [ ] Timed challenges are future scope.
- [ ] Camp is the only required world stage for MVP.
- [ ] Farm is the primary MVP building.
- [ ] Forest Slime and Big Slime are the MVP monsters.
- [ ] V1 does not require grind-heavy economy.
- [ ] Learning mastery and game currency remain separate.
- [ ] Cozy Fantasy 2D is the canonical art direction.
- [ ] Adventures are data-driven.
- [ ] Static content and runtime state are separated.
- [ ] Final assets are not required before functional prototypes.
- [ ] No phase spec expands scope without updating MVP_SPEC.
- [ ] Codex has one unambiguous source of truth for each decision category.

---

# 52. Freeze Point

Once this consistency pass is complete, consider the following decisions frozen for Phase 01:

```text
PROJECT
Mathoria

PLATFORM
Web

TECH
React + TypeScript + Vite

STATE
Zustand

PERSISTENCE
localStorage

BACKEND
None

AUTH
None

LANGUAGE
Vietnamese

V1 MATH
Multiplication

FUTURE MATH
Division first

ART
Cozy Fantasy 2D

V1 ACTIVITIES
Gathering
NPC Quest
Battle
Farming

V1 HOME
Camp

V1 BUILDING
Farm

V1 MONSTERS
Forest Slime
Big Slime

LEARNING
Multiple representations
Fact + skill mastery
Rule-based adaptation
Hints

TIMER
Not V1
```

Changes to these decisions after Phase 01 begins should be intentional specification changes rather than accidental implementation drift.

---

# 53. Next Step

After completing this consistency pass:

```text
Product decisions       ✓
Game design             ✓
Learning design         ✓
Visual direction        ✓
MVP scope               ✓
Technical architecture  ✓
Specification alignment ✓

              ↓

PHASE_01_FOUNDATION.md
```

`PHASE_01_FOUNDATION.md` becomes the first implementation contract for Codex.
