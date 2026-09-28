# Mathoria — Visual Design

## 1. Purpose

This document defines the visual source of truth for player-facing Mathoria V1 experiences.

It translates the principles in `DESIGN_SYSTEM.md` into concrete visual direction that can be used by:

- designers;
- asset generation;
- Codex implementation;
- future gameplay phases.

This document does not define learning rules or game progression. Those remain owned by the relevant canonical specifications.

When implementing player-facing UI, read this document together with:

1. `docs/DESIGN_SYSTEM.md`
2. `docs/GAME_DESIGN.md`
3. `docs/LEARNING_SYSTEM.md`
4. the relevant phase specification
5. `docs/references/mathoria-visual-anchor.png`, when available

The visual anchor demonstrates the intended visual language. It is not a pixel-perfect screen specification.

---

## 2. Canonical Art Direction

The canonical Mathoria V1 art direction is:

**Cozy Storybook Fantasy 2D**

The experience should feel like a warm illustrated fantasy storybook that the child can enter and interact with.

Core qualities:

- cozy;
- magical;
- colorful;
- warm;
- safe;
- playful;
- soft;
- expressive;
- nature-rich;
- child-friendly.

Avoid visual directions that make Mathoria feel like:

- an educational dashboard;
- a school worksheet;
- an enterprise web application;
- a dark fantasy RPG;
- a realistic combat game;
- a neon mobile casino/reward game;
- a pixel-art game unless the canonical direction is intentionally changed later.

---

## 3. Visual Anchor

Canonical reference location:

`docs/references/mathoria-visual-anchor.png`

Use the visual anchor to understand:

- overall mood;
- environmental density;
- character proportions;
- warm palette direction;
- organic UI shapes;
- HUD style;
- dialogue presentation;
- friendly monster design;
- relationship between game world and interface.

Do not interpret the anchor as exact production layout.

In particular, example multiplication multiple-choice panels in the visual anchor demonstrate visual treatment only. They do **not** establish multiple choice as the default learning interaction.

Learning interactions must continue to follow `LEARNING_SYSTEM.md`.

---

## 4. Camera & World Perspective

Primary world perspective:

**2D 3/4 top-down**

The player should be able to see:

- ground/path layout;
- character faces and bodies;
- fronts and roofs of buildings;
- environmental props;
- interactive spaces.

The perspective should feel similar to an illustrated diorama.

Avoid:

- strict 90-degree strategy-game top-down;
- side-scrolling platformer framing for core world navigation;
- realistic 3D perspective;
- strong isometric geometry that makes interaction/navigation unnecessarily rigid.

Consistency matters more than mathematical perspective accuracy.

---

## 5. Composition

World scenes should prioritize the environment.

Recommended hierarchy:

`World → Characters → Interactive objects → HUD`

The HUD should support the scene rather than dominate it.

Use environmental composition to guide attention:

- paths;
- fences;
- trees;
- light;
- empty space;
- building placement;
- character placement.

Avoid filling every area with UI.

The child should be able to look at a screen and quickly understand where the important activity is.

---

## 6. Environment Style

Environments should use:

- rounded natural shapes;
- lush foliage;
- soft rocks;
- flowers;
- warm wood;
- winding paths;
- small environmental storytelling details;
- gentle depth through foreground/background overlap.

Trees and bushes should use clustered, readable shapes rather than realistic leaf detail.

Buildings should feel handmade and welcoming.

Useful material language:

- wood;
- canvas;
- stone;
- rope;
- paper;
- leaves;
- soil;
- warm lantern light.

Avoid sterile geometry and modern UI-like structures inside the world.

---

## 7. Camp — V1 Visual Heart

Camp is the central visual location of V1.

The initial Camp should feel:

- safe;
- warm;
- small;
- incomplete;
- full of potential.

Core initial elements:

- Hero;
- Fox Guide;
- tent;
- campfire or warm light source;
- forest edge;
- path toward adventure;
- clearly readable empty Farm/build area;
- a few useful props such as barrels, logs, signposts, lanterns, or crates.

