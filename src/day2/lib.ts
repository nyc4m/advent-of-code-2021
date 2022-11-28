export type Direction = "forward" | "up" | "down";
export type Move = { direction: Direction; value: number };

export function parseSubmarineMoves(move: string): Move {
  const [direction, value] = move.split(" ");
  return { direction: direction as Direction, value: Number(value) };
}

export function sumMoves(
  moves: ReadonlyArray<Move>,
): Record<"x" | "y", number> {
  return moves.reduce(
    (position, move) => {
      switch (move.direction) {
        case "down":
          return { ...position, y: position.y + move.value };
        case "up":
          return { ...position, y: position.y - move.value };
        case "forward":
          return { ...position, x: position.x + move.value };
      }
    },
    { x: 0, y: 0 },
  );
}

export function sumMovesUsingAim(
  moves: ReadonlyArray<Move>,
): Record<"x" | "y", number> {
  let aim = 0;
  return moves.reduce(
    (position, move) => {
      switch (move.direction) {
        case "down":
          aim += move.value;
          return position;
        case "up":
          aim -= move.value;
          return position;
        case "forward":
          return {
            x: position.x + move.value,
            y: position.y + move.value * aim,
          };
      }
    },
    { x: 0, y: 0 },
  );
}
