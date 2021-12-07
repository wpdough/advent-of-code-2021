import fs from "fs";

let input: number[] = fs
  .readFileSync("input.txt")
  .toString()
  .split(",")
  .map((str) => parseInt(str));

let min: number = Math.min(...input);
let max: number = Math.max(...input);

function sum(n: number) {
  return n / 2 * (n + 1);
}

let cheapestGas = -1;
for (let index: number = min; index <= max; index++) {
  let gasCost: number = input.map(n => sum(Math.abs(index - n))).reduce((a, b) => a + b);
  if (gasCost < cheapestGas || cheapestGas === -1) {
    cheapestGas = gasCost;
  }
}

console.log(cheapestGas);
