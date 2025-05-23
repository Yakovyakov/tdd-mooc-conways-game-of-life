import Cell, { CELL_STATES } from "./Cell.mjs";

export class Grid {
  #width;
  #height;
  #cells;
  constructor(width, height) {
    this.#width = width;
    this.#height = height;

    this.#cells = [];
    for (let row = 0; row < this.height(); row++) {
      this.#cells[row] = [];
      for (let col = 0; col < this.width();col++) {
        this.#cells[row][col] = new Cell(CELL_STATES.DEAD);
      }
    }

  }

  width() {
    return this.#width;
  }

  height() {
    return this.#height;
  }

  cellAt(row, col) {
    if (this.#isOutOfBound(row, col)) {
      throw new Error('Coordinates out of bound');
    }
    return this.#cells[row][col];
  }

  setCellStateAt(row, col, newState) {
    this.cellAt(row, col).setState(newState);
  }

  countLiveNeighbors(row, col) {
    let count = 0;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) {
          // same cell
          continue;
        }
        const nx = col + dx;
        const ny = row + dy;

        if (!this.#isOutOfBound(ny, nx)) {
          if (this.cellAt(ny, nx).isAlive()) {
            count++;
          }
        }
      }
    }
    
    return count;
  }
  
  #isOutOfBound(row, col) {
    return row < 0 ||
      row >= this.#height ||
      col < 0 ||
      col >= this.#width;
  }
}
