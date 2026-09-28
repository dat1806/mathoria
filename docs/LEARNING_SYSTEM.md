# Mathoria — Learning System

## 1. Purpose

Mathoria teaches mathematics through gameplay rather than separating learning into a traditional quiz mode.

V1 focuses on multiplication for children who are just beginning to understand the concept.

The system must prioritize conceptual understanding before memorization and fluency.

## 2. V1 Learning Scope

Enabled operation:

`MULTIPLICATION`

Future operations may include:

- `DIVISION`
- `ADDITION`
- `SUBTRACTION`

Division is the first planned extension, but division content is not part of V1.

Learning concepts and domain models should remain operation-agnostic where practical.

## 3. Core Learning Principle

Children should encounter the same mathematical fact in multiple ways.

Example:

`3 × 4 = 12`

can be learned through:

- symbolic calculation;
- equal groups;
- arrays;
- repeated addition;
- word problems;
- construction/manipulation;
- missing-factor reasoning.

The goal is understanding, not only memorizing an answer.

## 4. Canonical Learning Skills

Mathoria uses the following canonical learning skills:

- `RECOGNIZE`
- `CALCULATE`
- `APPLY`
- `CONSTRUCT`
- `MISSING_FACTOR`
- `FLUENCY`

### RECOGNIZE

Recognize a mathematical relationship from a visual representation.

Example: see 3 equal groups of 4 objects and identify `3 × 4`.

### CALCULATE

Given a symbolic expression, determine the result.

Example: `3 × 4 = ?`

### APPLY

Use mathematics inside a contextual or word problem.

Example: 3 rabbits need 4 carrots each. How many carrots are needed?

### CONSTRUCT

Create or choose a visual arrangement that represents a mathematical fact.

Example: create 3 equal rows with 4 objects in each row.

### MISSING_FACTOR

Reason backwards from a result.

Example: `? × 4 = 12`

This should be introduced only after the child has enough experience with the underlying facts.

### FLUENCY

Recall and use understood facts with increasing ease.

Fluency is a learning dimension, but timed/countdown gameplay is future scope and is not required in V1.

## 5. Canonical Representations

V1 may use:

- `SYMBOLIC`
- `EQUAL_GROUPS`
- `ARRAY`
- `WORD_PROBLEM`

Representations should be varied over time.

A fact should not always appear in the same visual or symbolic form.

## 6. Introductory Multiplication Sequence

The beginner experience should move from concrete/visual meaning toward symbols.

Example:

1. Show 3 equal groups containing 2 objects each.
2. Show repeated addition: `2 + 2 + 2 = 6`.
3. Connect the structure to `3 × 2 = 6`.
4. Reuse the same fact in another representation or gameplay context.

Initial facts should remain small.

Examples:

- `2 × 2`
- `2 × 3`
- `3 × 2`
- `2 × 4`
- `3 × 3`

Do not assume that the player already understands multiplication notation.

## 7. Math Problem Model

A learning problem should be represented semantically rather than as only a final text question.

Conceptually, a `MathProblem` should be able to describe:

- operation;
- operands;
- expected answer;
- learning skill;
- representation;
- difficulty/content metadata;
- context/template key where relevant.

Gameplay consumes `MathProblem` without needing multiplication-specific logic.

Player-facing wording should be produced through localization/templates rather than embedded into core learning logic.

## 8. Fact Identity

Learning progress should track mathematical facts in a stable, operation-aware way.

Conceptually:

`operation + operands → fact identity`

Example:

`MULTIPLICATION:3x4`

The implementation should not design fact identity in a way that prevents future division facts from being represented.

## 9. Mastery Model

Do not reduce mastery to only a single correct/wrong counter.

Track enough information to distinguish performance by:

`math fact + learning skill`

Example:

| Fact | Skill | State |
|---|---|---|
| `3 × 4` | RECOGNIZE | strong |
| `3 × 4` | CALCULATE | medium |
| `3 × 4` | APPLY | weak |
| `3 × 4` | CONSTRUCT | medium |

