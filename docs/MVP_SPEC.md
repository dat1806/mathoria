# Mathoria — MVP Specification

## 1. Objective

The purpose of Mathoria V1 is not to build the complete Mathoria world.

The MVP exists to validate three hypotheses:

1. Children can understand introductory multiplication through Mathoria's learning interactions.
2. Children enjoy using math inside adventure gameplay.
3. Children want to continue playing because their world grows as a result of their actions.

The MVP should provide approximately **30–45 minutes of initial playable content**.

---

# 2. Product Identity

Game:

```text
Mathoria
```

Genre:

```text
Cozy educational adventure game
```

Art direction:

```text
Cozy Fantasy 2D
```

Target audience:

```text
Children who are beginning to learn multiplication
```

Primary V1 language:

```text
Vietnamese
```

---

# 3. Learning Scope

V1 teaches:

```text
MULTIPLICATION
```

V1 does NOT teach:

```text
DIVISION
ADDITION
SUBTRACTION
```

The architecture must allow future math operations, especially division, without rewriting core gameplay.

This architectural readiness does not mean division content should be implemented in V1.

---

# 4. Language Scope

All player-facing V1 content is Vietnamese.

V1 includes:

```text
Vietnamese localization
Vietnamese story/dialogue
Vietnamese learning instructions
Vietnamese word-problem templates
Vietnamese UI
```

V1 does not require:

```text
English
language selector
runtime locale switching
translated content packs
```

However, player-facing strings should use the localization architecture defined in `TECHNICAL_ARCHITECTURE.md`.

---

# 5. Technical Scope

Mathoria V1 is:

```text
Frontend-only
```

Technology:

```text
React
TypeScript
Vite
Zustand
localStorage
```

There is no backend in V1.

---

# 6. Persistence Scope

All player progress is stored locally in the browser.

Persist:

```text
learning mastery
resources
world state
built buildings
completed adventures
current adventure progress
settings
```

V1 does not include:

```text
user account
authentication
cloud save
database
cross-device synchronization
server persistence
```

Reloading the browser should preserve valid progress.

Clearing browser storage may remove progress. This limitation is accepted for the MVP.

---

# 7. Core MVP Flow

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
Treasure / Reward
  ↓
Return to Camp
  ↓
Build Farm
  ↓
World changes
  ↓
Deep Forest Adventure
  ↓
Farming
  ↓
Additional learning activities
  ↓
Big Slime Mini Boss
  ↓
MVP completion
```

This flow should demonstrate the complete Mathoria core loop.

---

# 8. Core Loop

```text
Learn
  ↓
Adventure
  ↓
Activity
  ↓
Reward
  ↓
Return Home
  ↓
Build
  ↓
World Changes
  ↓
New Adventure
```

The MVP is successful only if this complete loop is playable.

A collection of disconnected math mini-games is not sufficient.

---

# 9. Tutorial

Approximate target:

```text
5–10 minutes
```

The tutorial introduces multiplication conceptually.

Example progression:

```text
● ●
● ●
● ●

2 + 2 + 2 = 6

        ↓

3 × 2 = 6
```

Tutorial interaction types should include a small subset of:

```text
view equal groups
connect repeated addition to multiplication
choose an expression
choose an answer
simple construction/grouping
```

Use only small introductory facts.

Examples:

```text
2 × 2
2 × 3
3 × 2
2 × 4
3 × 3
```

No timer.

No punishment.

Visual support should be strong.

---

# 10. Camp

Camp is the player's home and central world screen.

Initial Camp should be intentionally simple.

Conceptually:

```text
trees

        tent

     Hero + Fox

        Adventure
```

The Camp should feel like a world, not a dashboard.

Do not present the child with navigation such as:

```text
Home
Learn
Practice
Progress
```

World objects should act as navigation where practical.

---

# 11. Camp World Change

After the first major adventure, the player builds the Farm.

Before:

```text
Camp
Tent
Hero
Fox
```

After:

```text
Camp
Tent
Farm
Farmer
Rabbits
Hero
Fox
```

This visual transformation is a critical MVP moment.

The player should clearly feel:

> My actions changed my world.

---

# 12. World Map

V1 world map is intentionally small.

Initial concept:

```text
Deep Forest 🔒
      │
Forest
      │
Camp
```

After completing the first Forest Adventure:

```text
Deep Forest ✨
      │
Forest ✓
      │
Camp
```

Do not implement the complete future Mathoria world map.

---

# 13. Adventure Navigation

V1 adventure navigation should be simple and click/tap driven.

Do not build free-roaming open-world movement.

Preferred concept:

```text
Hero + Fox
    │
Gathering
    │
NPC
    │
Battle
    │
Treasure
    │
