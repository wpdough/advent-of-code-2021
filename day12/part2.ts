import Cave from './Cave';
import Path from './Path';

function traverse(path: Path, paths: Path[]): Path[] {
  if (path.last().isEnd()) {
    paths.push(path);
    return paths;
  }

  for (const cave of path.last().connections.filter(c => !c.isStart())) {
    if (!cave.isSmall() || !path.hasCave(cave) || !path.hasTwoOfTheSameSmallCaves()) {
      traverse(path.fork(cave), paths);
    }
  }
  
  return paths;
}

let caves: Cave[] = Cave.readCaves('input.txt');
let startCave: Cave = caves.find(cave => cave.isStart())!;
let paths: Path[] = traverse(new Path([startCave]), []);
console.log(paths.length);
