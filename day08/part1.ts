import fs from "fs";
import Notes from "./Notes";

let input: string[] = fs.readFileSync("input.txt").toString().split("\n");

const NUMBER_SEGMENTS: string[] = [ "abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg" ];
const UNIQUE_PATTERNS: string[] = NUMBER_SEGMENTS
  .filter(pattern => NUMBER_SEGMENTS.filter(x => x.length === pattern.length).length === 1);

let notes: Notes[] = input.map(line => new Notes(line));
let matchesUniquePattern = (digit: string) => UNIQUE_PATTERNS.filter(pattern => pattern.length === digit.length).length > 0;
let sum: number = notes
  .map(note => note.digitOutputValues.filter(digit => matchesUniquePattern(digit)).length)
  .reduce((a, b) => a + b);

console.clear();
console.log(sum);
