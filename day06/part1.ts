import fs from 'fs'

let input: number[] = fs.readFileSync("input.txt")
        .toString()
        .split(",")
        .map(str => parseInt(str));

function printCycle(day: number, cycle: number[]) {
    let prefix = day === 0 ? "Initial state:" : "After\t" + day + " " + (day === 1 ? "day" : "days:");
    console.log(prefix + "\t" + cycle.join(","));
    console.log(cycle.length);
}

let cycle: number[] = [...input];
for (let day = 0; day <= 80; day++) {
    let results: number[] = [];
    for (const fish of cycle) {
        if (fish === 0) {
            results.push(6);
            results.push(8);
        } else {
            results.push(fish - 1);
        }
    }
    cycle = results;
}

console.log(cycle.length);