
export class RLEParser {
  constructor(rleString) {
    this.rleString = rleString;
    this.parserHeader();
  }

  parserHeader() {
    const lines = this.rleString
      .split('\n')
      .filter(line => !line.trim().startsWith('#'))
      .map(line => line.trim());


    const headerLine = lines.find(line => line.startsWith('x'));
    if (!headerLine) {
      throw new Error('Invalid header');
    }

    const headerMatch = headerLine.match(/x\s*=\s*(\d+)\s*,\s*y\s*=\s*(\d+)/i);

    if (!headerMatch) {
      throw new Error('Invalid header');
    }

    this.width = parseInt(headerMatch[1]);
    this.height = parseInt(headerMatch[2]);
    this.header = headerLine;
    this.pattern = lines.slice(lines.indexOf(headerLine) + 1).join('');

  }
}
