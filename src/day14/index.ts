import { readInputFor, splitByLines } from "../utils/input.utils.ts";
import { LinkedList, parsePolymerInstructions } from "./lib.ts";
import { Collections } from "../../deps.ts";

const { instructions, polymerChain } = await readInputFor(
  "day14",
  splitByLines,
  (lines) => {
    const [polymerStarter, _blankLine, ...instructions] = lines;
    return {
      polymerChain: LinkedList.from(polymerStarter),
      instructions: parsePolymerInstructions(instructions),
    };
  },
);

for (let i = 0; i < 40; i++) {
  const polymerIterator = polymerChain[Symbol.iterator]();
  for (
    let iterator = polymerIterator.next();
    !iterator.done;
    iterator = polymerIterator.next()
  ) {
    const { value: node } = iterator;
    const newChar = instructions.get(node.value + node.next?.value);
    if (newChar) {
      polymerChain.insertAfter(node, newChar);
      iterator = polymerIterator.next();
    }
  }
}

const countByletters = Collections.mapValues(
  Collections.groupBy([...polymerChain], (i) => i.value),
  (v) => v.length,
);

const mostCommon = Collections.maxBy(
  Object.keys(countByletters).map((key) => ({
    letter: key,
    value: countByletters[key],
  })),
  (x) => x.value,
);

const leastCommon = Collections.minBy(
  Object.keys(countByletters).map((key) => ({
    letter: key,
    value: countByletters[key],
  })),
  (x) => x.value,
);

console.log(`part1: ${mostCommon!.value - leastCommon!.value}`);
