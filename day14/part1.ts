import { count } from 'console';
import fs from 'fs';

let input: string[] = fs.readFileSync(process.argv[2]).toString().split('\n\n');
let template: string = input[0];
let rules: string[][] = input[1].split('\n').map(line => line.split(' -> '));

for (let step = 0; step < 10; step++) {
  for (let index = 1; index < template.length; index++) {
    let pair: string = template.substring(index - 1, index + 1);
    let rule: string[] | undefined = rules.find(rule => rule[0] === pair);
    if (rule !== undefined) {
      template = template.substring(0, index) + rule[1] + template.substring(index, template.length);
      index++;
    }
  }    
}

let elementOccurrences: number[] = template
  .split('')
  .flat()
  .map(e => template.split('').reduce((a, v) => (v === e ? a + 1 : a), 0));
let occurrenceRange: number = Math.max(...elementOccurrences) - Math.min(...elementOccurrences);
console.log(occurrenceRange);
