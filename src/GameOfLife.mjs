
export class GameOfLife {
  constructor(initialGrid) {
    this.grid = initialGrid;
    this.generations = 0;
  }

  nextGeneration() {
    this.generations++;
  }
}
