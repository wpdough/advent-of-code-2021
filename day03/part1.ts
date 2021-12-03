import fs from 'fs'

let lines: string[] = fs.readFileSync("input.txt").toString().split("\r\n");
let lineLength: number = lines[0].length;

let binaryGammaRate: string = "";
for (let bitIndex = 0; bitIndex < lineLength; bitIndex++) {
    let ones: number = 0;
    let zeros: number = 0;
    for (let lineIndex: number = 0; lineIndex < lines.length; lineIndex++) {
        let bit: number = parseInt(lines[lineIndex][bitIndex]);
        if (bit === 1)
            ones++;
        else if (bit === 0)
            zeros++;
    }

    let gammaBit: string = ones > zeros ? "1" : "0";
    binaryGammaRate += gammaBit;
}

let binaryEpsilonRate: string = binaryGammaRate.split("").map(value => value === "1" ? "0" : "1").join("");

let gammaRate: number = parseInt(binaryGammaRate, 2);
let epsilonRate: number = parseInt(binaryEpsilonRate, 2);
console.log(gammaRate * epsilonRate);
