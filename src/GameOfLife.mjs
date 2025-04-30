import { CELL_STATES } from "./Cell.mjs";
import { Grid } from "./Grid.mjs";

export class GameOfLife {
  constructor(initialGrid) {
    this.grid = initialGrid;
    this.generations = 0;
  }

  nextGeneration() {

    const nextGrid = new Grid(this.grid.width(), this.grid.height());
    this.generations++;
    for (let row = 0; row < this.grid.height(); row++) {
      for (let col = 0; col < this.grid.width(); col++) {
        if (this.willLive(row,col)) {
          nextGrid.setCellStateAt(row, col, CELL_STATES.ALIVE);
        }
      }
    }
    this.grid = nextGrid;
  }

  simulate(generations) {
    for (let i =0; i < generations; i++) {
      this.nextGeneration();
    }
  }

  willLive(row, col) {
    const cell = this.grid.cellAt(row, col);
    const numberOfLiveNeighbors = this.grid.countLiveNeighbors(row, col);
    let willLive = false;
    if (cell.isAlive()) {
      willLive =  numberOfLiveNeighbors === 2 || numberOfLiveNeighbors === 3 ? true : false;
    } else { 
      willLive = numberOfLiveNeighbors === 3 ? true : false
    }
    
    return willLive
  }

  detectBoundaryExpansionNeeded() {
    let shouldExpand = false;

    let expandTop = 0, expandBottom =0, expandLeft = 0, expandRight = 0;

    const width = this.grid.width();
    const height = this.grid.height();

    // Top
    for (let i = 0; i < width; i++) {
      if (this.grid.countLiveNeighbors(-1, i) === 3) {
        expandTop = 1;
        break;
      }
    }
    // Bottom
    for (let i = 0; i < width; i++) {
      if (this.grid.countLiveNeighbors(height, i) === 3) {
        expandBottom = 1;
        break;
      }
    }

    return {
      shouldExpand: (expandTop || expandBottom || expandLeft || expandRight) ? true : false,
      top: expandTop,
      bottom: expandBottom,
      left: expandLeft,
      right: expandRight
    }
  }
}
