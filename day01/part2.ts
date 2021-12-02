import fs from 'fs'

let input: string = fs.readFileSync("input.txt").toString();

let depths: number[] = input.split("\r\n").map(line => parseInt(line));

let previousSum: number = -1;
let numIncreases: number = 0;
for (let i = 0; i < depths.length - 2; i++) {
    let sum: number = depths[i] + depths[i + 1] + depths[i + 2];
    if (previousSum !== -1 && sum > previousSum) {
        numIncreases++;
    }
    previousSum = sum;
}

console.log(numIncreases);
