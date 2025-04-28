
export class RLEParser {
  constructor(rleString) {
    this.rleString = rleString;
    this.parserHeader();
  }

  parserHeader() {
    const lines = this.rleString
      .split('\n')
      .map(line => line.trim());


    const headerLine = lines.find(line => line.startsWith('x'));
    if (!headerLine) {
      throw new Error('Invalid header');
    }

    const headerMatch = headerLine.match(/x\s*=\s*(\d+)\s*,\s*y\s*=\s*(\d+)/i);

    this.header = headerLine;
    this.pattern = lines.slice(lines.indexOf(headerLine) + 1).join('');

  }
}
