import { Collections } from "../../deps.ts";

export type Point = Record<"x" | "y", number>;
export type Fold = { value: number; axis: "x" | "y" };
const foldRegex = /(?<axis>x|y)=(?<value>\d*)/;

export function parsePoint(input: string): Record<"x" | "y", number> {
  const [x, y] = input.split(",");
  return { x: Number(x), y: Number(y) };
}

export function parseFold(input: string): Fold {
  const match = foldRegex.exec(input);
  if (!match) {
    throw new Error(`Not parsable ${input}`);
  }
  const axis = match?.groups?.axis;
  const value = match?.groups?.value;
  if (axis === undefined || value === undefined) {
    throw new Error(
      `value or axis is not matched (axis=${axis}, value=${value})`,
    );
  }
  return { axis: axis as "x" | "y", value: Number(value) };
}

export function foldOnAxis(
  point: Readonly<Point>,
  value: number,
  axis: keyof Point,
): Point {
  const distance = Math.abs(point[axis] - value);
  return { ...point, [axis]: value - distance };
}

export function executeFold(
  points: Readonly<Readonly<Point>[]>,
  fold: Fold,
): Point[] {
  const [under, above] = Collections.partition(
    points,
    (p) => p[fold.axis] > fold.value,
  );
  const foldedPoints = under.map((p) => foldOnAxis(p, fold.value, fold.axis));
  return Collections.distinctBy(
    [...above, ...foldedPoints],
    (p) => `${p.y}${p.x}`,
  );
}
