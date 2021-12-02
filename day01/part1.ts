import fs from 'fs'

let input: string = fs.readFileSync("input.txt").toString();

let depths: number[] = input.split("\r\n").map(line => parseInt(line));
let numDepthMeasurementIncreased: number = 0;

let previous: number = -1;
depths.forEach(depth => {
    if (previous === -1) {
        console.log(depth + "\t" + "(N/A - no previous measurement)");
    } else {
        let increased: boolean = depth > previous;
        console.log(depth + "\t" + "(" + (increased ? "increased" : "decreased") + ")");
        if (increased) {
            numDepthMeasurementIncreased++;
        }
    }
    previous = depth;
});

console.log("Depth increases: " + numDepthMeasurementIncreased);