Do not make the initial Camp look like a finished village.

The empty space is intentional. It communicates future growth.

---

## 8. Camp Transformation

Building the Farm must visibly change the Camp.

### Before

The Farm area should read as:

- empty soil;
- unused plot;
- simple fence markers or build sign;
- visually unfinished.

### After

The same area should clearly contain:

- Farm structure or cultivated plot;
- Farmer;
- crops/vegetation;
- small farm details;
- optional rabbits/animals where appropriate.

The transformation should be obvious without requiring explanatory text.

World growth is part of the reward.

---

## 9. Forest

The Forest should preserve the cozy visual language while feeling more adventurous than Camp.

Use:

- denser trees;
- winding paths;
- logs;
- mushrooms;
- berries;
- stones;
- streams;
- shafts of warm light;
- small magical accents.

The Forest should not feel threatening or dark.

Deep Forest may be visually richer and slightly more mysterious, but it must remain appropriate for young children.

---

## 10. Character Proportions

Primary characters use stylized chibi/storybook proportions.

Direction:

- relatively large head;
- small body;
- short limbs;
- readable hands/props;
- expressive face;
- strong silhouette.

Characters should remain readable at gameplay scale.

Avoid realistic human anatomy.

---

## 11. Hero

The V1 Hero is a friendly young fantasy adventurer.

Visual direction:

- child-like proportions;
- warm, approachable expression;
- simple adventure clothing;
- small backpack;
- boots;
- optional scarf/cape detail;
- magic staff.

The Hero should look adventurous without looking like a warrior.

### Magic Staff

Prefer a magic staff over a sword as the primary visual tool.

This supports the conceptual relationship:

`Math → Magic → World interaction`

The staff may use a soft blue/cyan magical glow as a recurring visual accent.

Avoid realistic weapons and aggressive combat presentation.

---

## 12. Hero Expressions

Useful V1 expressions/poses include:

- neutral;
- happy;
- thinking;
- surprised;
- celebrating;
- casting magic;
- walking/running;
- listening.

Do not require a large animation library before gameplay is validated.

---

## 13. Fox Guide

The Fox Guide is one of Mathoria's strongest visual identity elements.

Canonical direction:

- orange/golden fur;
- small rounded body;
- large ears;
- large fluffy tail;
- expressive face;
- friendly movement;
- magical glowing tail tip.

The Fox should immediately read as:

`friend + guide + magic`

not as a pet inventory item.

---

## 14. Fox Magic Signature

The glowing tail tip is a recurring visual motif.

It may become brighter when:

- presenting a hint;
- discovering something;
- reacting to learning progress;
- drawing attention to an object;
- celebrating success.

This creates a visual relationship between Fox guidance and learning support.

Do not use excessive particle effects.

---

## 15. Farmer

The Farmer should feel friendly and dependable.

Direction:

- rounded proportions;
- straw hat;
- simple overalls/work clothes;
- warm expression;
- readable silhouette.

The Farmer should visually belong to the Farm transformation.

Useful expressions:

- neutral;
- happy;
- concerned/thinking;
- celebrating.

---

## 16. Slimes

Slimes are friendly fantasy obstacles.

### Forest Slime

Direction:

- small;
- green;
- rounded;
- bouncy;
- simple face;
- curious/playful.

### Big Slime

The Big Slime should be:

- substantially larger;
- visually impressive through scale;
- still cute;
- slightly clumsy/funny;
- non-horrific.

Scale should create excitement, not fear.

Avoid:

- teeth-heavy monster design;
- gore;
- realistic damage;
- horror eyes;
- aggressive spikes.

---

## 17. UI Visual Language

Player-facing UI should feel constructed from the same world as the environment.

Preferred visual materials:

- warm cream paper;
- wood;
- soft brown borders;
- leaves;
- fabric/banner details;
- subtle golden accents.

