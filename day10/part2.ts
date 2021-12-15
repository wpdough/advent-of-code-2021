import fs from 'fs';

const CHUNKS: string[] = [ '()', '[]', '{}', '<>' ];

let lines: string[] = fs.readFileSync('input.txt').toString().split('\n');

function isOpener(token: string): boolean {
  return CHUNKS.map(chunk => chunk.charAt(0)).filter(closer => closer === token).length === 1;
}

function isCloser(token: string): boolean {
  return CHUNKS.map(chunk => chunk.charAt(1)).filter(closer => closer === token).length === 1;
}

function findIncompleteTokens(line: string): string | undefined {
  let validTokenIndices: number[] = [];
  for (let index = 0; index < line.length - 1; index++) {
    const token = line.charAt(index);
    const nextToken = line.charAt(index + 1);
    if (isOpener(token) && isCloser(nextToken)) {
      const chunk: string = CHUNKS.filter(chunk => chunk.startsWith(token))[0];
      if (chunk != undefined && nextToken === chunk.charAt(1)) {
        validTokenIndices.push(index);
      } else {
        return undefined;
      }
    }
  }

  validTokenIndices
    .reverse()
    .forEach(index => {
      line = line.slice(0, index) + line.slice(index + 2, line.length);
    });

  if (line.split('').every(token => isOpener(token))) {
    return line;
  }
  
  return findIncompleteTokens(line);
}

const median = (arr: number[]) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a! - b!);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

let tokenValues: Map<string, number> = new Map<string, number>();
tokenValues.set(")", 1);
tokenValues.set("]", 2);
tokenValues.set("}", 3);
tokenValues.set(">", 4);

console.clear();
let scores: number[] = lines
  .map(line => {
    let incompletes: string | undefined = findIncompleteTokens(line);
    CHUNKS.forEach(chunk => {
      let regex: RegExp = new RegExp('\\' + chunk.charAt(0), 'g');
      incompletes = incompletes?.replace(regex, chunk.charAt(1));
    });
    return incompletes?.split('').reverse().join('');
  })
  .filter(completers => completers !== undefined)
  .map(completer => 
    completer?.split('')
      .map(token => tokenValues.get(token))
      .reduce((a, b) => 5 * a! + b!)
  )
  .map(value => value!);

let middleScore: number = median(scores);
console.log(middleScore);
