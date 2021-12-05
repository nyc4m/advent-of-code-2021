export type Line = Record<"x" | "y" | "x2" | "y2", number>;

export function parseLines(input: string[]): Line[] {
  const lineRegex = /(?<x>\d*),(?<y>\d*) -> (?<x2>\d*),(?<y2>\d*)/;
  return input.map((line) => {
    const match = lineRegex.exec(line);
    if (
      !(
        match?.groups?.x ||
        match?.groups?.x1 ||
        match?.groups?.y ||
        match?.groups?.y2
      )
    ) {
      throw new Error("parsing is not ok, better stop the process man 🤐");
    }
    const { x, x2, y, y2 } = match.groups;
    return { x: Number(x), x2: Number(x2), y: Number(y), y2: Number(y2) };
  });
}

export function filterLinesForPart1(lines: ReadonlyArray<Line>): Line[] {
  return lines.filter((l) => l.x === l.x2 || l.y === l.y2);
}

function _rememberCrossedLines() {
  const alreadySeenLines = new Map<Line, Line[]>();
  return (line1: Line, line2: Line) => {
    if (
      alreadySeenLines.has(line1) &&
      alreadySeenLines.get(line1)?.includes(line2)
    ) {
      return 0;
    }
    const crossings = computeNumberOfCrossing(line1, line2);
    if (crossings > 0) {
      const seen = alreadySeenLines.get(line2) || [];
      alreadySeenLines.set(line2, [...seen, line1]);
    }

    return crossings;
  };
}

export function computeNumberOfCrossing(
  line1: Line,
  line2: Line,
  returnOnFail = false
): number {
  if (
    (line1.x2 === line2.x2 && line1.x === line2.x) ||
    (line1.y2 === line2.y2 && line1.y === line2.y)
  ) {
    const distanceLine1 = distance(line1);
    const distanceLine2 = distance(line2);
    return Math.abs(distanceLine1 - distanceLine2) || distanceLine1;
  }
  const includedInXAxis = isBetween(line1.x, line2.x, line2.x2);
  const includedInYAxis =
    isBetween(line1.y2, line2.y, line2.y2) || line1.y2 > line2.y;
  return includedInXAxis && includedInYAxis
    ? 1
    : returnOnFail
    ? 0
    : computeNumberOfCrossing(line2, line1, true);
}

export function distance(line: Line): number {
  return Math.sqrt(
    Math.pow(line.x - line.x2, 2) + Math.pow(line.y - line.y2, 2)
  );
}

export function isBetween(x: number, y: number, z: number): boolean {
  return x >= Math.min(y, z) && x <= Math.max(y, z);
}

export function computeAllPossibleCrossing(lines: Line[]): number {
  let sum = 0;
  const computeCrossings = _rememberCrossedLines();
  for (const line1 of lines) {
    for (const line2 of lines) {
      if (line1 === line2) continue;
      sum += computeCrossings(line1, line2);
    }
  }
  return sum;
}

export const rememberCrossedLines = _rememberCrossedLines();
