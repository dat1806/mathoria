# Mathoria — Phase 03.5: Visual Integration

## 1. Purpose

Phase 03.5 replaces the prototype presentation of the existing Mathoria experience with the approved production visual direction.

This is a **presentation-layer integration pass**. Preserve the working Phase 01–03 gameplay, learning, progression, rewards, persistence, localization, and domain architecture.

Target:

**Cozy Storybook Fantasy 2D game world**

not:

**a web application decorated like a game**.

## 2. Why This Phase Exists

Phase 01–03 established the functional vertical slice:

**Tutorial → Forest → First Adventure → Rewards → Return to Camp**

The current UI still reads as a prototype because it relies heavily on flat CSS terrain, emoji/placeholder characters, mixed prop styles, oversized centered panels, website-like navigation, sparse environments, and math isolated inside modal-like cards.

Phase 03.5 fixes presentation before Phase 04 adds more world content.

## 3. Read Before Implementation

Read:

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
11. `docs/phases/PHASE_03_FIRST_ADVENTURE.md`
12. this document

Inspect all approved references under `docs/references/`.

### Primary Production Visual Reference

The primary production visual reference for Phase 03.5 is:

`docs/references/mathoria-visual-production-reference.png`

Use this reference as the main source of truth for:

- Camp visual composition and atmosphere;
- Hero character design and proportions;
- Fox character design and proportions;
- character pose and expression language;
- environment asset style;
- Camp object style;
- vegetation and prop style;
- Mầm and Slime visual direction;
- Materials and Coin icon style.

## 4. Visual North Star

Mathoria should feel like a child is looking into a small illustrated fantasy world.

Visual hierarchy:

**World → Characters → Interactive Objects → Contextual UI**

not:

**UI → Exercise → Decorative Background**

A screenshot should read as a cozy adventure game even when all text is ignored.

## 5. Core Principles

- **World first:** UI supports the world rather than covering it.
- **One art language:** characters, props, learning objects and icons belong to the same universe.
- **Learning inside the world:** math representations live in the scene where practical.
- **Readability first:** counted/grouped objects remain easy to distinguish.
- **Soft and friendly:** rounded forms, warm light, friendly expressions.
- **Persistent world presence:** dialogue and learning UI should not unnecessarily hide the environment.

## 6. Approved Art Direction

Use:

- Cozy Storybook Fantasy;
- colorful 2D illustrated/chibi assets;
- soft painterly shading;
- warm lighting;
- rounded silhouettes;
- gentle depth;
- natural environment composition;
- 3/4 top-down presentation where applicable.

Avoid:

- photorealism;
- pixel art;
- hard-edged SaaS illustration;
- realistic 3D rendering;
- emoji as production characters;
- mixed icon packs;
- dashboard visual language.

## 7. Reference Usage

References define art direction, proportions, atmosphere, density, composition and character friendliness.

They are **not** flattened backgrounds to insert directly into gameplay.

Compose the world from reusable assets and live UI.

## 8. Asset Architecture

Recommended:

```text
public/assets/
├── characters/
│   ├── hero/
│   ├── fox/
│   ├── mam/
│   └── slime/
├── environment/
│   ├── common/
│   ├── camp/
│   └── forest/
├── learning/
├── effects/
└── ui/
```

Follow an equivalent existing repository convention if present.

## 9. Production Asset Rules

Production sprites/props should normally be:

- transparent PNG or WebP;
- isolated;
- without labels;
- without embedded UI text;
- without full-scene backgrounds;
- consistently lit and scaled;
- sufficiently high resolution.

Do not embed Vietnamese instructions in raster assets.

## 10. Character Assets

Minimum states:

```text
hero/
├── idle
├── happy
└── magic

fox/
├── idle
├── happy
└── hint

mam/
├── idle
└── happy

slime/
├── idle
├── reaction
└── happy
```

Full walk-cycle sprite sheets are not required.

## 11. Character Consistency

Different poses of one character must preserve face, hair/fur, clothing, accessories, proportions, palette and rendering style.

Hero variants must clearly be the same child. Fox variants must clearly be the same Fox.

## 12. Character Direction

**Hero:** young friendly fantasy adventurer, backpack, magic staff/wand.

**Fox:** orange/golden guide, expressive tail, friendly face, magical hint state.

