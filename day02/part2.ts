import fs from 'fs'

interface Position {
    x: number;
    y: number;
    aim: number;
}

let instructions: string[] = fs.readFileSync("input.txt").toString().split("\r\n");
let position: Position = { x: 0, y: 0, aim: 0 };

instructions.forEach(instruction => {
    let instructionParts: string[] = instruction.split(" ");
    let direction: string = instructionParts[0];
    let units: number = parseInt(instructionParts[1]);
    switch (direction) {
        case "forward":
            position.x += units;
            position.y += position.aim * units;
            break;
        case "down": position.aim += units; break;
        case "up": position.aim -= units; break;
    }
});

console.log(position.x * position.y);
