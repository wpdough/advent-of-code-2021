export default class Dot {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  translate(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }
}