Use:

- rounded panels;
- chunky buttons;
- large icons;
- soft shadows;
- generous spacing.

Avoid:

- flat enterprise cards;
- dense navigation bars;
- thin grey borders;
- tiny text;
- table-heavy layouts;
- dashboard grids.

---

## 18. HUD

The HUD should remain minimal.

V1 may display:

- Materials;
- Coins;
- context-specific navigation/actions.

Resource indicators should use icon + number.

Example conceptual pattern:

`[wood/material icon] 12    [coin icon] 5`

Do not permanently show information that is not needed during the current activity.

Avoid a complex RPG HUD.

---

## 19. Buttons

Buttons should be:

- large;
- rounded;
- clearly interactive;
- readable on touch;
- short in wording;
- visually separated from background.

Primary actions may use warm wood/brown or positive green treatment depending on context.

Examples:

- `Đi phiêu lưu`
- `Tiếp tục`
- `Xây nông trại`

Secondary/back actions should be visually quieter.

Buttons should have:

- default;
- hover where available;
- pressed;
- disabled;
- keyboard focus states.

Core usability must not depend on hover.

---

## 20. Dialogue Box

Dialogue should feel like a storybook conversation.

Recommended structure:

- character portrait or nearby character;
- optional name label;
- warm cream dialogue surface;
- soft brown/wood border;
- large readable Vietnamese text;
- obvious continue indicator.

Keep text short.

Prefer one or two short sentences per step.

Avoid large RPG dialogue walls.

---

## 21. Panels

Panels should be used selectively.

Useful cases:

- rewards;
- short focused learning interaction;
- build confirmation;
- simple settings;
- temporary inventory/context panel.

Panels should not replace the world as the primary screen.

---

## 22. Icons

Icons should use the same rounded illustrated language.

Core V1 examples:

- Materials;
- Coins;
- Map/Adventure;
- Backpack;
- Settings;
- Farm/seed;
- hint/magic where needed.

Icons should remain understandable at small size.

Avoid mixing unrelated icon libraries with visibly different line weights/styles in final production UI.

Temporary icons are acceptable during implementation.

---

## 23. Color Direction

Canonical palette direction:

### Environment

- forest green;
- leaf green;
- sage;
- warm earth brown;
- soil brown.

### Surfaces

- warm cream;
- parchment;
- light beige.

### Reward / Magic

- golden yellow;
- warm orange;
- cyan/sky-blue magic accent.

### Supporting accents

- terracotta;
- berry/red accent;
- soft sky blue.

Exact production hex values should be derived and frozen after implementation tests against the visual anchor.

Do not introduce many unrelated accent colors.

---

## 24. Color Semantics

Do not rely on color alone.

Examples:

Correct state should use more than green:

- positive motion;
- icon/check;
- character reaction;
- visual progress.

Locked state should use more than grey:

- lock icon;
- shape/state change;
- clear label where needed.

Wrong answers should not become harsh full-screen red states.

---

## 25. Typography

Typography has two roles.

### Display

Used for:

- Mathoria title;
- major event titles;
- important celebratory headings.

Direction:

- playful;
- rounded;
- storybook-like;
- readable.

### UI / Body

Used for:

- dialogue;
- instructions;
- buttons;
- learning prompts;
- labels.

Direction:

- rounded sans-serif;
- highly readable;
- generous size;
- strong Vietnamese glyph support.

Do not use decorative fantasy typography for body copy.

---

## 26. Vietnamese Typography

V1 is Vietnamese-first.

Production fonts must correctly support Vietnamese diacritics.

Test strings containing:

`ă â ê ô ơ ư đ á à ả ã ạ`

Also test realistic strings such as:

- `Đi phiêu lưu`
- `Xây nông trại`
- `Nguyên liệu thu được!`
- `Chúng ta thử lại nhé!`
- `Có 3 giỏ, mỗi giỏ có 4 quả.`

