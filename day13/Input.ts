import fs, { PathOrFileDescriptor } from 'fs'
import Dot from './Dot'
import Fold from './Fold'

export default class Input {
  dots: Dot[];
  folds: Fold[];

  constructor(dots: Dot[], folds: Fold[]) {
    this.dots = dots;
    this.folds = folds;
  }

  static read(path: PathOrFileDescriptor): Input {
    let input: string[][] = fs.readFileSync(path).toString().split('\n\n').map(part => part.split("\n"));
    let dots: Dot[] = input[0].map(line => line.split(',').map(coord => parseInt(coord, 10)))
      .map(xy => new Dot(xy[0], xy[1]));
    let folds: Fold[] = input[1].map(line => line.replace('fold along ', '').split('='))
      .map(parts => new Fold(parseInt(parts[1], 10), parts[0] === 'y'));
    return new Input(dots, folds);
  }  
}
