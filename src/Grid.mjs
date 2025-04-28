
export class Grid {
  #width;
  #height;
  #cells;
  constructor(width, height) {
    this.#width = width;
    this.#height = height;

    this.#cells = [];

  }

  width() {
    return this.#width;
  }

  height() {
    return this.#height;
  }
}
