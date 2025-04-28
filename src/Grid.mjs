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

  #isOutOfBound(row, col) {
    return row < 0 ||
      row >= this.#height ||
      col < 0 ||
      col >= this.#width;
  }
}
