# Mathoria — Agent Instructions

## 1. Project

**Mathoria** is a cozy educational adventure game for children.

Players learn mathematics through gameplay rather than through a traditional quiz interface.

The core gameplay loop is:

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

Mathoria V1 focuses exclusively on **multiplication**.

The architecture must allow additional math operations such as **division** in future versions without requiring gameplay systems to be rewritten.

---

# 2. Read Before Making Changes

Before implementing or modifying a feature, read:

1. `docs/GAME_DESIGN.md`
2. `docs/LEARNING_SYSTEM.md`
3. `docs/DESIGN_SYSTEM.md`
4. `docs/MVP_SPEC.md`
5. `docs/TECHNICAL_ARCHITECTURE.md`
6. the relevant file under `docs/phases/`

These documents are the source of truth for product and technical decisions.

Do not silently override them.

If implementation requires a conflicting architectural or product decision, update or clarify the specification first.

---

# 3. Product Principles

## Game first

Mathoria should feel like a game, not a digital worksheet.

Avoid interfaces that resemble:

```text
Question 4 / 10

3 × 4 = ?

A. 10
B. 12
C. 14
D. 16
```

when the same learning interaction can be presented naturally inside the game world.

Math should exist inside:

- Adventure
- Battle
- Gathering
- NPC quests
- Farming
- World interactions

---

## Understanding before memorization

Do not teach multiplication only through repeated symbolic calculations.

The same math fact should appear through different representations and skills.

Example:

```text
3 × 4 = 12
```

may appear as:

```text
CALCULATE
3 × 4 = ?

RECOGNIZE
● ● ● ●
● ● ● ●
● ● ● ●

APPLY
3 rabbits with 4 carrots each

CONSTRUCT
Create 3 groups of 4

MISSING FACTOR
? × 4 = 12
```

Follow the learning principles in `docs/LEARNING_SYSTEM.md`.

---

# 4. Wrong Answers

Wrong answers are learning opportunities, not failures.

Do not punish normal math mistakes with:

- lost lives;
- lost currency;
- harsh error sounds;
- negative language;
- forced restart.

Instead:

```text
wrong answer
     ↓
Fox Guide support
     ↓
visual hint
     ↓
alternative representation
     ↓
retry
```

The Hint/Learning system decides the support.

The Fox Guide presents that support to the player.

Do not put learning logic directly into the Fox Guide UI.

---

# 5. Math Operation Architecture

V1 supports:

```text
MULTIPLICATION
```

Future versions may support:

```text
DIVISION
ADDITION
SUBTRACTION
```

Do not create multiplication-specific gameplay architecture.

Avoid:

```text
MultiplicationBattle
MultiplicationQuestion
MultiplicationProgress
MultiplicationAdventure
```

Prefer:

```text
Battle
MathProblem
LearningProgress
Adventure
Activity
```

Gameplay must not need to know whether the Learning Engine selected multiplication or division.

---

# 6. Language

Mathoria V1 is a **Vietnamese-first product**.

Player-facing language in V1:

```text
Vietnamese (vi)
```

There is no language selector required in V1.

Do not implement English content unless explicitly requested.

However, do not hard-code player-facing Vietnamese strings throughout React components or domain logic.

Use localization keys and localized templates.

Example:

Avoid:

```tsx
<button>Tiếp tục</button>
```

Prefer:

```tsx
<button>{t("common.continue")}</button>
```

Game and learning domain logic must remain language-independent.

Math word problems must be generated from semantic problem data plus localized templates.

---

# 7. Vietnamese Tone

Player-facing Vietnamese should be:

- short;
- warm;
- friendly;
- encouraging;
- natural for young children;
- visually supported where possible.

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

---

# 8. Technical Stack

V1 uses:

```text
React
TypeScript
Vite
Zustand
localStorage
```

Use React local state for temporary interaction state.

Use Zustand for persistent/global game state.

Do not introduce major new frameworks without a clear requirement.

---

# 9. Frontend-Only V1

Mathoria V1 has no backend.

Do NOT implement:

```text
Node backend
REST API
GraphQL
Firebase backend
Supabase backend
database
authentication
user accounts
cloud save
cross-device synchronization
```

unless the product scope is explicitly changed.

All V1 progress is stored locally in the browser.

---

# 10. Persistence

V1 persistence:

```text
GameState
   ↓
GameRepository
   ↓
LocalStorageGameRepository
   ↓
localStorage
```

Do not call:

```ts
localStorage.setItem(...)
```

