import fs from 'fs'

interface Position {
    x: number;
    y: number;
}

let instructions: string[] = fs.readFileSync("input.txt").toString().split("\r\n");
let position: Position = { x: 0, y: 0 };

instructions.forEach(instruction => {
    let instructionParts: string[] = instruction.split(" ");
    let direction: string = instructionParts[0];
    let distance: number = parseInt(instructionParts[1]);
    switch (direction) {
        case "forward": position.x += distance; break;
        case "down": position.y += distance; break;
        case "up": position.y -= distance; break;
    }
});

console.log(position.x * position.y);