**Mầm:** retain the approved Phase 03 Forest NPC identity and keep visually distinct from the future Farmer.

**Slime:** green, rounded, glossy/soft, cute, expressive and non-threatening.

Replace emoji/placeholder character presentation.

## 13. Environment Vocabulary

Common assets should include useful variants of:

- trees;
- rocks;
- logs/stumps;
- grass;
- flowers;
- foliage clusters.

A small number of variants may be mirrored or modestly scaled. Avoid obvious copy-paste repetition and aggressive distortion.

## 14. Camp Requirements

Camp should support:

- tent;
- campfire;
- empty Farm plot;
- Farm sign;
- trees;
- rocks;
- logs/stumps;
- grass;
- flowers;
- natural path/terrain;
- foreground foliage.

**Do not build the Farm in Phase 03.5.**

## 15. Forest Requirements

Forest should support:

- forest trees/bushes;
- berry bush;
- mushrooms;
- carrots/rabbits where required;
- glowing tree;
- resource/log bundle;
- rocks;
- grass/flowers;
- Slime clearing.

Do not add Deep Forest content.

## 16. Learning Objects

Learning objects must be optimized for counting.

Requirements:

- clear silhouette;
- sufficient spacing;
- limited visual noise;
- predictable scale;
- contrast against terrain;
- no nearby decoration that can be mistaken for counted objects.

## 17. Resource Icons

Replace placeholder/emoji Materials and Coins with coherent storybook icons.

Do not change the resource system.

## 18. Scene Rendering Model

Use a lightweight layered DOM/CSS composition:

```text
Scene
├── BackgroundLayer
├── EnvironmentBackLayer
├── WorldObjectLayer
├── CharacterLayer
├── ForegroundLayer
└── UILayer
```

This is conceptual. Do not create framework abstractions merely to match these names.

## 19. Layer Responsibilities

**Background:** broad terrain, ground, path base. CSS is acceptable, but giant flat shapes must no longer define the whole visual identity.

**Environment Back:** distant trees, bushes, rocks, foliage framing.

**World Objects:** tent, campfire, Farm plot and encounter/learning objects.

**Characters:** Hero, Fox, Mầm, Slime.

**Foreground:** grass, flowers and foliage used sparingly for depth.

**UI:** HUD, dialogue, answers and feedback.

Foreground must never cover critical learning objects, faces or controls.

## 20. Camp Composition

Camp should read as one coherent place:

- tent/campfire form an established area;
- Hero/Fox occupy the navigable center;
- a natural path leads through the scene;
- empty Farm plot is a secondary focal point;
- trees/foliage frame edges;
- foreground vegetation creates depth.

The Farm plot must not occupy an implausibly large portion of the viewport.

Recommended focal hierarchy:

1. Hero + Fox / current interaction;
2. current objective;
3. Camp landmarks;
4. decoration.

## 21. Forest Composition

Forest is denser and more adventurous than Camp while remaining friendly.

Use layered tree clusters, winding clearings/paths, bushes, rocks/logs, flowers/grass and controlled magical accents.

Each encounter still needs a readable interaction zone.

## 22. Paths

Avoid giant straight polygons.

Use curves, gentle width variation, environmental edging and natural transitions.

Navigation can remain state-driven. No free-roaming engine is required.

## 23. HUD Redesign

Remove the website-navbar feeling.

Prefer:

- lightweight Mathoria identity where useful;
- floating resource chips;
- minimal location information;
- no large full-width dark header by default.

Resource chips should use production icons, readable numbers, cream/wood/natural frames, rounded shapes and soft shadows.

## 24. Dialogue Redesign

Normal dialogue should not use a large central modal.

Prefer lower-screen/contextual dialogue with the world still visible.

Support:

- speaker identity;
- short Vietnamese text;
- continue/action affordance.

Large centered panels are reserved for rare major transitions.

## 25. Learning Presentation

Separate representation from answer controls.

Prefer:

```text
World representation
        +
Contextual question/dialogue
        +
Answer controls
```

instead of a large modal containing everything.

### Equal Groups

Render actual world groups with visible spacing.

### Array

Render clearly aligned rows/columns in the scene.

### Word Problem

Show participating characters/objects in context.

### Repeated Addition

