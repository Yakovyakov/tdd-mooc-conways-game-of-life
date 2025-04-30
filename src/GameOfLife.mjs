
export class GameOfLife {
  constructor(initialGrid) {
    this.grid = initialGrid;
    this.generations = 0;
  }

  nextGeneration() {
    this.generations++;
  }

  simulate(generations) {
    for (let i =0; i < generations; i++) {
      this.nextGeneration();
    }
  }
}