Finish
```

The Hero may animate between activity nodes.

Core gameplay must not require WASD.

---

# 14. MVP Activities

V1 includes exactly these core activity families:

```text
GATHERING
NPC_QUEST
BATTLE
FARMING
```

Do not add Puzzle, Exploration, Timed Challenge, or other major activity systems unless the MVP specification is explicitly updated.

---

# 15. Gathering

Gathering primarily supports visual recognition and contextual math.

Example:

```text
🪵 🪵
🪵 🪵
🪵 🪵
```

The child may identify:

```text
3 × 2
```

Correct interaction produces an in-world reward animation.

Example:

```text
wood → bag

+6 materials
```

Avoid generic:

```text
Correct!
Next question
```

where in-world feedback can communicate the result.

---

# 16. NPC Quest

The first important NPC is the Farmer.

Example scenario:

```text
3 rabbits

Each rabbit needs 2 carrots.

How many carrots are needed?
```

The learning problem should be presented through the NPC/world context.

After helping the Farmer, the character becomes connected to the Camp/Farm progression.

---

# 17. Battle

V1 contains:

```text
Forest Slime
Big Slime
```

Battle is intentionally simple.

Conceptual loop:

```text
MathProblem
   ↓
correct answer
   ↓
Hero attack animation
   ↓
enemy loses HP
   ↓
next problem
```

Incorrect answer:

```text
wrong
 ↓
Fox Guide
 ↓
hint
 ↓
retry
```

Do not remove player HP, resources, or progression for ordinary wrong math answers.

---

# 18. Farming

Farming becomes available after the Farm is built.

It should introduce or reinforce construction/grouping concepts.

Example:

```text
Plant 6 seeds
in 3 equal rows.
```

The child manipulates or selects a visual arrangement representing:

```text
3 × 2 = 6
```

Farming demonstrates that Mathoria supports understanding beyond symbolic calculation.

---

# 19. Learning Problem Types

V1 supports:

```text
CALCULATE
RECOGNIZE
APPLY
CONSTRUCT
MISSING_FACTOR
```

Not every type must appear equally often during the first 30 minutes.

Difficulty should be introduced gradually.

---

# 20. Learning Representations

V1 may use:

```text
SYMBOLIC
EQUAL_GROUPS
ARRAY
WORD_PROBLEM
```

A mathematical fact should appear in multiple representations over time.

Example:

```text
3 × 2 = 6
```

may appear as:

```text
●●
●●
●●
```

then:

```text
3 × 2 = ?
```

then:

```text
3 rabbits × 2 carrots
```

then:

```text
? × 2 = 6
```

This is a core MVP learning requirement.

---

# 21. Adaptive Learning

V1 must include a small rule-based adaptive system.

It does not need AI.

Track enough information to distinguish performance by:

```text
math fact
learning skill
```

Example:

```text
3 × 4

Recognize      strong
Calculate      medium
Apply          weak
Construct      medium
```

The game should use this information to influence future problem selection.

---

# 22. Repetition Strategy

Initial target:

```text
60% current learning target
30% review
10% stretch
```

This is a tunable content configuration.

Previously learned facts should continue appearing.

Do not permanently abandon easier facts once new ones are introduced.

---

# 23. Hint System

Hints are mandatory in the MVP.

Example:

```text
3 × 4 = ?
```

If the child struggles:

```text
● ● ● ●
● ● ● ●
● ● ● ●
```

Then, if needed:

```text
4 + 4 + 4
```

Then:

```text
4 → 8 → 12
```

The Fox Guide presents the support.

Hints should help the child understand rather than simply reveal the answer immediately.

---

# 24. Rewards

V1 resources:

```text
Materials
Coins
```

Materials are primarily used for building.

Coins are reserved for the longer-term cosmetic economy.

A complete cosmetic shop is not required in V1.

---

# 25. Learning Mastery Is Not Currency

Learning mastery must remain separate from:

```text
Materials
Coins
```

Do not make learning performance directly spendable.

Do not create a loop where children feel they must answer quickly or perfectly to avoid losing economic progress.

---

# 26. Building

V1 requires one primary building:

```text
Farm
```

Example requirement:

```text
15 Materials
10 Coins
```

Exact balancing may change during playtesting.

Building the Farm should:

```text
change Camp visually
bring Farmer into Camp
introduce rabbits/farm life
unlock Farming gameplay
help unlock the next adventure
```

---

# 27. Economy Philosophy

V1 must not require grinding.

Avoid:

```text
Farm requires 500 wood
repeat Slime battle 40 times
```

Prefer:

```text
complete Forest Adventure
help Farmer
collect expected adventure rewards
build Farm
```

Resources should support the reward fantasy rather than block learning progression.

---

# 28. Characters

V1 core characters:

```text
Hero
Fox Guide
Farmer
Forest Slime
Big Slime
```

Hero represents the child inside the world.

Fox Guide:

```text
teaches
offers hints
celebrates progress
supports tutorial
accompanies adventure
```

Farmer connects:

```text
NPC Quest
      ↓
