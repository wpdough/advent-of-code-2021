import fs, { PathOrFileDescriptor } from 'fs';

export default class Cave {
  name: string;
  connections: Cave[];
  
  constructor(name: string) {
    this.name = name;
    this.connections = [];
  }

  isSmall(): boolean {
    return this.name !== 'start' && this.name !== 'end' && this.name === this.name.toLowerCase();
  }

  isStart(): boolean {
    return this.name === 'start';
  }

  isEnd(): boolean {
    return this.name === 'end';
  }

  toString(): string {
    return this.name;
  }

  static readCaves(path: PathOrFileDescriptor): Cave[] {
    let input: string[][] = fs.readFileSync(path).toString().split('\n')
      .map(line => line.split("-"));
    
    let caves: Cave[] = [...new Set(input.flat())].map(name => new Cave(name));
    for (const cave of caves) {
      cave.connections = input
        .filter(connectionName => connectionName[0] === cave.name || connectionName[1] === cave.name)
        .map(connectionName => connectionName[0] === cave.name ? connectionName[1] : connectionName[0])
        .map(connectionName => caves.find(cave => cave.name === connectionName))
        .map(cave => cave!);
    }

    return caves;
  }
}
