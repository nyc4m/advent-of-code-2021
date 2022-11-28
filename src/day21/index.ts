class Player {
  private constructor(
    public who: 1 | 2,
    public position: number,
    public score: number = 0,
  ) {}

  static startingAt(who: 1 | 2, position: number) {
    return new Player(who, position);
  }

  moveOf(value: number) {
    const position = this.position + value > 10
      ? (this.position + value) % 10 + 1
      : this.position + value;
    return new Player(this.who, position, this.score + position);
  }
}

const player1 = Player.startingAt(1, 8);
const player2 = Player.startingAt(2, 6);

let diceRoll = 0;
for (
  let dice = 1;
  player1.score < 1000 && player2.score < 1000;
  dice = (dice + 2 % 100) + 1
) {
  const currentPlayer = dice % 2 === 0 ? player2 : player1;
  currentPlayer.position = (currentPlayer.position + dice * 3 + 2) % 10 + 1;
  currentPlayer.score += currentPlayer.position;
  diceRoll += 3;
}
console.log("diceRoll = ", diceRoll);

console.log("Part 1: ", diceRoll * Math.min(player1.score, player2.score));

function expandProbability(
  currentPlayer: Player,
  nextPlayer: Player,
  round = 0,
): number {
  if (currentPlayer.score >= 21) {
    return 1;
  }
  let victory = 0;
  for (let one = 1; one < 4; one++) {
    for (let two = 1; two < 4; two++) {
      for (let three = 1; three < 4; three++) {
        victory += memoizedExpandProbability(
          nextPlayer,
          currentPlayer.moveOf(one).moveOf(two).moveOf(three),
          round + 1,
        );
      }
    }
  }
  return victory;
}

const memoizedExpandProbability = memoizedResult();

function memoizedResult() {
  const memoized = new Map<number, number>();
  return (currentPlayer: Player, nextPlayer: Player, round = 0) => {
    const roundValue = memoized.get(round);
    if (roundValue) {
      return roundValue;
    }
    const res = expandProbability(currentPlayer, nextPlayer, round);
    memoized.set(round, res);
    return res;
  };
}

console.log(
  memoizedExpandProbability(Player.startingAt(1, 8), Player.startingAt(2, 6)),
);
