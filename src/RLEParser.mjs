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

    const patternMatch = this.pattern.match(/([bo\d$!]+)/i);

    if (!patternMatch) {
      return grid;
    }

    const pattern = patternMatch[0];
    let row = 0;
    let col = 0;

    let countBuffer = '';

    for (const char of pattern) {
      if (char === '!') {
        break;
      }

      if (char === '$') {
        const count = countBuffer ? parseInt(countBuffer) : 1;
        row += count;
        col = 0;
        countBuffer = '';
        continue;
      }

      if (/[bo]/.test(char)) {
        const count = countBuffer ? parseInt(countBuffer) : 1;

        const state = char === 'b' ? CELL_STATES.DEAD : CELL_STATES.ALIVE;

        for (let i = 0; i < count; i++) {

          if (row < this.height && col < this.width) {
            grid.setCellStateAt(row, col, state);
          }
          col++;
        }
        countBuffer = '';
      } else if (/\d/.test(char)) {
        countBuffer += char;
      }
    }
    return grid;
  }

  static gridToRLE(grid) {
    let rle = `x = ${grid.width()}, y = ${grid.height()}\n`;

    let currentState = null;
    let currentRun = 0;
    let currentLineRun = 0;


    for (let row = 0; row < grid.height(); row++) {
      for (let col = 0; col < grid.width(); col++) {
        const cell = grid.cellAt(row, col);
        const state = cell.isAlive() ? 'o' : 'b';

        if (state === currentState) {
          currentRun++;
        } else {
          if (currentRun > 0) {
            if (currentLineRun > 0) {
              rle +=  (currentLineRun > 1 ? currentLineRun : '') + '$';
              currentLineRun = 0;
            }
            rle += (currentRun > 1 ? currentRun : '') + currentState;
          }
          currentState = state;
          currentRun = 1;
        }

        
      }

      if (currentRun > 0) {
        if (currentState !== 'b') {
          if (currentLineRun > 0) {
            rle += (currentLineRun > 1 ? currentLineRun : '') + '$';
            
          }
          rle += (currentRun > 1 ? currentRun : '') + currentState;
          currentLineRun = 1;
        } else {
          if (currentRun === grid.width()){
            currentLineRun++;
          } else {
            currentLineRun = 1;
          }
        }
        currentRun = 0;
        currentState = null;
      }
    }
    rle += '!';
    return rle;
  }
}
