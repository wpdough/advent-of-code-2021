import fs from 'fs';

const CHUNKS: string[] = [ '()', '[]', '{}', '<>' ];

let lines: string[] = fs.readFileSync('input.txt').toString().split('\n');

function isOpener(token: string): boolean {
  return CHUNKS.map(chunk => chunk.charAt(0)).filter(closer => closer === token).length === 1;
}

function isCloser(token: string): boolean {
  return CHUNKS.map(chunk => chunk.charAt(1)).filter(closer => closer === token).length === 1;
}

function findFirstInvalidCloser(line: string): string | undefined {
  let validTokenIndices: number[] = [];
  for (let index = 0; index < line.length - 1; index++) {
    const token = line.charAt(index);
    const nextToken = line.charAt(index + 1);
    if (isOpener(token) && isCloser(nextToken)) {
      const chunk: string = CHUNKS.filter(chunk => chunk.startsWith(token))[0];
      if (chunk != undefined && nextToken === chunk.charAt(1)) {
        validTokenIndices.push(index);
      } else {
        return nextToken;
      }
    }
  }

  validTokenIndices
    .reverse()
    .forEach(index => {
      line = line.slice(0, index) + line.slice(index + 2, line.length);
    });

  if (line.split('').every(token => isOpener(token))) {
    return undefined;
  }
  
  return findFirstInvalidCloser(line);
}

let tokenValues: Map<string, number> = new Map<string, number>();
tokenValues.set(")", 3);
tokenValues.set("]", 57);
tokenValues.set("}", 1197);
tokenValues.set(">", 25137);

console.clear();
let sum: number = lines
  .filter(line => findFirstInvalidCloser(line) !== undefined)
  .map(line => findFirstInvalidCloser(line))
  .map(token => tokenValues.get(token!)!)
  .reduce((a, b) => a + b);
console.log(sum);
