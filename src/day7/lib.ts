type FuelStrategy = (start: number, end: number) => number;

export function computeFuelForPosition(
  positions: ReadonlyArray<number>,
  destination: number,
  algo: FuelStrategy
): number {
  return positions
    .map((position) => algo(position, destination))
    .reduce((sum, fuel) => sum + fuel, 0);
}

export function distance(start: number, end: number): number {
  return Math.abs(start - end);
}

export function crabEngine(start: number, end: number): number {
  const distance = Math.abs(start - end);
  let fuel = 0;
  for (let i = 1; i <= distance; i++) {
    fuel += i;
  }
  return fuel;
}
