export type ClosingToken = ")" | "]" | "}" | ">";
export function findFirstCorruptedCharacter(
  input: string,
): ClosingToken | null {
  const expectedClosingTokens = [] as ClosingToken[];
  for (const char of input) {
    switch (char) {
      case "(":
        expectedClosingTokens.push(")");
        break;
      case "{":
        expectedClosingTokens.push("}");
        break;
      case "<":
        expectedClosingTokens.push(">");
        break;
      case "[":
        expectedClosingTokens.push("]");
        break;
      default: {
        const expectedClosing = expectedClosingTokens.pop();
        if (expectedClosing !== char) {
          return char as ClosingToken;
        }
      }
    }
  }
  return null;
}

const CorruptedScoreDictionary: Readonly<Record<ClosingToken, number>> = {
  ")": 3,
  ">": 25137,
  "}": 1197,
  "]": 57,
};

const IncompleteScoreDictionary: Readonly<Record<ClosingToken, number>> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

export function computeSyntaxErrorScore(subsystems: string[]): number {
  return subsystems
    .map(findFirstCorruptedCharacter)
    .filter(Boolean)
    .map((token) => CorruptedScoreDictionary[token!])
    .reduce((sum, point) => sum + point, 0);
}

export function completeMissingSequenceOf(subbsystem: string): string {
  const expectedClosingTokens = [] as ClosingToken[];
  for (const char of subbsystem) {
    switch (char) {
      case "(":
        expectedClosingTokens.push(")");
        break;
      case "{":
        expectedClosingTokens.push("}");
        break;
      case "<":
        expectedClosingTokens.push(">");
        break;
      case "[":
        expectedClosingTokens.push("]");
        break;
      default:
        expectedClosingTokens.pop();
    }
  }
  return expectedClosingTokens.reverse().join("");
}

export function computeMissingSequenceScores(subsystems: string[]): number[] {
  return subsystems
    .filter((subsystem) => findFirstCorruptedCharacter(subsystem) === null)
    .map(completeMissingSequenceOf)
    .map((sequence) =>
      sequence
        .split("")
        .map((token) => IncompleteScoreDictionary[token as ClosingToken])
        .reduce((sum, point) => sum * 5 + point, 0)
    );
}
export function getScore(scores: ReadonlyArray<number>): number {
  const sortedScores = [...scores].sort((a, b) => a - b);

  return sortedScores[Math.floor(sortedScores.length / 2)];
}
