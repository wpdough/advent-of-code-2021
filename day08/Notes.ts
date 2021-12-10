export default class Notes {
  signalPatterns: string[];
  digitOutputValues: string[];

  constructor(line: string) {
    [this.signalPatterns, this.digitOutputValues] = line.split(" | ").map(part => part.split(" "));
  }
}
