import { expect } from "chai";


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
