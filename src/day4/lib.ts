export class Point {
  private constructor(
    readonly x: number,
    readonly y: number,
    readonly z: number
  ) {}
  static with({ x, y, z }: Record<"x" | "y" | "z", number>): Point {
    return new Point(x, y, z);
  }

  get key(): number {
    return this.z * 1000 + this.y * 100 + this.x;
  }
}

export class Cell {
  private constructor(
    readonly point: Point,
    public content: { value: number; checked: boolean }
  ) {}

  static from(
    board: number,
    x: number,
    y: number,
    content: { value: number; checked: boolean }
  ): Cell {
    return new Cell(Point.with({ z: board, x, y }), content);
  }

  static notChecked(board: number, x: number, y: number, value: number): Cell {
    return Cell.from(board, x, y, { value, checked: false });
  }

  static checked(board: number, x: number, y: number, value: number): Cell {
    return Cell.from(board, x, y, { value, checked: true });
  }

  get key(): number {
    return this.point.key;
  }
}

export class Board {
  private boards = new Map<number, Cell>();

  private lastNumber = -1;

  private constructor() {}

  static empty(): Board {
    return new Board();
  }

  static fromString(boards: Array<string>): Board {
    const board = Board.empty();
    let boardId = 1;
    let currentLine = 0;
    for (const line of boards) {
      if (!line) {
        currentLine = 0;
        boardId++;
        continue;
      }
      const ns = line.split(" ").filter((s) => s.length);
      for (let i = 0; i < ns.length; i++) {
        board.put(
          Cell.from(boardId, i, currentLine, {
            value: Number(ns[i]),
            checked: false,
          })
        );
      }
      currentLine++;
    }
    return board;
  }

  put(l: Cell): this {
    this.boards.set(l.key, l);
    return this;
  }

  checkEvery(value: number) {
    this.lastNumber = value;
    Array.from(this.boards.values())
      .filter((v) => v.content.value === value)
      .forEach((v) => (v.content.checked = true));
  }

  at(board: number, x: number, y: number): Cell {
    const cell = this.boards.get(Point.with({ z: board, x, y }).key);
    if (!cell) {
      throw new Error(
        `cell at board ${board} (x: ${x}, y: ${y}) doesn not exist`
      );
    }
    return cell;
  }

  private get values(): ReadonlyArray<Cell> {
    return Array.from(this.boards.values());
  }

  checkWinners(): number {
    const maxX = Math.max(...this.values.map((values) => values.point.x));
    const maxY = Math.max(...this.values.map((values) => values.point.y));
    const boardNumber = Math.max(
      ...this.values.map((values) => values.point.z)
    );

    for (let board = 1; board <= boardNumber; board++) {
      const currentBoard = this.values.filter((c) => c.point.z === board);
      if (
        this.checkDimensionIsFilled((c) => c.point.y, currentBoard, maxY) ||
        this.checkDimensionIsFilled((c) => c.point.x, currentBoard, maxX)
      ) {
        return board;
      }
    }

    return 0;
  }

  private checkDimensionIsFilled(
    accessor: (c: Cell) => number,
    view: ReadonlyArray<Cell>,
    dimensionSize: number
  ): boolean {
    for (let d = 0; d < dimensionSize; d++) {
      const hasFullLine = view
        .filter((c) => accessor(c) === d)
        .every((c) => c.content.checked);
      if (hasFullLine) {
        return true;
      }
    }
    return false;
  }

  resultFor(boardID: number): unknown {
    const board = this.values.filter((b) => b.point.z === boardID);
    if (!board.find((c) => c.content.value === this.lastNumber)) {
      throw new Error("The number is not, present in this player board");
    }
    return (
      board
        .filter((b) => !b.content.checked)
        .map((b) => b.content.value)
        .reduce((sum, value) => sum + value, 0) * this.lastNumber
    );
  }
}

export function createGame(input: string[]): {
  numbers: number[];
  boards: Board;
} {
  return {
    numbers: input[0].split(",").map(Number),
    boards: Board.fromString(input.slice(2)),
  };
}
