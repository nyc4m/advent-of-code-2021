import { ld } from "https://deno.land/x/deno_lodash@v0.1.0/mod.ts";

export type BinaryNumber = Array<"1" | "0">;

export function createBinary(number: string): BinaryNumber {
  return number.split("") as BinaryNumber;
}

export function computeRate(
  binaryInput: ReadonlyArray<BinaryNumber>,
  strategy: (b: BinaryNumber) => "1" | "0",
): number {
  const transposedBinary = ld.unzip(binaryInput);

  return parseInt(transposedBinary.map(strategy).join(""), 2);
}

export function mostFrequent(b: BinaryNumber): "1" | "0" {
  const countOfZeros = b.filter((d) => d === "0").length;
  return countOfZeros > b.length / 2 ? "0" : "1";
}

export function leastFrequent(b: BinaryNumber): "1" | "0" {
  return mostFrequent(b) === "0" ? "1" : "0";
}

export function computingGazRating(
  b: ReadonlyArray<BinaryNumber>,
  strategy: (b: BinaryNumber) => "1" | "0",
): number;

export function computingGazRating(
  b: ReadonlyArray<BinaryNumber>,
  strategy: (b: BinaryNumber) => "1" | "0",
  offset?: number,
): Array<BinaryNumber> | number;

export function computingGazRating(
  b: ReadonlyArray<BinaryNumber>,
  strategy: (b: BinaryNumber) => "1" | "0",
  offset = 0,
): Array<BinaryNumber> | number {
  if (b.length === 1) {
    return parseInt(b[0].join(""), 2);
  }
  const oneOrZero = strategy(b.map((x) => x[offset]));
  return computingGazRating(
    b.filter((x) => x[offset] === oneOrZero),
    strategy,
    offset + 1,
  );
}
