export type Line = Record<"start" | "end", Point>;
export class Point {
  private constructor(
    public readonly y: number,
    public readonly x: number,
  ) {}

  static of(y: number, x: number) {
    return new Point(y, x);
  }

  get hash(): number {
    return this.y * 1000 + this.x;
  }
}

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
    return {
      start: Point.of(Number(y), Number(x)),
      end: Point.of(Number(y2), Number(x2)),
    };
  });
}

export function filterLinesForPart1(lines: ReadonlyArray<Line>): Line[] {
  return lines.filter(({ start, end }) =>
    start.x === end.x || start.y === end.y
  );
}

export function* generatePointsFrom(start: Point, end: Point) {
  if (start.x === end.x) {
    const maxY = Math.max(start.y, end.y);
    const minY = Math.min(start.y, end.y);
    for (let y = minY; y <= maxY; y++) {
      yield Point.of(y, start.x);
    }
  } else if (start.y === end.y) {
    const maxX = Math.max(start.x, end.x);
    const minX = Math.min(start.x, end.x);
    for (let x = minX; x <= maxX; x++) {
      yield Point.of(start.y, x);
    }
  } else {
    const distance = Math.abs(start.x - end.x);
    for (let i = 0; i <= distance; i++) {
      yield Point.of(
        start.y > end.y ? start.y - i : start.y + i,
        start.x > end.x ? start.x - i : start.x + i,
      );
    }
  }
}

export function findNumberOfCrossings(lines: ReadonlyArray<Line>): number {
  const points = new Map<number, number>();
  for (const { start, end } of lines) {
    for (const point of generatePointsFrom(start, end)) {
      const count = points.get(point.hash) || 0;
      points.set(point.hash, count + 1);
    }
  }
  return [...points.values()].filter((v) => v > 1).length;
}
