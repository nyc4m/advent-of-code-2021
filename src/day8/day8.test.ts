import { assertEquals } from "../../deps.ts";
import { parseSegments } from "./lib.ts";

Deno.test({
  name: "Should parse input",
  async fn(t) {
    const parsedInput = parseSegments([
      "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
    ]);

    await t.step("that it parses signal patterns", () => {
      assertEquals(parsedInput[0].signalPatterns, [
        "acedgfb",
        "cdfbe",
        "gcdfa",
        "fbcad",
        "dab",
        "cefabd",
        "cdfgeb",
        "eafb",
        "cagedb",
        "ab",
      ]);
    });

    await t.step("that it parses outout digits", () => {
      assertEquals(parsedInput[0].outputDigits, [
        "cdfeb",
        "fcadb",
        "cdfeb",
        "cdbaf",
      ]);
    });
  },
});