Do not approve a font based only on ASCII/English previews.

---

## 27. Learning UI Principle

Learning should appear as part of the game world.

The player should frequently reason with visible objects instead of only reading equations.

Preferred visual learning interactions include:

- equal groups of objects;
- baskets;
- berries;
- mushrooms;
- logs;
- rabbits/food;
- rows of crops;
- arrays;
- repeated addition;
- construction/manipulation.

The equation should connect to the visual meaning.

---

## 28. Multiple Choice

Multiple choice is allowed when appropriate but is not the default visual model for Mathoria learning.

Do not interpret visual concept examples such as:

`3 × 4 = ?`

with:

`10 / 12 / 14`

as the required gameplay structure.

A fact should appear through multiple representations and interaction patterns.

Follow `LEARNING_SYSTEM.md`.

---

## 29. Beginner Multiplication Presentation

For children new to multiplication, visual order should generally move from concrete meaning toward notation.

Example:

### Step 1 — Groups

Show:

`3 groups, each containing 2 objects`

### Step 2 — Repeated Addition

Show:

`2 + 2 + 2 = 6`

### Step 3 — Multiplication

Connect:

`3 × 2 = 6`

The visual design should make this connection understandable without a long explanation.

---

## 30. Learning Objects

Objects should be:

- large enough to count;
- clearly separated into groups;
- visually consistent;
- not overly detailed;
- easy to distinguish from decorative background elements.

Do not place learning objects on visually noisy backgrounds without sufficient separation.

When counting is important, clarity takes priority over environmental decoration.

---

## 31. Hint Presentation

Hints should visually connect to the Fox Guide.

Preferred sequence:

`Fox reacts → tail glows → visual representation appears → child retries`

Hints may use:

- equal groups;
- array;
- repeated addition;
- step-by-step highlighting.

Avoid instantly revealing the final answer unless stronger support is required.

---

## 32. Correct Answer Feedback

Correct answers should create satisfying in-world feedback.

Examples:

- Hero casts magic;
- resource is collected;
- crop grows;
- Slime reacts;
- Fox celebrates;
- object becomes repaired;
- world path opens.

Use UI confirmation only as support.

Avoid making every success only:

`Đúng!`

inside a modal.

---

## 33. Wrong Answer Feedback

Wrong answers should feel safe.

Use:

- gentle character reaction;
- Fox support;
- subtle animation;
- hint;
- alternative representation;
- retry.

Avoid:

- harsh buzzer;
- full-screen red;
- dramatic shaking;
- broken-heart/life-loss imagery;
- scary monster attack triggered by a beginner mistake.

---

## 34. Battle Visual Design

Battle should feel like playful magical problem-solving.

Recommended composition:

`Hero ← learning interaction → Slime`

Correct reasoning may trigger:

`Hero staff glow → magic projectile/effect → Slime bounce/reaction`

Slime HP may be used when useful, but battle UI should remain simple.

Avoid complex RPG stats.

---

## 35. Battle Damage

Combat is abstract/fantasy.

Use:

- bounce;
- squash;
- stars;
- magical spark;
- brief recoil.

Do not use:

- blood;
- wounds;
- realistic impact;
- violent weapon animation.

The child is overcoming an obstacle, not harming a realistic creature.

---

## 36. Gathering Visual Design

Gathering should connect math directly to resources in the environment.

Examples:

- groups of berries;
- bundles of logs;
- mushroom clusters;
- baskets.

Success can animate resources toward the Materials HUD.

This creates a visible relationship:

`understand → act → collect → build`

---

## 37. Farming Visual Design

Farming should be highly visual and tactile.

Use:

- soil plots;
- rows;
- seeds;
- crops;
- baskets;
- watering/growth reactions.

It is especially suitable for:

- arrays;
- equal groups;
- construction tasks.

The Farm should remain visibly part of the world.

---

## 38. World Map

The V1 world map should feel like an illustrated story map.

Use:

