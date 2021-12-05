import fs from 'fs'

let input: string[] = fs.readFileSync("input.txt").toString().split("\n");

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    a: Point;
    b: Point;

    constructor(lineText: string) {
        let coords: number[] = lineText.replace(" -> ", ",").split(",").map(coordText => parseInt(coordText));
        this.a = new Point(coords[0], coords[1]);
        this.b = new Point(coords[2], coords[3]);
    }

    findPoints(): Point[] {
        if (this.isVertical()) {
            let distance: number = Math.abs(this.b.x - this.a.x);
            return Array.from(Array(distance + 1).keys())
                .map(num => Math.min(this.a.x, this.b.x) + num)
                .map(num => new Point(num, this.a.y));
        } else if (this.isHorizontal()) {
            let distance: number = Math.abs(this.b.y - this.a.y);
            return Array.from(Array(distance + 1).keys())
                .map(num => Math.min(this.a.y, this.b.y) + num)
                .map(num => new Point(this.a.x, num));
        }
        throw new Error("only supports horizontal or vertical lines");
    }

    isVertical(): boolean {
        return this.a.y === this.b.y;
    }

    isHorizontal(): boolean {
        return this.a.x === this.b.x;
    }

    isHorizontalOrVertical(): boolean {
        return this.isHorizontal() || this.isVertical();
    }
}

class Diagram {
    coords: number[][];

    constructor(width: number, height: number) {
        this.coords = [];
        for (let x = 0; x < width; x++) {
            let row: number[] = [];
            for (let y = 0; y < height; y++) {
                row.push(0);
            }
            this.coords.push(row);
        }
    }

    mark(point: Point) {
        this.coords[point.x][point.y]++;
    }

    draw() {
        for (let y = 0; y < this.coords[0].length; y++) {
            let row: string = "";
            for (let x = 0; x < this.coords.length; x++) {
                let cell: number = this.coords[x][y];
                row += (cell > 0 ? cell : ".");
            }
            console.log(row);
        }
    }
}

let lines: Line[] = input.map(lineText => new Line(lineText))
    .filter(line => line.isHorizontalOrVertical());

let width: number = lines.map(line => Math.max(line.a.x, line.b.x)).reduce((a, b) => Math.max(a, b)) + 1;
let height: number = lines.map(line => Math.max(line.a.y, line.b.y)).reduce((a, b) => Math.max(a, b)) + 1;

let diagram: Diagram = new Diagram(width, height);

lines.map(line => line.findPoints()).flat()
    .forEach(point => diagram.mark(point));

console.log(diagram.coords.flat().filter(num => num >= 2).length);
