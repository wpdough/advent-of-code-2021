import Cave from './Cave';
import Path from './Path';

function traverse(path: Path, paths: Path[]): Path[] {
  if (path.last().isEnd()) {
    paths.push(path);
    return paths;
  }

  for (const cave of path.last().connections) {
    if (!cave.isStart() && (!cave.isSmall() || (cave.isSmall() && !path.hasCave(cave)))) {
      traverse(path.fork(cave), paths);
    }
  }
  
  return paths;
}

let caves: Cave[] = Cave.readCaves('input.txt');
let startCave: Cave = caves.find(cave => cave.isStart())!;
let paths: Path[] = traverse(new Path([startCave]), []);
console.log(paths.length);
