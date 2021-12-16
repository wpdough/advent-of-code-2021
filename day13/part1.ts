import Input from './Input'
import Paper from './Paper'

let input: Input = Input.read(process.argv[2]);
let paper: Paper = new Paper(input.dots);
paper.fold(input.folds[0]);
console.log(paper.numDots());
