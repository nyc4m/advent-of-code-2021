import { assertEquals } from "../../deps.ts";
import {
  completeMissingSequenceOf,
  computeMissingSequenceScores,
  computeSyntaxErrorScore,
  findFirstCorruptedCharacter,
  getScore,
} from "./lib.ts";

const corruptedSubsystem = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`
  .trim()
  .split("\n");

const incompleteSubsystem = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
(((({<>}<{<{<>}{[]{[]{}
{<[[]]>}<{[{[{[]{()[[[]
<{([{{}}[<[[[<>{}]]]>[]]
`
  .trim()
  .split("\n");

Deno.test({
  name: "that it returns the corrupted caracter",
  fn() {
    assertEquals(findFirstCorruptedCharacter("[[<[([]))<([[{}[[()]]]"), ")");
  },
});

Deno.test({
  name: "that it computes the score from checking corrupted lines",
  fn() {
    assertEquals(computeSyntaxErrorScore(corruptedSubsystem), 26397);
  },
});

Deno.test({
  name: "that it complete the missing sequence",
  fn() {
    assertEquals(
      completeMissingSequenceOf("[({(<(())[]>[[{[]{<()<>>"),
      "}}]])})]"
    );
  },
});

Deno.test({
  name: "that it compute the score for completing the missing sequence",
  fn() {
    assertEquals(
      computeMissingSequenceScores(incompleteSubsystem),
      [288957, 5566, 1480781, 995444, 294]
    );
  },
});

Deno.test({
  name: "that it returns the middle score",
  fn() {
    assertEquals(getScore([288957, 5566, 1480781, 995444, 294]), 288957);
  },
});
