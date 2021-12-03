import fs from 'fs'

let lines: string[] = fs.readFileSync("input.txt").toString().split("\r\n");
let lineLength: number = lines[0].length;

let findRating = function (input: string[], useGreaterThan: boolean): string {
    let lines = [...input];
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

        let bit: string;
        if (useGreaterThan) {
            if (zeros === ones) {
                bit = "1";
            } else {
                bit = ones > zeros ? "1" : "0";
            }
        } else {
            if (zeros === ones) {
                bit = "0";
            } else {
                bit = ones < zeros ? "1" : "0";
            }
        }

        if (lines.length == 1)
            break;

        lines = lines.filter(line => line[bitIndex] === bit);
    }
    return lines[0];
};

console.log("finding oxygen:");
let oxygenGeneratorRatingBinary: string = findRating(lines, true);
console.log(oxygenGeneratorRatingBinary);

console.log("finding co2:");
let co2ScrubberRatingBinary: string = findRating(lines, false);
console.log(co2ScrubberRatingBinary);

let oxygenGeneratorRating = parseInt(oxygenGeneratorRatingBinary, 2);
let co2ScrubberRating = parseInt(co2ScrubberRatingBinary, 2);

console.log(oxygenGeneratorRating * co2ScrubberRating);
