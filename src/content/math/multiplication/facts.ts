import type { MathFact } from "../../../learning/domain/math";

export const multiplicationFacts: readonly MathFact[] = [
  { operation: "MULTIPLICATION", operands: [2, 2], result: 4 },
  { operation: "MULTIPLICATION", operands: [2, 3], result: 6 },
  { operation: "MULTIPLICATION", operands: [3, 2], result: 6 },
];
