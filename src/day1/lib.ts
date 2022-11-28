export function computeIncreases(depths: ReadonlyArray<number>): number {
  let counter = 0;
  let lastDepth = depths[0];
  for (const depth of depths) {
    if (depth > lastDepth) {
      counter++;
    }
    lastDepth = depth;
  }
  return counter;
}

export function* computeWindows(
  depths: number[],
): IterableIterator<[number, number, number]> {
  for (let i = 0; i < depths.length - 2; i++) {
    yield [depths[i], depths[i + 1], depths[i + 2]];
  }
}

export function* intermediateDepthsSum(
  windows:
    | Array<[number, number, number]>
    | IterableIterator<[number, number, number]>,
) {
  for (const window of windows) {
    yield window.reduce((sum, depth) => sum + depth, 0);
  }
}
