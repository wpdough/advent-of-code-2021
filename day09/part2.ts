import fs from "fs";

let input: string[] = fs.readFileSync("input.txt").toString().split("\n");

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

class Chart {
  values: number[][];

  constructor(lines: string[]) {
    this.values = lines.map(line => line.split(""))
      .map(values => values.map(val => parseInt(val, 10)));
  }

  draw(): void {
    for (let x = 0; x < this.values.length; x++) {
      let row: string = "";
      for (let y = 0; y < this.values[x].length; y++) {
        row += this.values[x][y];
      }
      console.log(row);
    }
  }

  drawFilled(coords: Coordinate[]): void {
    for (let x = 0; x < this.values.length; x++) {
      let row: string = "";
      for (let y = 0; y < this.values[x].length; y++) {
        row += coords.filter(c => c.equals(new Coordinate(x, y))).length > 0 ? "X" : this.values[x][y];
      }
      console.log(row);
    }
  }

  getWidth(): number {
    return this.values[0].length;
  }

  getHeight(): number {
    return this.values.length;
  }

  get(coordinate: Coordinate): number {
    return this.values[coordinate.x][coordinate.y];
  }

  isValid(coordinate: Coordinate): boolean {
    return coordinate.x >= 0 && coordinate.x < this.values.length &&
      coordinate.y >= 0 && coordinate.y < this.values[0].length;
  }

  getSurrounding(coordinate: Coordinate): number[] {
    return directions
      .map(dir => dir.translate(coordinate))
      .filter(coord => this.isValid(coord))
      .map(coord => this.get(coord));
  }

  isLowest(coordinate: Coordinate) {
    let surroundingMin: number = Math.min(...this.getSurrounding(coordinate));
    return this.get(coordinate) < surroundingMin;
  }
}

let directions: Coordinate[] = [
  new Coordinate(-1, 0),
  new Coordinate(1, 0),
  new Coordinate(0, 1),
  new Coordinate(0, -1)
];

function solve(chart: Chart, coords: Coordinate[], pos: Coordinate): Coordinate[] {

  if (!chart.isValid(pos) || coords.filter(c => c.equals(pos)).length > 0 || chart.get(pos) === 9) {
    return coords;
  }

  coords.push(pos);

  let paths: Coordinate[] = [];
  for (const dir of directions) {
    const forkPos: Coordinate = pos.translate(dir);
    const forked: Coordinate[] = solve(chart, coords, forkPos);
    paths = [...paths, ...forked];
  }

  return coords;
}

console.clear();
let chart: Chart = new Chart(input);

// get risk levels
let lowPoints: Coordinate[] = [];
for (let x = 0; x < chart.getHeight(); x++) {
  for (let y = 0; y < chart.getWidth(); y++) {
    const coordinate: Coordinate = new Coordinate(x, y);
    if (chart.isLowest(coordinate)) {
      lowPoints.push(coordinate);
    }
  }
}

let basins: Coordinate[][] = lowPoints
  .map(coord => solve(chart, [], coord));

basins.forEach(coords => {
  console.log(coords);
  chart.drawFilled(coords);
});

let basinsProduct: number = basins
  .sort((a, b) => b.length - a.length)
  .slice(0, 3)
  .map(basin => basin.length)
  .reduce((a, b) => a * b);

console.log(basinsProduct);