May appear as lightweight reinforcement after the world interaction.

Mathematical clarity always outranks visual realism.

## 26. Answer Controls

Answers remain real accessible HTML controls.

They must have:

- large touch targets;
- high readability;
- child-friendly styling;
- clear selected/pressed states;
- existing keyboard/accessibility behavior where applicable.

A bottom interaction tray or small contextual panel is preferred over a giant modal.

## 27. Tutorial Integration

Keep Phase 02 logic unchanged.

Adapt presentation so:

- Hero/Fox use production characters;
- learning objects appear in the scene;
- worksheet-like panels are reduced;
- reinforcement remains clear;
- progress remains understandable.

Do not rewrite tutorial content merely for visual polish.

## 28. Berry Grove

Show **3 groups of 2 berries** in the world before abstract notation.

Grouping must be unambiguous. Do not place decorative berries nearby.

## 29. Mushroom Path

Show **2 rows × 4 mushrooms** as a readable in-world array.

Decorative mushrooms must not make the array ambiguous.

## 30. Mầm Clearing

Mầm physically appears in the clearing.

Rabbits/carrots appear as contextual world objects.

The `APPLY` interaction should feel like helping Mầm, not opening an unrelated quiz.

Preserve the existing learning problem/evaluation.

## 31. Glowing Tree

Emphasize curiosity through glow, particles, gentle motion and environmental focus.

Do not add math or a fake exercise panel.

Coin discovery should feel like an exploration reward.

## 32. Slime Battle

Composition visibly includes Hero, Fox, Slime, current learning representation and feedback.

Conceptually:

```text
Hero + Fox          Slime
      \              /
       learning space

       answer controls
```

Correct:

1. feedback;
2. Hero magic state;
3. magical effect;
4. Slime friendly reaction;
5. next round.

Wrong:

1. gentle feedback;
2. Fox hint state;
3. clearer representation;
4. retry.

Do not add HP, damage numbers, lives or combat stats.

## 33. Animation

Use subtle animation:

- Fox tail glow;
- Slime idle bounce;
- campfire flicker;
- foliage sway;
- sparkles;
- resource collection;
- Hero magic;
- dialogue entrance;
- soft hover/press.

Avoid constant large motion and anything that makes counting harder.

Respect reduced-motion preferences where practical. Core progression must not depend on animation completion.

## 34. Depth, Shadows and Scale

Use consistent soft grounding shadows, asset overlap, foreground framing and relative scale.

Practical hierarchy:

- Hero/Fox establish character scale;
- tent and trees are clearly larger;
- Farm plot is usable but not gigantic;
- rocks/logs are plausible;
- learning objects may be slightly exaggerated for readability.

Fix the prototype's mismatched object scales.

## 35. Responsive Layout

Primary MVP target remains desktop/laptop unless canonical specs say otherwise.

Ensure:

- important characters remain visible;
- HUD does not overlap dialogue;
- answers remain reachable;
- arrays/groups remain readable;
- interaction area survives common viewport sizes.

Avoid positioning tied to one screenshot.

## 36. Asset Positioning

Avoid unexplained pixel constants scattered through components.

Prefer scene-level positioning data, CSS variables, or clear scene classes.

Do not build a level editor or tile engine.

## 37. CSS and HTML Responsibilities

CSS is appropriate for layout, terrain base, responsive positioning, UI surfaces, shadows, transitions and simple effects.

CSS should not imitate production characters/environment illustration.

Keep real HTML for text, buttons, answer choices, dialogue, HUD values and accessibility semantics.

Do not rasterize UI text.

## 38. Reusable Components

Extract visual components only where actual reuse is demonstrated.

Potential examples:

- `GameScene`;
- `CharacterSprite`;
- `ResourceHud`;
- `DialogueBox`;
- `AnswerTray`;
- `WorldObject`.

Do not create a large visual framework for hypothetical future content.

## 39. Existing Logic Must Remain Stable

Do not change the meaning of:

- `MathProblem`;
- `LearningSkill`;
- `ProblemType`;
- `ProblemRepresentation`;
- semantic evaluation;
- `LearningAttempt`;
- mastery;
- encounter progression;
- rewards;
- battle completion;
- persistence.

Presentation consumes these systems; it does not replace them.

