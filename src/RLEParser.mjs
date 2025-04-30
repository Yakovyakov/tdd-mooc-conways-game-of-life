import { CELL_STATES } from "./Cell.mjs";
import { Grid } from "./Grid.mjs";

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

  parseToGrid() {
    const grid = new Grid(this.width, this.height);

    const patternMatch = this.pattern.match(/([bo$!]+)/i);

    if (!patternMatch) {
      return grid;
    }

    const pattern = patternMatch[0];
    let row = 0;
    let col = 0;

    for (const char of pattern) {
      if (char === '!') {
        break;
      }

      if (char === '$') {
        row++;
        col = 0;
        continue;
      }

      if (/[bo]/.test(char)) {

        const state = char === 'b' ? CELL_STATES.DEAD : CELL_STATES.ALIVE;

        if (row < this.height && col < this.width) {
          grid.setCellStateAt(row, col, state);
        }
        col++;
      }

    }
    return grid;
  }
}
