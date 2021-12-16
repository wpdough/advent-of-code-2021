import Input from './Input'
import Paper from './Paper'

let input: Input = Input.read(process.argv[2]);
let paper: Paper = new Paper(input.dots);
input.folds.forEach(fold => paper.fold(fold));
paper.draw();
