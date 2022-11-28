import { readInputFor, splitByLines } from "../utils/input.utils.ts";
import { RiskMap, Submarine } from "./lib.ts";

const input = await readInputFor("day15", splitByLines);

const map = RiskMap.from(input);

const submarine = Submarine.beginWithMap(map);

while (true) submarine.explore();
