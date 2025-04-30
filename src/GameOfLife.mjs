
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

  willLive(row, col) {
    const cell = this.grid.cellAt(row, col);
    const numberOfLiveNeighbors = this.grid.countLiveNeighbors(row, col);

    if (cell.isAlive()) {
      return numberOfLiveNeighbors === 2 || numberOfLiveNeighbors === 3 ? true : false;
    }

    // for now
    return undefined
  }
}