## 40. Persistence and Rewards

Do not persist transient visual state such as animation frames, hover, particles or dialogue entrance animation.

A visual-only pass should normally require no save migration.

Visual collection animation must never become the source of reward granting. Existing domain/store actions remain authoritative and idempotent.

## 41. Localization

All player-facing V1 copy remains Vietnamese through the existing i18n layer.

Do not embed Vietnamese text in scene images or add English production copy.

## 42. Accessibility

Preserve or improve:

- semantic buttons;
- keyboard behavior where supported;
- readable contrast;
- visible focus;
- large child-friendly targets.

Do not replace accessible controls with unlabelled click-only image regions.

## 43. Performance

Optimize assets reasonably.

Avoid:

- huge reference images as scene backgrounds;
- unnecessary 4K sprites for tiny props;
- duplicate source files;
- uncontrolled particles.

Do not over-engineer asset infrastructure.

## 44. Visual QA Is Required

Passing tests/build is not sufficient.

Capture screenshots from the running app for at least:

1. Camp normal state;
2. Camp dialogue;
3. tutorial/learning interaction;
4. Berry Grove;
5. Mushroom Path;
6. Mầm Clearing;
7. Glowing Tree;
8. Slime battle;
9. Return-to-Camp state.

For every screenshot ask:

- Does it look like a game before reading text?
- Is the world dominant?
- Are assets stylistically coherent?
- Are Hero/Fox properly scaled?
- Is the objective visually obvious?
- Is the learning representation easy to count?
- Does UI cover too much?
- Is any production element still emoji/prototype art?
- Does anything look like a SaaS/dashboard component?
- Does decoration help rather than hurt learning?

## 45. Camp Acceptance Criteria

- [ ] Camp reads as a cozy illustrated game world.
- [ ] Hero/Fox use production-style art.
- [ ] Emoji Hero/Fox are removed.
- [ ] Tent/environment/Farm plot share one art language.
- [ ] Farm plot has plausible scale.
- [ ] Path appears natural.
- [ ] Layered vegetation creates depth.
- [ ] HUD no longer resembles a full-width website navbar.
- [ ] Resources use coherent icons.
- [ ] Normal dialogue preserves world visibility.
- [ ] Empty Farm plot remains empty.

## 46. Tutorial Acceptance Criteria

- [ ] Existing tutorial behavior is preserved.
- [ ] Learning representation integrates with the scene.
- [ ] Hero/Fox remain visible where appropriate.
- [ ] Answer controls remain clear.
- [ ] Worksheet-like modal presentation is reduced.
- [ ] Feedback remains understandable.
- [ ] Mastery/attempt behavior is unchanged.

## 47. Forest Acceptance Criteria

- [ ] Forest differs from Camp while sharing the same art language.
- [ ] Environment is denser but friendly.
- [ ] Encounter zones remain readable.
- [ ] Berry groups are unambiguous.
- [ ] Mushroom array is unambiguous.
- [ ] Mầm is visibly present.
- [ ] Glowing Tree feels exploratory/magical.
- [ ] Slime is friendly and coherent.
- [ ] Decoration does not interfere with counting.

## 48. Learning UI Acceptance Criteria

- [ ] Math representation is in-world where practical.
- [ ] Answer controls remain accessible UI.
- [ ] Normal learning does not default to a giant central modal.
- [ ] Vietnamese remains live UI text.
- [ ] Wrong-answer hint flow remains intact.
- [ ] Fox hint state is clear.
- [ ] Reinforcement remains readable.
- [ ] No score/accuracy screen is introduced.

## 49. Battle Acceptance Criteria

- [ ] Hero, Fox and Slime are visible scene participants.
- [ ] Hero magic uses approved visual language.
- [ ] Fox hint state appears after incorrect answers.
- [ ] Slime reaction is friendly/non-violent.
- [ ] Learning representation remains clear.
- [ ] No HP/lives/damage numbers.
- [ ] Existing battle progression is unchanged.

## 50. Architecture Acceptance Criteria

- [ ] Existing learning architecture is reused.
- [ ] Existing adventure progression is reused.
- [ ] Existing reward/idempotency behavior is reused.
- [ ] Existing persistence remains valid.
- [ ] Visual animation does not grant rewards.
- [ ] No game engine is introduced.
- [ ] No generic tilemap/level-editor framework.
- [ ] No generic quest/combat framework.
- [ ] Visual components are extracted only where justified.

