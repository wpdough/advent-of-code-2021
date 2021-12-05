import fs from 'fs'

let input: string[] = fs.readFileSync("input.txt").toString().split("\n");

class Board {
    squares: number[][];
    marks: boolean[][];
    turns: number = 0;
    winningNumber: number = 0;

    constructor(lines: string[]) {
        this.squares = [];
        this.marks = [];
        lines.forEach(line => {
            let lineSquares: number[] = line.trim().split(/\s+/g)
                .map(str => parseInt(str));
            this.squares.push(lineSquares);
            let lineMarks: boolean[] = lineSquares.map(line => false);
            this.marks.push(lineMarks);
        });
    }

    draw() {
        for (let x = 0; x < this.squares.length; x++) {
            let line: string = "";
            for (let y = 0; y < this.squares[x].length; y++) {
                const element = this.marks[x][y] ? "X" : this.squares[x][y];
                line += element + "\t";
            }
            console.log(line);
        }  
    }

    mark(drawing: number) {
        this.turns++;
        for (let x = 0; x < this.squares.length; x++) {
            const element = this.squares[x];
            for (let y = 0; y < this.squares[x].length; y++) {
                const element = this.squares[x][y];
                if (element === drawing) {
                    this.marks[x][y] = true;
                }
            }
        }
        if (this.isWinner()) {
            this.winningNumber = drawing;
        }
    }

    isWinner(): boolean {
        for (let x = 0; x < this.squares.length; x++) {
            const element = this.squares[x];
            let numMarked: number = 0;
            for (let y = 0; y < this.squares[x].length; y++) {
                if (this.marks[x][y]) {
                    numMarked++;
                }
            }
            if (numMarked === 5)
                return true;
        }

        for (let y = 0; y < this.squares.length; y++) {
            let numMarked: number = 0;
            for (let x = 0; x < this.squares[y].length; x++) {
                if (this.marks[x][y]) {
                    numMarked++;
                }
            }
            if (numMarked === 5)
                return true;
        }

        return false;
    }

    calculateWinningScore(): number {
        let sum: number = 0;
        for (let x = 0; x < this.squares.length; x++) {
            for (let y = 0; y < this.squares[x].length; y++) {
                if (!this.marks[x][y])
                    sum += this.squares[x][y];
            }
        }
        return sum * this.winningNumber;
    }
}

let drawings: number[] = input[0].split(",").map(num => parseInt(num));

let boards: Board[] = [];
let lines: string[] = [];
for (let index = 2; index < input.length; index++) {
    const line = input[index];
    if (line === "") {
        boards.push(new Board(lines));
        lines = [];
    } else {
        lines.push(line);
    }
}
boards.push(new Board(lines));

for (const drawing of drawings) {
    for (const board of boards) {
        if (!board.isWinner()) {
            board.mark(drawing);
        }
    }
}

console.log(boards.sort((a, b) => a.turns - b.turns).reverse()[0].calculateWinningScore());