- Camp;
- Forest;
- Deep Forest;
- simple paths;
- clear locked/unlocked states;
- small landmark illustrations.

Avoid:

- dense RPG region maps;
- dozens of nodes;
- complex filters;
- map dashboards.

The map should communicate progression at a glance.

---

## 39. Reward Presentation

Rewards should feel celebratory but restrained.

Useful elements:

- resource icon;
- `+amount`;
- short character celebration;
- sparkle;
- resource movement;
- brief panel.

Example:

`Nguyên liệu thu được!`

`[Material] +3   [Coin] +2`

Avoid excessive reward explosions or casino-like presentation.

---

## 40. Motion Language

Canonical motion qualities:

- soft;
- bouncy;
- quick;
- readable;
- playful.

Useful techniques:

- squash and stretch;
- small bounce;
- gentle float;
- short scale pop;
- subtle glow;
- resource fly animation.

Avoid constant screen motion.

Animation should reinforce state change or personality.

---

## 41. Animation Priority

High-value V1 animations:

1. Fox reactions
2. Hero magic cast
3. Slime bounce/reaction
4. resource collection
5. Farm construction/transformation
6. simple character movement
7. learning-object feedback

Do not block V1 on large cinematic animation sets.

---

## 42. Screen Transitions

Transitions should be short.

Useful treatments:

- gentle fade;
- soft slide;
- map travel transition;
- leaf/light wipe if lightweight.

Avoid long loading-style animations when content is already ready.

---

## 43. Responsive Design

V1 is a web game.

Primary implementation may target desktop browser first.

However:

- primary actions should be touch-sized;
- layouts should tolerate narrower widths;
- UI should avoid hover-only interaction;
- learning objects must remain countable;
- text should not clip.

Do not solve responsive design by shrinking everything until it becomes unreadable.

Reflow panels when necessary.

---

## 44. Safe UI Areas

Keep persistent HUD away from:

- character faces;
- core learning objects;
- important world interaction zones.

Corner HUD placement is preferred when it does not conflict with gameplay.

Dialogue may occupy the lower portion of the screen but should preserve enough scene context to understand who is speaking.

---

## 45. Visual Density

Environment can be rich.

Learning interaction zones should be visually simpler.

When the child needs to:

- count;
- compare;
- select;
- construct;

reduce nearby decorative noise.

Clarity outranks decoration during learning.

---

## 46. Asset Strategy

Do not block implementation on final production assets.

Use three levels:

### Level 1 — Placeholder

CSS shapes, simple SVG, temporary icons.

### Level 2 — Visual Prototype

Generated/concept assets close to the canonical style.

### Level 3 — Production Asset

Clean consistent assets prepared for actual game use.

A concept sheet is not automatically a production sprite sheet.

---

## 47. Generated Art

Generated artwork may be used for exploration and prototypes.

Before treating generated art as production-ready, check:

- visual consistency;
- perspective;
- transparent/background requirements;
- pose consistency;
- character identity consistency;
- crop boundaries;
- resolution;
- Vietnamese text artifacts;
- UI text baked into images.

Avoid baking player-facing text into environment images.

Text should normally remain real HTML/UI text for accessibility and localization.

---

## 48. Asset Separation

Prefer separate assets for:

- environment/background;
- characters;
- interactive objects;
- UI frames;
- icons;
- effects.

Do not generate every complete screen as one flattened image and then attempt to build gameplay on top of it.

The visual anchor is a design reference, not a flattened production screen.

---

## 49. Implementation Guidance for Codex

When implementing a player-facing screen:

1. Read this document.
2. Inspect the visual anchor.
3. Read the relevant gameplay/learning spec.
4. Identify the main child action.
5. Build layout with placeholders if final assets do not exist.
6. Preserve the 3/4 cozy-world composition.
7. Keep UI minimal.
8. Keep Vietnamese text readable.
9. Do not invent unrelated visual systems.
10. Do not block functionality waiting for final art.

