import { expect } from "chai";
import { CELL_STATES } from "../src/Cell.mjs";


export function testGrid(grid, liveCells) {
  for (let row = 0; row < grid.height(); row++) {
    for (let col = 0; col < grid.width(); col++) {
      const cellExistInArray = liveCells.some(cell => cell.row === row && cell.col === col);
      if (cellExistInArray) {
        expect(grid.cellAt(row, col).isAlive(), `${row} ${col}`).to.be.true;
      } else {
        expect(grid.cellAt(row, col).isAlive(), `${row} ${col}`).to.be.false;
      }
    }
  }
}

export function setLiveCellsToGrid(grid, liveCells) {
  for (let row = 0; row < grid.height(); row++) {
    for (let col = 0; col < grid.width(); col++) {
      const cellExistInArray = liveCells.some(cell => cell.row === row && cell.col === col);
      if (cellExistInArray) {
        grid.setCellStateAt(row, col, CELL_STATES.ALIVE);
      }
    }
  }
}

export function setAllCellsDead(grid) {
  for (let row = 0; row < grid.height(); row++) {
    for (let col = 0; col < grid.width(); col++) {
      grid.setCellStateAt(row, col, CELL_STATES.DEAD);
    }
  }
}

export function shuffleAndPickCopy(array, n = 1) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, n);

}
