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
    return this.#cells[row][col];
  }
}