If implementation requires a visual decision not covered here, choose the smallest reversible solution consistent with the visual anchor.

---

## 50. CSS/UI Implementation Direction

Prefer lightweight web implementation.

Use:

- CSS;
- CSS Modules or the project's established styling approach;
- SVG where useful;
- semantic HTML for text/buttons.

Avoid adding a large UI framework solely to imitate the concept art.

UI components should be reusable where naturally useful, for example:

- `GameButton`
- `ResourceIndicator`
- `DialogueBox`
- `GamePanel`
- `AnswerOption`

Do not build a large generic design-system library before gameplay requires it.

---

## 51. Visual Acceptance Checklist

Before approving a player-facing screen, ask:

- Does it look like a cozy fantasy game rather than a web dashboard?
- Does it visually belong to the Mathoria anchor?
- Is the main child action obvious?
- Is the world still visually important?
- Is Vietnamese easy to read?
- Are controls large enough?
- Does the UI avoid hover dependency?
- Are learning objects easy to count/understand?
- Is the Fox used appropriately for guidance?
- Are mistakes visually safe?
- Are rewards satisfying without being excessive?
- Is decorative detail reduced when learning clarity requires it?
- Does the screen avoid introducing a new unrelated art style?

If several answers are no, revise before adding more polish.

---

## 52. V1 Visual Scope

V1 visual work should prioritize:

- Multiplication Tutorial;
- Camp;
- Hero;
- Fox Guide;
- Farmer;
- Forest;
- Deep Forest;
- Forest Slime;
- Big Slime;
- Farm;
- World Map;
- learning interactions;
- simple battle;
- gathering;
- farming;
- HUD;
- dialogue;
- reward feedback.

Do not prioritize:

- character creator;
- large cosmetic catalog;
- equipment;
- shops;
- elaborate castle/kingdom art;
- future operations;
- large monster roster;
- cinematic cutscenes.

---

## 53. Frozen Visual Decisions

Unless explicitly revised, treat the following as canonical for Mathoria V1:

```text
Art direction:
Cozy Storybook Fantasy 2D

Camera:
3/4 top-down

World mood:
warm + natural + magical + safe

Hero:
child adventurer + magic staff

Fox:
orange/golden magical guide + glowing tail tip

Monsters:
cute and non-frightening

Camp:
small/incomplete initially, visibly grows after Farm construction

UI:
rounded + organic + cream/wood/nature-inspired

Learning:
visual meaning before abstract notation

Combat:
playful magical interaction, non-violent presentation

Language:
Vietnamese

Typography:
storybook display + highly readable rounded UI/body font
```

---

## 54. Not Frozen Yet

The following should remain adjustable until implementation/playtesting provides evidence:

- exact hex palette;
- exact font families;
- exact sprite dimensions;
- exact HUD pixel placement;
- exact animation durations;
- exact border radius/shadow values;
- exact mobile breakpoint;
- exact character sprite resolution.

Do not prematurely turn exploratory values into architectural constraints.

---

## 55. Relationship to Phase 02

`PHASE_02_MULTIPLICATION_TUTORIAL.md` should be the first player-facing phase implemented against this visual foundation.

Phase 02 should validate:

- Vietnamese typography;
- Hero/Fox presentation;
- learning-object clarity;
- dialogue;
- visual groups;
- repeated addition;
- multiplication notation;
- supportive hint presentation;
- basic success feedback.

If Phase 02 reveals visual usability problems, update this document deliberately rather than allowing individual screens to drift.

---

## 56. Definition of Visual Success

Mathoria's visual direction is successful when a child can look at the game and feel:

- “I want to explore this place.”
- “These characters are friendly.”
- “I understand what I can touch/click.”
- “Math is something I do inside this world.”

The game should not visually communicate:

- “I opened a worksheet.”
- “I am taking a test.”
- “I am using a school dashboard.”

The world, characters, learning, and UI should feel like one coherent adventure.
