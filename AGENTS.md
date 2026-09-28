# Multiplication Adventure — Project Instructions

## Read before making changes
1. `docs/GAME_DESIGN.md`
2. `docs/LEARNING_SYSTEM.md`
3. `docs/DESIGN_SYSTEM.md`
4. `docs/MVP_SPEC.md`
5. The relevant phase specification under `docs/phases/`

## Product principles
- This should feel like a cozy adventure game, not a school dashboard or quiz app.
- The initial audience is children who are new to multiplication.
- Math should live inside the game world and have an in-world purpose.
- One math fact must appear through multiple representations so children do not learn by rote only.
- Wrong answers trigger support, visualization, and retry; avoid harsh punishment.
- Understanding comes before fluency and speed.
- Timed challenges are future progression, not part of the initial learning experience.
- World growth should visually reflect the player's progress.

## Extensibility rule
V1 teaches multiplication only, but the domain must not be hard-coded to multiplication.
Use generic concepts such as `MathOperation`, `MathProblem`, `Skill`, `Activity`, `LearningProgress`, and `Challenge`.
Future content may introduce division and mixed multiplication/division learning.

## MVP engineering direction
- React + TypeScript + Vite.
- Keep learning/content logic separate from presentation and gameplay components.
- Keep game content/data separate from reusable components.
- Use local persistence for the MVP; do not introduce a backend unless the specification changes.
- Prefer simple React/Motion interactions over a game engine for the first vertical slice.
- Do not implement features outside `docs/MVP_SPEC.md` without updating the specification first.