Exact numeric thresholds are implementation/configuration details and may be tuned during playtesting.

## 10. Attempt Tracking

An attempt should provide enough information to update learning progress.

Useful conceptual information includes:

- fact;
- skill;
- representation;
- whether the answer was correct;
- number of attempts;
- hint usage;
- optional response-time data.

Response time may be collected for future fluency use, but V1 should not pressure beginner players with countdown timers.

## 11. Adaptive Learning

V1 adaptation is rule-based.

It is not:

- machine learning;
- an LLM;
- runtime AI question generation.

The Learning Engine uses mastery/history to choose appropriate future problems.

Initial conceptual mix:

- 60% current learning target
- 30% review
- 10% stretch

These values are configurable and should be tuned through playtesting.

## 12. Review Strategy

Previously learned facts should continue to appear.

Do not permanently abandon a fact just because the player answered it correctly once.

Review should vary:

- learning skill;
- representation;
- gameplay context.

This reduces rote memorization tied to one visual format.

## 13. Hint System

Hints are a core V1 learning feature.

A wrong answer should lead to progressively more concrete support.

Example for `3 × 4 = ?`:

First support:

```text
● ● ● ●
● ● ● ●
● ● ● ●
```

Then, if needed:

`4 + 4 + 4`

Then:

`4 → 8 → 12`

The system should help the child reason toward the answer instead of immediately revealing it.

## 14. Fox Guide Relationship

The Learning Engine determines what support is appropriate.

The Fox Guide presents that support in a friendly in-world way.

Architecture:

`Learning Engine → Hint/Feedback → Fox Guide → Player`

Do not place mastery, adaptive selection, or hint-decision logic inside Fox UI components.

## 15. Wrong Answers

Normal mistakes are learning opportunities.

Do not use them to:

- remove lives;
- remove currency;
- remove materials;
- reset an entire adventure;
- shame the child.

Preferred flow:

`Wrong answer → support → alternative representation → retry`

## 16. Gameplay Integration

Gameplay requests learning problems rather than owning the learning curriculum.

Examples:

`Battle → request CALCULATE problem → Learning Engine`

`Gathering → request RECOGNIZE problem → Learning Engine`

`NPC Quest → request APPLY problem → Learning Engine`

`Farming → request CONSTRUCT problem → Learning Engine`

This mapping is not absolute. As the game grows, activities may use multiple skills.

## 17. Language Independence

Core learning data must not depend on Vietnamese sentence structure.

For example, an APPLY problem should contain semantic values such as:

- number of groups;
- items per group;
- item/entity type;
- operation;
- answer;
- localization template key.

The Vietnamese locale turns this data into child-facing wording.

V1 ships Vietnamese content only.

## 18. Future Division

Division should be added as a related operation rather than as a completely separate game architecture.

Future learning contexts may include:

- sharing equally;
- forming equal groups;
- connecting division to known multiplication facts;
- missing-factor reasoning.

Example relationship:

`3 × 4 = 12`

can later support:

`12 ÷ 3 = 4`

and:

`12 ÷ 4 = 3`

Division is future content and must not be enabled in V1.

## 19. Fluency and Timed Challenges

Long-term progression may introduce countdown pressure after children have established understanding.

Possible future use:

- later world stages;
- special challenges;
- end-of-stage review events;
- optional fluency activities.

V1 does not require countdown/timed gameplay.

Understanding comes first.

## 20. V1 Learning Success

The V1 learning system is successful when a child can encounter a simple multiplication fact in one form and still reason about it when the representation changes.

For example:

`3 × 2`

→ 3 visual groups of 2

→ `2 + 2 + 2`

→ a rabbit/carrot scenario

→ a simple symbolic calculation.

The objective is flexible understanding, not merely remembering the text `3 × 2 = 6`.
