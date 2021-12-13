import fs from "fs";

let input: string[] = fs.readFileSync("input.txt").toString().split("\n");

let directions: number[][] = [
  [-1, -1], [-1, 0], [0, -1], [1, 0], [0, 1], [1, 1], [1, -1], [-1, 1]
];

function inBounds(row: number, col: number) {
  return row >= 0 && col >= 0 && row < input.length && col < input[0].length;
}

function getSurrounding(row: number, col: number) {
  return directions
    .map(coords => [coords[0] + row, coords[1] + col])
    .filter(coords => inBounds(coords[0], coords[1]))
    .map(coords => input[coords[0]].charAt(coords[1]))
    .map(height => parseInt(height, 10));
}

function isLowest(row: number, col: number) {
  let surroundingMin: number = Math.min(...getSurrounding(row, col));
  return parseInt(input[row].charAt(col), 10) < surroundingMin;
}

console.clear();

let riskLevels: number[] = [];
for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[row].length; col++) {
    if (isLowest(row, col)) {
      riskLevels.push(parseInt(input[row].charAt(col), 10) + 1);
    }
  }
}

console.log(riskLevels.reduce((a, b) => a + b));
