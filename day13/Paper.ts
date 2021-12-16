import Dot from './Dot'
import Fold from './Fold'

export default class Paper {
  cells: boolean[][];

  constructor(dots: Dot[]) {
    let height: number = Math.max(...dots.map(dot => dot.y)) + 1;
    let width: number = Math.max(...dots.map(dot => dot.x)) + 1;

    this.cells = Array(height).fill(false)
      .map(row => Array(width).fill(false));

    dots.forEach(dot => this.cells[dot.y][dot.x] = true);
  }

  fold(fold: Fold) {
    for (let y = 0; y < this.cells.length; y++) {
      for (let x = 0; x < this.cells[0].length; x++) {
        if (this.cells[y][x]) {
          if (fold.isVertical) {
            if (y > fold.value) {
              this.cells[y][x] = false;
              this.cells[y - 2 * (y - fold.value)][x] = true;
            }
          } else {
            if (x > fold.value) {
              this.cells[y][x] = false;
              this.cells[y][x - 2 * (x - fold.value)] = true;
            }
          }
        }
      }
    }

    this.cells = Array.from(Array(fold.isVertical ? fold.value : this.cells.length).keys())
      .map(y => Array.from(Array(fold.isVertical ? this.cells[0].length : fold.value).keys()).map(x => {
        return this.cells[y][x];
      }))
  }

  numDots(): number {
    return this.cells.flat().filter(cell => cell).length;
  }

  draw(): void {
    for (let y = 0; y < this.cells.length; y++) {
      let row: string = '';
      for (let x = 0; x < this.cells[0].length; x++) {
        row += this.cells[y][x] ? '#' : '.';
      }
      console.log(row);
    }
    console.log();
  }
}
