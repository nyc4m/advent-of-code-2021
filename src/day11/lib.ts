export function executeCycle(fishes: ReadonlyArray<ReadonlyArray<number>>): {
  flashes: number;
  fishes: number[][];
} {
  const newFishes = [];
  const overPoweredFishes = [] as Readonly<Record<"x" | "y", number>>[];
  for (let y = 0; y < fishes.length; y++) {
    const newLine = [];
    for (let x = 0; x < fishes.length; x++) {
      const updatedValue = (fishes[y][x] + 1) % 10;
      newLine.push(updatedValue);
      if (updatedValue === 0) {
        overPoweredFishes.push({ x, y });
      }
    }
    newFishes.push(newLine);
  }

  for (const { x, y } of overPoweredFishes) {
    for (const { x: nX, y: nY } of generateAllNeighbours(x, y, fishes.length)) {
      const value = newFishes[nY][nX];
      if (value === 0) {
        continue;
      }
      let updatedValue = value + 1;
      if (updatedValue === 10) {
        overPoweredFishes.push({ x: nX, y: nY });
        updatedValue = 0;
      }
      newFishes[nY][nX] = updatedValue;
    }
  }

  return { flashes: overPoweredFishes.length, fishes: newFishes };
}

function* generateAllNeighbours(x: number, y: number, fishBoardSize: number) {
  if (x > 0) {
    if (y < fishBoardSize - 1) yield { x: x - 1, y: y + 1 };
    if (y > 0) yield { x: x - 1, y: y - 1 };
    yield { x: x - 1, y: y };
  }
  if (x < fishBoardSize - 1) {
    if (y < fishBoardSize - 1) yield { x: x + 1, y: y + 1 };
    if (y > 0) yield { x: x + 1, y: y - 1 };
    yield { x: x + 1, y: y };
  }
  if (y > 0) yield { x, y: y - 1 };
  if (y < fishBoardSize - 1) yield { x, y: y + 1 };
}
