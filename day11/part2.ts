import fs from 'fs';

let energyLevels: number[][] = fs.readFileSync('input.txt').toString().split('\n')
  .map(line => line.split('').map(levelStr => parseInt(levelStr, 10)));
console.clear();

class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  translate(coordinate: Coordinate): Coordinate {
    return new Coordinate(this.x + coordinate.x, this.y + coordinate.y);
  }

  equals(coordinate: Coordinate): boolean {
    return coordinate.x === this.x && coordinate.y === this.y;
  }

  toString(): string {
    return this.x + "," + this.y;
  }
}

let directions: Coordinate[] = [
  new Coordinate(-1, -1), new Coordinate(-1, 0), 
  new Coordinate(0, -1), new Coordinate(1, 0), 
  new Coordinate(0, 1), new Coordinate(1, 1), 
  new Coordinate(1, -1), new Coordinate(-1, 1)
];

function inBounds({ x, y }: Coordinate) {
  return x >= 0 && y >= 0 && x < energyLevels.length && y < energyLevels[0].length;
}

function drawEnergyLevels(): void {
  for (let row = 0; row < energyLevels.length; row++) {
    let rowText: string = ""; 
    for (let col = 0; col < energyLevels[0].length; col++) {
      rowText += energyLevels[row][col];
    }
    console.log(rowText);
  }
  console.log();
}

function getSurrounding(coord: Coordinate): Coordinate[] {
  return directions
    .map(dir => dir.translate(coord))
    .filter(coord => inBounds(coord));
}

function flash(coord: Coordinate, checked: Coordinate[]) {
  checked.push(coord);

  // find all surrounding
  let surrounding: Coordinate[] = getSurrounding(coord);
  surrounding.forEach(coord => energyLevels[coord.x][coord.y] += 1);
  surrounding
    .filter(coord => energyLevels[coord.x][coord.y] === 10)
    .filter(coord => checked.filter(c => c.equals(coord)).length === 0)
    .forEach(coord => flash(coord, checked));
}

let numFlashes: number = 0;

drawEnergyLevels();
for (let step = 0; step < 1000; step++) {
  energyLevels = energyLevels.map(rowLevels => rowLevels.map(level => level + 1));
  let checked: Coordinate[] = [];
  for (let x = 0; x < energyLevels.length; x++) {
    for (let y = 0; y < energyLevels[0].length; y++) {
      if (energyLevels[x][y] > 9 && checked.filter(c => c.equals(new Coordinate(x, y))).length === 0) {
        flash(new Coordinate(x, y), checked);
      }
    }
  }
  energyLevels = energyLevels.map(rowLevels => rowLevels.map(level => level > 9 ? 0 : level));
  let stepFlashes: number = energyLevels
    .map(rowLevels => rowLevels.filter(level => level === 0).length)
    .reduce((a, b) => a + b);
    console.log(step + 1);
  if (stepFlashes === 100) {
    break;
  }
  drawEnergyLevels();
}
