# Mathoria — Design System

## 1. Design Direction

Canonical visual direction:

`Cozy Fantasy 2D`

Mathoria should feel:

- warm;
- playful;
- safe;
- magical;
- colorful;
- soft;
- friendly;
- expressive.

The experience should look like a children's adventure game, not an educational SaaS dashboard.

## 2. Target UX

The primary player is a young child beginning to learn multiplication.

Design for:

- simple choices;
- obvious visual hierarchy;
- large interaction targets;
- short text;
- forgiving interactions;
- visual explanation;
- click/tap first;
- minimal dependence on reading.

Do not assume desktop productivity-app behavior.

## 3. V1 Language

All player-facing V1 content is Vietnamese.

There is no language selector required in V1.

The UI should nevertheless use localization keys/templates so future languages can be added without redesigning components.

## 4. Vietnamese Typography Requirements

Typography must render Vietnamese diacritics correctly.

Choose fonts with complete Vietnamese character support.

Test common Vietnamese strings containing characters such as:

`ă â ê ô ơ ư đ á à ả ã ạ`

Do not choose a decorative display font unless its Vietnamese glyph coverage has been verified.

Vietnamese text may be longer than short English UI labels. Components should allow reasonable text expansion instead of relying on fixed-width text boxes.

Avoid uppercase-heavy body text because it reduces readability for young children.

## 5. Player-Facing Tone

Vietnamese copy should be:

- short;
- natural;
- friendly;
- encouraging;
- playful;
- easy for children to understand.

Avoid formal software language.

Avoid:

`Đáp án không chính xác. Vui lòng thử lại.`

Prefer:

`Gần đúng rồi! Mình thử lại nhé.`

Avoid:

`Nhiệm vụ đã được hoàn thành thành công.`

Prefer:

`Tuyệt! Chúng ta làm được rồi!`

## 6. Layout Principles

Prefer a game-scene-first layout.

The world should occupy most of the visual experience.

UI should appear around or within the world only when needed.

Avoid permanent dashboard-like sidebars.

Use progressive disclosure for secondary actions.

Keep the number of simultaneous choices small.

## 7. Interaction Targets

Buttons and interactive world objects must be easy to select with mouse or touch.

Use:

- large targets;
- generous spacing;
- clear active/disabled states;
- visible focus states where keyboard navigation is supported.

Do not require precise clicking.

Do not make core information available only on hover.

## 8. Navigation

Core V1 interaction should be click/tap driven.

Do not require WASD or keyboard-heavy navigation.

Where practical, world objects should act as navigation.

Examples:

- Adventure path/map → start adventure
- Farm → enter farming activity
- character/NPC → dialogue or quest
- building spot → construction interaction

Avoid turning Camp into a menu screen containing `Home / Learn / Practice / Progress`.

## 9. Visual Shapes

Prefer:

- rounded cards;
- soft corners;
- organic world shapes;
- chunky buttons;
- friendly silhouettes.

Avoid:

- sharp enterprise UI;
- dense tables;
- thin tiny controls;
- overly technical visual language.

## 10. Color Direction

Use a warm, nature-inspired cozy-fantasy palette.

The final palette should support:

- clear contrast;
- readable text;
- distinct interactive states;
- safe/friendly atmosphere.

Do not rely on color alone to communicate correctness, state, or progress.

Specific production colors may be finalized during visual implementation/playtesting rather than frozen prematurely in the spec.

## 11. Characters

Characters should have:

- readable silhouettes;
- expressive faces/poses;
- friendly proportions;
- clear reactions.

Core V1 cast:

- Hero
- Fox Guide
- Farmer
- Forest Slime
- Big Slime

Monsters should look playful and non-frightening.

Avoid realistic violence or horror imagery.

## 12. Fox Guide Presentation

The Fox Guide is a recurring companion and learning-support presenter.

Use the Fox for:

- tutorial guidance;
- hints;
- encouragement;
- reactions;
- short contextual explanations.

Avoid long blocks of dialogue.

The Fox UI should present learning feedback supplied by the Learning Engine rather than contain learning logic itself.

## 13. Learning UI

Math interactions should feel integrated into the current activity.

Prefer:

- objects in the scene;
- cards with large visual groups;
- arrays;
- draggable/selectable objects when appropriate;
- large answer options;
- short prompts.

Avoid defaulting to a school-test layout such as:

```text
Question 4 / 10
3 × 4 = ?
A. 10
B. 12
C. 14
D. 16
```

when the same concept can be expressed naturally inside the game.

## 14. Wrong-Answer Feedback

Wrong-answer feedback must remain gentle.

Use:

- Fox reaction;
- small supportive motion;
- alternative visual representation;
- hint;
- retry.

Avoid:

- red full-screen failure states;
- harsh buzzer sounds;
- shaking/error effects that feel punitive;
- loss-of-life presentation for normal learning mistakes.

Correct answers should create satisfying in-world feedback rather than only displaying `Correct!`.

## 15. Battle Presentation

Battle should be playful fantasy.

Correct answer may trigger:

- Hero attack animation;
- magic effect;
- Slime reaction;
- enemy HP reduction.

Incorrect answer should pause progression and offer support/retry.

Do not visually punish the child for a math mistake.

## 16. Gathering Presentation

Gathering should connect the mathematical structure to visible objects.

Example: logs, berries, mushrooms, or other resources arranged into equal groups.

After success, resources can animate toward the inventory/resource indicator.

This should communicate the reward without requiring large amounts of explanatory text.

## 17. Farming Presentation

Farming should be tactile and visual.

Useful interactions include:

- choose equal rows;
- place seeds;
- group objects;
- identify an array;
- select a matching arrangement.

The Farm should feel like part of the world, not a standalone worksheet page.

## 18. Camp

Camp is the visual heart of V1.

Initial Camp should feel intentionally small and incomplete.

After the Farm is built, the scene should visibly change.

Before:

- tent;
- Hero;
- Fox;
- open/empty build space.

After:

- tent;
- Farm;
- Farmer;
- rabbits/farm details;
- Hero;
- Fox.

The transformation should be obvious enough for the child to feel that their actions changed the world.

## 19. World Map

V1 map is small and readable.

Conceptually:

```text
Deep Forest 🔒
      │
Forest
      │
Camp
```

Unlocked/completed states must be understandable without depending only on color.

Avoid a large complex RPG map in V1.

## 20. Dialogue

Dialogue should be brief.

Prefer one or two short sentences at a time.

Support text with:

- character portrait/reaction;
- icon;
- scene context;
- animation.

Provide a large obvious continue action.

Vietnamese copy must be tested in the actual dialogue container rather than assuming English-sized text.

## 21. Animation

Animation should reinforce game feel and comprehension.

High-value V1 animation:

- Hero movement between nodes;
- Fox reactions;
- Slime bounce;
- Hero attack;
- reward collection;
- resource fly-to-inventory;
- building construction;
- Farm appearing;
- simple ambient motion.

Keep motion short and readable.

Do not block interaction with unnecessarily long animations.

## 22. Accessibility and Readability

Do not rely only on:

- color;
- tiny icons;
- hover;
- sound.

Text must maintain readable contrast.

Important actions should have both visual shape/position and text/icon cues where appropriate.

Avoid overly small type.

Respect reduced-motion preferences where practical.

## 23. Responsive Direction

V1 is a web game.

Desktop browser is acceptable as the primary development target, but layouts should avoid assumptions that make touch/responsive support unnecessarily difficult.

Core interactions should remain compatible with click/tap.

Do not create native-mobile-specific architecture in V1.

## 24. Placeholder Asset Strategy

Implementation must not wait for final art.

Early phases may use:

- CSS shapes;
- SVG;
- temporary icons;
- placeholder sprites;
- simple backgrounds.

Placeholders should preserve intended scale, interaction hierarchy, and approximate composition.

Final artwork can replace placeholders after gameplay is validated.

## 25. UI Components

Reusable UI may include:

- game button;
- dialogue panel;
- answer option;
- resource indicator;
- progress indicator;
- world-map node;
- hint panel;
- simple modal/panel where necessary.

Do not create a large enterprise-style component library before gameplay needs it.

## 26. Modal Usage

Avoid excessive modal dialogs.

Prefer in-world or scene-attached interaction where possible.

Use a modal/panel when it clearly improves focus, such as:

- a short build confirmation;
- settings;
- a focused learning interaction that cannot fit naturally into the scene.

## 27. V1 Visual Non-Goals

Do not spend V1 scope on:

- complex character creator;
- large inventory UI;
- equipment screens;
- shop UI;
- leaderboard;
- parent dashboard;
- elaborate RPG HUD;
- large world map;
- dark cinematic effects.

## 28. Design Acceptance Principles

A V1 screen should pass these questions:

1. Does this look more like a game than a learning dashboard?
2. Can a young child identify the main action quickly?
3. Is the amount of text small enough?
4. Does Vietnamese render naturally without clipping?
5. Are important targets large and touch-friendly?
6. Is the interaction understandable without hover?
7. Does feedback feel encouraging rather than punitive?
8. Does the screen fit the Cozy Fantasy 2D direction?

If several answers are no, revise the design before adding more visual complexity.
