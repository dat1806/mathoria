# Mathoria — Game Design Document

## 1. Vision

Mathoria is a cozy 2D fantasy educational adventure game where children learn mathematics through exploration, helping characters, gathering resources, battles, farming, and building a growing world.

The child should feel that they are going on an adventure and building a home. Mathematics is the power used to interact with that world rather than a separate worksheet layer.

Mathoria V1 focuses on multiplication. The broader Mathoria world is designed to support additional math operations later, with division as the first planned extension.

## 2. Target Player

- Children beginning to learn multiplication.
- Initial experience assumes little or no familiarity with the multiplication sign.
- The game favors short interactions, visual explanation, minimal text, large targets, and gentle feedback.
- V1 player-facing content is Vietnamese.

## 3. Core Fantasy

The player arrives in an undeveloped fantasy land with a small companion/guide. By exploring, helping new friends, overcoming friendly monsters, and solving mathematical situations, the player gathers what is needed to grow the land from a camp into a kingdom.

The long-term fantasy is larger than multiplication: as the world grows, future math operations can become new ways to interact with the same world and gameplay systems.

## 4. Player & Companion

### Hero

The child controls a customizable fantasy hero conceptually representing themselves in the adventure.

### Fox Guide

A cute fox-like fantasy companion accompanies the hero. The Fox Guide:

- introduces mechanics;
- gives learning hints;
- reacts to success;
- explains mistakes visually;
- supports the story without long tutorials.

The Fox Guide presents learning support but does not own learning logic. Learning decisions belong to the Learning Engine.

## 5. Core Loop

`Learn → Adventure → Activity → Reward → Return Home → Build → World Changes → New Adventure`

Short loop: solve an in-world problem and receive immediate visual feedback/reward.

Long loop: adventures provide progress and materials that permanently change the player's world and unlock new activities.

The game should feel like an adventure and world-building game, not a quiz application with a fantasy skin.

## 6. V1 Gameplay Activities

### Monster Battle

Math powers attacks. Friendly monsters are obstacles rather than frightening enemies. Correct reasoning advances combat; mistakes lead to support and retry rather than severe punishment.

### Gathering

The child identifies groups, quantities, expressions, or other mathematical representations while collecting wood, food, or resources.

### NPC Quest

Characters present simple contextual problems such as feeding animals, preparing supplies, or repairing objects. Helping NPCs can connect them to the Camp and unlock world progression.

### Farming

The child creates or reasons about equal rows/groups by planting, feeding, or harvesting. This supports constructing multiplication rather than only selecting an answer.

### Future Activities

The following are future scope, not V1 requirements:

- Exploration challenges
- Puzzle/Treasure challenges
- Timed challenges

Timed play should appear only after understanding and fluency are established.

## 7. One Fact, Many Experiences

Example `3 × 4 = 12` can appear as:

- Battle: calculate `3 × 4`.
- Gathering: recognize groups or choose the matching expression.
- NPC Quest: 3 animals need 4 items each.
- Farming: construct 3 rows of 4.
- Later challenge: `? × 4 = 12`.

This is a foundational design rule.

The same mathematical idea should appear through multiple learning skills and representations so children build understanding instead of relying only on memorization.

## 8. Learning and Gameplay Separation

Gameplay systems request appropriate learning problems from the Learning Engine.

Battle, Gathering, NPC Quest, and Farming should not contain multiplication-specific architecture or hard-coded question banks as part of their gameplay logic.

`Gameplay Activity → Learning Engine → MathProblem`

V1 enables multiplication content. Future operations such as division should be able to use the same gameplay systems.

## 9. World Progression

Long-term direction:

1. Camp
2. Settlement
3. Village
4. Castle
5. Kingdom

Buildings unlock gameplay rather than serving only as decoration.

Long-term examples:

- Farm → farming activities
- Workshop → building/crafting-related interactions
- Magic Tower → puzzle activities
- Training Ground → advanced battle
- Arena → future timed challenges

World progression is driven primarily by adventures, quests, and learning progress. Resources support the fantasy but should not create grind.

### V1 World Scope

V1 focuses on:

- Camp as the home world;
- Forest and Deep Forest as early adventure content;
- Farm as the first meaningful building/world transformation.

Settlement, Village, Castle, and Kingdom are future scope.

## 10. Stage Final Events

Each major world stage can eventually end with a story event that reviews content from that stage before progression.

Long-term concepts include:

- Camp → Monster Raid
- Settlement → Great Storm
- Village → Magical Forest Crisis
- Castle → Dragon Attack
- Kingdom → Dark Portal

Final events should remix previously learned skills rather than introduce new concepts. Failure should lead to contextual support/remediation rather than a blunt fail screen.

The complete stage-event system is future scope. The Big Slime serves as a small climax for the V1 journey, not as the full long-term Final Event system.

## 11. Economy Direction

V1 uses:

- Materials → construction/world growth
- Coins → longer-term cosmetic/decorative economy
- Learning Mastery → separate learning state, never a spendable currency

Avoid grind. Important buildings should also require story/adventure milestones, not just large resource totals.

Learning mistakes must not threaten the child's economic or world progress.

## 12. Wrong-Answer Philosophy

Wrong answers are learning opportunities.

Do not use normal beginner mistakes to:

- remove lives;
- remove coins/materials;
- restart an entire adventure;
- show harsh failure messaging.

Preferred flow:

`Wrong answer → Fox Guide support → visual/alternative representation → retry`

## 13. V1 Journey

The canonical V1 journey is:

`Multiplication Tutorial → Camp → Forest Adventure → Gathering → Farmer NPC Quest → Forest Slime Battle → Reward → Return to Camp → Build Farm → Deep Forest → Farming → Big Slime → MVP completion`

This journey should demonstrate the complete Mathoria loop: learn, adventure, earn, build, and see the world change.

## 14. Future Math Expansion

V1 playable learning content is multiplication-only.

The game world and activity system should later support division without rebuilding the game. Division should be introduced as an inverse/related operation to multiplication through sharing and grouping experiences.

Potential later operations may include addition and subtraction, but they are not part of V1.

Future math support is an architectural direction, not permission to implement future content during the MVP.