throughout arbitrary React components.

Persistence must go through the defined persistence boundary.

Persistent save data must contain a schema version.

A corrupted or outdated save must not permanently prevent the game from starting.

---

# 11. Content vs State

Keep static definitions separate from runtime player state.

Static content includes:

```text
Farm cost
Slime definition
Adventure nodes
NPC definitions
Building unlocks
Learning content configuration
```

Runtime state includes:

```text
Farm built
current resources
completed adventures
learning mastery
current adventure progress
```

Do not mutate static content definitions to represent player progress.

---

# 12. Learning Logic vs Gameplay

Gameplay requests learning problems.

Gameplay does not choose fixed multiplication facts unless a specification explicitly requires a fixed tutorial example.

Example:

```text
NPC Quest
   ↓
request APPLY problem
   ↓
Learning Engine
   ↓
select appropriate fact
   ↓
MathProblem
```

Avoid:

```text
NPC Quest
   ↓
hard-coded 3 × 2
```

The same principle applies to:

- Battle
- Gathering
- Farming

---

# 13. State Management

Persistent/global state may include:

```text
inventory
world progress
built buildings
adventure progress
learning mastery
settings
```

Temporary UI state should usually remain local:

```text
selected answer
hover state
attack animation
dialogue currently visible
hint panel visibility
temporary modal state
```

Do not put every interaction into Zustand.

---

# 14. Content-Driven Design

Adventures, monsters, buildings, NPCs, and activities should primarily be data-driven.

Adding a new Forest adventure should generally require new content definitions rather than a new adventure engine.

Adding a future math operation should generally require new learning content rather than rewriting Battle, NPC Quest, or Adventure.

---

# 15. Visual Direction

Mathoria uses:

```text
Cozy Fantasy 2D
```

The visual experience should feel:

- warm;
- playful;
- safe;
- magical;
- friendly.

Use:

- rounded shapes;
- large interaction targets;
- minimal text;
- expressive characters;
- friendly monsters;
- strong visual feedback;
- gentle motion.

Avoid:

- SaaS/dashboard visual language;
- dense menus;
- tiny controls;
- realistic violence;
- dark or frightening fantasy;
- excessive modal dialogs.

See `docs/DESIGN_SYSTEM.md`.

---

# 16. Child-Friendly UX

Assume the player is young and new to multiplication.

Prefer:

- click/tap interactions;
- large targets;
- limited choices;
- obvious visual hierarchy;
- progressive disclosure;
- forgiving interaction.

Do not require WASD or keyboard-heavy interaction for core V1 gameplay.

Do not rely on hover for required information.

---

# 17. MVP Scope Discipline

Do not implement features outside `docs/MVP_SPEC.md`.

In particular, do not proactively add:

```text
login
backend
shop
pets
leaderboard
multiplayer
timer
division content
Castle
Kingdom
parent dashboard
character equipment
complex inventory
```

Preparing a clean extension boundary is acceptable.

Implementing the future feature is not.

---

# 18. Avoid Premature Abstraction

Do not introduce:

```text
microservices
ECS
complex event bus
generic plugin framework
dependency injection framework
event sourcing
server infrastructure
LLM integration
runtime AI question generation
```

V1 is a small React web game.

Prefer straightforward TypeScript modules with clear boundaries.

---

# 19. Asset Strategy

Do not block implementation on final artwork.

Early phases may use:

- placeholders;
- CSS;
- SVG;
- temporary icons;
- simple shapes.

Workflow:

```text
functional prototype
      ↓
validate gameplay
      ↓
finalize assets
      ↓
replace placeholders
      ↓
polish
```

---

# 20. Debugging

Development tooling may expose:

```text
GameState
Learning mastery
Inventory
Adventure progress
Built buildings
Reset save
Grant resources
```

Developer/debug UI must not leak into the child-facing production experience.

---

# 21. Implementation Workflow

Implement Mathoria phase by phase.

Do not build the entire game from one prompt.

Expected flow:

```text
Phase specification
      ↓
Implement
      ↓
Run
      ↓
Test
      ↓
Review
      ↓
Fix
      ↓
Accept
      ↓
Next phase
```

Do not begin the next phase while the current phase's acceptance criteria remain unresolved unless explicitly instructed.

---

# 22. Primary Engineering Rule

When choosing between:

```text
a clever generalized architecture
```

and:

```text
a simple implementation with clean extension boundaries
```

choose the second.

Mathoria V1 must remain small, understandable, testable, and easy to change.
