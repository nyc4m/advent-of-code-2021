export function createAquarium(fishes: readonly number[]): Map<number, number> {
  const fishesMap = new Map([
    [-1, 0],
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
  ]);
  for (const number of fishes) {
    fishesMap.set(number, fishesMap.get(number)! + 1);
  }
  return fishesMap;
}

export function simulateDays(numberOfDays: number, fishes: number[]): number {
  let day = 0;
  let aquarium = createAquarium(fishes);
  const possibleDays = [8, 7, 6, 5, 4, 3, 2, 1, 0];
  while (day < numberOfDays) {
    const newAquarium = createAquarium([]);
    for (const day of possibleDays) {
      const currentFish = aquarium.get(day) || 0;
      if (currentFish) {
        newAquarium.set(day - 1, currentFish);
      }
    }
    const newFishes = newAquarium.get(-1) || 0;
    const babyFishes = newAquarium.get(8) || 0;
    const adultFishes = newAquarium.get(6) || 0;
    newAquarium.set(6, adultFishes + newFishes);
    newAquarium.set(8, babyFishes + newFishes);
    newAquarium.set(-1, 0);
    aquarium = newAquarium;
    day++;
  }
  return Array.from(aquarium.values()).reduce((sum, c) => sum + c, 0);
}