## 51. Scope Guard

Do NOT implement:

- Farm construction;
- farming gameplay;
- Farmer NPC;
- Phase 04 progression;
- Deep Forest;
- Big Slime;
- new math operations/division;
- shops;
- equipment;
- crafting;
- XP/levels;
- backend/auth/cloud saves;
- free-roaming movement engine;
- generic tilemap engine.

This is a visual integration phase.

## 52. Implementation Order

### Step 1 — Asset Foundation

Integrate approved Hero/Fox assets, Camp props and resource icons.

### Step 2 — Camp Scene

Rebuild Camp composition, replace placeholders, improve terrain/path, HUD and dialogue.

### Step 3 — Learning Presentation

Create contextual answer presentation and move visual representations into the scene where practical.

### Step 4 — Tutorial Integration

Apply the new presentation to Phase 02 without changing learning behavior.

### Step 5 — Forest Assets

Integrate Mầm, Slime and Forest props.

### Step 6 — Phase 03 Encounters

Update Berry Grove, Mushroom Path, Mầm Clearing, Glowing Tree, Slime battle and Return to Camp.

### Step 7 — Polish

Animation, responsive behavior, consistency, accessibility and performance.

### Step 8 — Screenshot QA

Capture and review all required states.

Do not proceed to Phase 04 until accepted.

## 53. First Implementation Milestone — Camp Only

Do **not** rebuild the entire game before visual review.

Milestone 1 demonstrates only:

- production Hero;
- production Fox;
- production Camp props;
- layered Camp scene;
- improved path/terrain;
- floating resource HUD;
- bottom/contextual dialogue;
- no large default central modal.

Then capture screenshots.

If Camp does not meet the visual target, fix the visual system before applying it to Forest.

## 54. Asset Availability Rule

Do not substitute emoji or unrelated icon-pack art when a required production asset is missing.

If an asset is unavailable:

1. use a documented temporary placeholder only when necessary;
2. report it explicitly;
3. do not claim visual acceptance for that scene.

Do not silently recreate production artwork with arbitrary CSS shapes.

## 55. Automated Verification

Existing tests must continue to pass:

```bash
npm run test
npm run build
```

If lint exists:

```bash
npm run lint
```

Do not delete meaningful tests.

Avoid brittle decorative snapshot tests.

## 56. Regression Verification

Manually verify:

- Phase 02 tutorial completes;
- Forest unlock works;
- First Adventure starts;
- Phase 03 encounters progress;
- wrong answers retry safely;
- attempts/mastery still update;
- rewards grant once;
- reload/resume works;
- Slime battle completes;
- return to Camp completes Phase 03.

## 57. Definition of Done

Phase 03.5 is done when:

1. Camp and Forest read as one cozy illustrated world;
2. Hero, Fox, Mầm and Slime use coherent production-style art;
3. production gameplay no longer relies on emoji characters;
4. world dominates rather than large UI panels;
5. learning representations connect to the environment;
6. answer controls remain readable/accessibile;
7. dialogue preserves world visibility;
8. Phase 01–03 logic still works;
9. tests/build pass;
10. required screenshots are reviewed and accepted.

Target feeling:

**“I am inside Mathoria, and math helps me interact with this world.”**

not:

**“I am answering questions on a webpage with a game background.”**

## 58. Expected Codex Completion Report

Report:

1. Summary of visual changes
2. Files/modules changed
3. Production assets integrated
4. Remaining placeholders
5. Scene/component architecture
6. Camp composition changes
7. Forest composition changes
8. Learning presentation changes
9. Dialogue/HUD changes
10. Animation changes
11. Accessibility considerations
12. Performance considerations
13. Regression verification
14. `npm run test` result
15. `npm run build` result
16. `npm run lint` result if available
17. Screenshot paths for required QA states
18. Known visual gaps
19. Deviations from this spec

Do not claim visual completion without screenshot verification.

## 59. Next Phase

Only after Phase 03.5 is visually accepted:

**Phase 04 — Farm Construction / First World Upgrade**

Phase 04 must build on the stable production visual language rather than extending the prototype presentation.
