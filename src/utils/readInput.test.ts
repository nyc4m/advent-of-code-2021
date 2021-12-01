import { assertThrowsAsync } from "../../deps.ts";
import { readInputFor } from "./readInput.ts";
Deno.test("that it throws if the input file doesn't exist", () => {
  Deno.readTextFile = () => Promise.reject();

  assertThrowsAsync(
    () => readInputFor("day1"),
    Error,
    "The input for day1 cannot be found"
  );
});
