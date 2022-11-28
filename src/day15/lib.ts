export class RiskMap {
  private constructor(
    private readonly risk: number[],
    private readonly width = 10,
  ) {}

  get size(): number {
    return this.risk.length;
  }

  static from(lines: string[]) {
    return new RiskMap(
      lines.flatMap((line) => [...line].map(Number)),
      lines[0].length,
    );
  }

  get(y: number, x: number): number {
    return this.risk[y * this.width + x];
  }

  *neighboorsFrom(y: number, x: number) {
    if (x < this.width - 1) {
      yield { x: x + 1, y, risk: this.get(y, x + 1) };
    }
    yield { x, y: y + 1, risk: this.get(y + 1, x) };
    if (x > 0) yield { x: x - 1, y, risk: this.get(y, x - 1) };
    if (y > 0) yield { x, y: y - 1, risk: this.get(y - 1, x) };
  }
}

export class Submarine {
  private _visited = [] as {
    from: { x: number; y: number };
    to: { x: number; y: number };
    risk: number;
  }[];

  path = new Map<number, { x: number; y: number }>();
  marked = new Set([0]);

  risk = 0;

  get visited(): Readonly<typeof this._visited> {
    return this._visited;
  }

  get location() {
    return { x: this._x, y: this._y };
  }

  private constructor(
    private readonly map: RiskMap,
    private _x: number = 0,
    private _y: number = 0,
  ) {
  }

  static beginWithMap(map: RiskMap) {
    return new Submarine(map);
  }

  explore() {
    const { x, y } = this.location;
    console.log(`exploring y=${y} x=${x}`);
    for (const neighboor of this.map.neighboorsFrom(y, x)) {
      if (this.marked.has(neighboor.y * 10 + neighboor.x)) continue;
      this._visited.push({
        from: this.location,
        to: {
          x: neighboor.x,
          y: neighboor.y,
        },
        risk: neighboor.risk + this.risk,
      });
    }

    const notMarkedNeighboors = this.visited.filter((n) =>
      !this.marked.has(n.to.y * 10 + n.to.x)
    );
    const minRisk = Math.min(...notMarkedNeighboors.map((v) => v.risk));
    const locationToMark = notMarkedNeighboors.find((v) => v.risk === minRisk)!;
    this.path.set(y * 10 + x, locationToMark.to);
    this.marked.add(locationToMark.to.y * 10 + locationToMark.to.x);
    this.risk = locationToMark.risk;
    this._x = locationToMark.to.x;
    this._y = locationToMark.to.y;
  }
}
