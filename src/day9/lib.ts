export function* neighboursFrom(
  heightMap: number[][],
  y: number,
  x: number
): IterableIterator<number> {
  yield Number.isInteger(heightMap[y][x + 1])
    ? heightMap[y][x + 1]
    : Number.MAX_SAFE_INTEGER;
  yield Number.isInteger(heightMap[y][x - 1])
    ? heightMap[y][x - 1]
    : Number.MAX_SAFE_INTEGER;
  yield Number.isInteger(heightMap[y + 1]?.[x])
    ? heightMap[y + 1]?.[x]
    : Number.MAX_SAFE_INTEGER;
  yield Number.isInteger(heightMap[y - 1]?.[x])
    ? heightMap[y - 1]?.[x]
    : Number.MAX_SAFE_INTEGER;
}

export type LowestPointAction<R = number> = {
  action: (value: number, coord: Record<"x" | "y", number>) => void;
  result: () => R;
};

export function computeRisk(): LowestPointAction {
  let risk = 0;
  return {
    action(value) {
      risk += value + 1;
    },
    result: () => risk,
  };
}

export function saveLowestPointPosition(): LowestPointAction<
  Record<"x" | "y", number>[]
> {
  const coords: Record<"x" | "y", number>[] = [];
  return {
    action(_, coord) {
      coords.push(coord);
    },
    result: () => coords,
  };
}

export function findLowestPoints<T, R = T>(
  heightMap: number[][],
  onLowestPoint: LowestPointAction<R>
): R {
  for (let y = 0; y < heightMap.length; y++) {
    for (let x = 0; x < heightMap[y].length; x++) {
      const neighbours = Array.from(neighboursFrom(heightMap, y, x));
      if (neighbours.includes(heightMap[y][x])) {
        continue;
      }
      const minValue = Math.min(
        heightMap[y][x],
        ...Array.from(neighboursFrom(heightMap, y, x))
      );
      if (minValue === heightMap[y][x]) {
        onLowestPoint.action(minValue, { y, x });
      }
    }
  }
  return onLowestPoint.result();
}

export function exploreBasin(
  heightMap: number[][],
  y: number,
  x: number,
  alreadyVisited = new Set<string>()
): number[] {
  if (alreadyVisited.has(`${y}${x}`)) {
    return [];
  }
  if (!heightMap[y]) {
    console.log("outside y");
    return [];
  }
  if (heightMap[y][x] === undefined) {
    return [];
  }
  if (heightMap[y][x] === 9) {
    console.log("Mountain");
    return [];
  }
  console.log(`ok for x=${x} & y=${y}`);

  alreadyVisited.add(`${y}${x}`);
  return [
    heightMap[y][x],
    ...exploreBasin(heightMap, x + 1, y, alreadyVisited),
    ...exploreBasin(heightMap, x - 1, y, alreadyVisited),
    ...exploreBasin(heightMap, x, y - 1, alreadyVisited),
    ...exploreBasin(heightMap, x, y + 1, alreadyVisited),
  ];
}
