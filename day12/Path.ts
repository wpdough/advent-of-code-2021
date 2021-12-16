import Cave from './Cave'

export default class Path {
  nodes: Cave[] = [];

  constructor(nodes: Cave[]) {
    this.nodes = nodes;
  }

  add(node: Cave): void {
    this.nodes.push(node);
  }

  last(): Cave {
    return this.nodes[this.nodes.length - 1];
  }

  hasCave(cave: Cave): boolean {
    return this.nodes.filter(c => c === cave).length > 0;
  }

  hasTwoOfTheSameSmallCaves(): boolean {
    // unique caves
    let uniqueSmallCaves: Cave[] = [... new Set(this.nodes.filter(node => node.isSmall()))];
    let uniqueSmallCavesQuantities: number[] = uniqueSmallCaves
      .map(cave => this.nodes.filter(node => node === cave).length);
    return Math.max(...uniqueSmallCavesQuantities) === 2;
  }

  fork(node: Cave): Path {
    return new Path([...this.nodes, node]);
  }

  toString(): string {
    return this.nodes.join(",");
  }
}