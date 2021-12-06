import fs from "fs";

let input: number[] = fs
  .readFileSync("input.txt")
  .toString()
  .split(",")
  .map((str) => parseInt(str));

let generation: number[] = Array(9).fill(0);
input.forEach(n => generation[n]++);

for (let day: number = 0; day < 256; day++) {

  let currentGeneration: number[] = Array(9).fill(0);
  
  for (let stage: number = 0; stage < generation.length; stage++) {
    let numFish: number = generation[stage];
    if (numFish > 0) {
      if (stage === 0) {
        currentGeneration[6] += numFish;
        currentGeneration[8] += numFish;
      } else {
        currentGeneration[stage - 1] += numFish;
      }
    }
  }

  generation = currentGeneration;
}

let sum: number = generation.reduce((a, b) => a + b);
console.log(sum);