Farm
      ↓
Farming gameplay
```

---

# 29. Monsters

V1 monsters should be:

```text
cute
friendly-looking
playful
non-frightening
```

Battle should feel fantasy/playful rather than violent.

No realistic violence.

---

# 30. Art Direction

V1 uses:

```text
Cozy Fantasy 2D
```

Key qualities:

```text
warm
soft
colorful
friendly
safe
magical
rounded
expressive
```

The final game should not look like an educational SaaS application.

See:

```text
docs/DESIGN_SYSTEM.md
```

---

# 31. Animation Priorities

V1 should prioritize animation where it improves game feel.

High-value examples:

```text
Hero movement
Fox reactions
Slime bounce
Hero attack
reward collection
resource fly-to-inventory
building construction
Farm appearing
simple ambient world movement
```

Do not spend early development time on complex cinematic animation.

---

# 32. Asset Scope

Initial core asset target:

### Characters

```text
Hero
Fox Guide
Farmer
```

### Monsters

```text
Forest Slime
Big Slime
```

### World

```text
Camp
Forest
Farm
```

### Objects

```text
Wood
Carrot
Plant
Coin
Chest
```

### UI

```text
answer controls
dialogue
resource indicators
basic progress feedback
```

Placeholder assets are acceptable during implementation.

---

# 33. Save Behavior

The game should autosave meaningful progress.

Examples:

```text
learning mastery updated
reward received
adventure progressed
adventure completed
Farm built
world changed
```

Reloading the page should restore the latest valid persistent state.

---

# 34. Debug Support

Development should provide a simple way to inspect:

```text
GameState
learning mastery
resources
world state
adventure state
```

Development tools should support:

```text
reset save
grant test resources
```

This is not part of the child-facing product.

---

# 35. Explicit MVP Non-Goals

Do NOT implement:

```text
Backend
Database
Authentication
Login
User accounts
Cloud save
Cross-device sync

Division learning content
Addition learning content
Subtraction learning content

Multiplayer
Leaderboard

Shop
Full cosmetic system
Pet system
Character equipment

Timer challenges
Elite monsters

Settlement
Village
Castle
Kingdom

Final Events
Dragon Attack
Dark Portal

Full parent dashboard

Large open world
Free-roaming movement

Complex inventory
Crafting system

Mobile native app

Runtime LLM / AI question generation
```

These may be considered in future versions.

---

# 36. MVP Success Criteria

The MVP should be tested against product outcomes, not feature count.

## Learning

After the tutorial, can the child understand the meaning of simple multiplication?

Can the child recognize the same fact when representation changes?

For example:

```text
3 × 2
```

to:

```text
●●
●●
●●
```

to a rabbit/carrot scenario.

---

## Gameplay

Does the child want to continue after defeating the Slime?

Does the child care about receiving resources?

Does building the Farm feel rewarding?

Does the child want to see what happens next?

---

## UX

Can the child understand what to click without constant adult guidance?

Are buttons and targets large enough?

Is there too much text?

Does the game feel like an adventure rather than a worksheet?

---

## Retention Signal

After the initial session, ask:

> Con có muốn chơi tiếp không?

This qualitative response is one of the most important early MVP signals.

---

# 37. MVP Completion Definition

The MVP is considered functionally complete when a player can:

```text
start a new game

complete the multiplication introduction

enter Camp

open the World Map

start Forest Adventure

complete Gathering

help the Farmer

battle Forest Slime

receive rewards

return to Camp

build the Farm

see Camp permanently change

unlock/play Deep Forest content

use Farming gameplay

battle Big Slime

complete the initial MVP journey

reload the browser

continue from saved progress
```

while the Learning Engine:

```text
records attempts

tracks fact + skill mastery

provides hints

adapts problem selection at a basic level

uses multiple representations
```

and the application remains:

```text
Vietnamese-only for players

frontend-only

localStorage-based

multiplication-only in content

operation-agnostic in architecture
```

---

# 38. Implementation Phases

Recommended implementation sequence:

```text
Phase 01
Foundation

Phase 02
Multiplication Tutorial

Phase 03
Camp + World Map

Phase 04
Forest Adventure + Gathering + NPC

Phase 05
Battle + Hint Integration

Phase 06
Rewards + Farm + Farming

Phase 07
Deep Forest + Big Slime + MVP Completion

Phase 08
Polish + Playtesting
```

Each phase should have its own specification and acceptance criteria.

Do not ask Codex to implement the complete MVP in one pass.
