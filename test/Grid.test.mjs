import { expect } from "chai";
import { beforeEach, describe, test } from "vitest";
import { Grid } from "../src/Grid.mjs";
import { CELL_STATES } from "../src/Cell.mjs";

describe('Grid class', () => {
  const width = 3;
  const height = 3;

  let grid;

  beforeEach(() => {
    grid = new Grid(width, height);
  });

  test('shoud be initialized with correct dimmensions', () => {
    expect(grid.width()).to.equal(3);
    expect(grid.height()).to.equal(3);

    const otherWidth = 5;
    const otherHeight = 7;

    grid = new Grid(otherWidth, otherHeight);
    expect(grid.width()).to.equal(5);
    expect(grid.height()).to.equal(7);
  });

  test('should initialize with  all cells dead', () => {
    for (let row = 0; row < grid.height(); row++) {
      for (let col = 0; col < grid.width();col++) {
        expect(grid.cellAt(row, col).isAlive()).to.be.false;
      }
    }
  });

  test('should throw error for out of bound access', () => {
    expect(() => grid.cellAt(-1, 0)).to.throw(Error, 'Coordinates out of bound');
    expect(() => grid.cellAt(0, -1)).to.throw(Error, 'Coordinates out of bound');
    expect(() => grid.cellAt(3, 0)).to.throw(Error, 'Coordinates out of bound');
    expect(() => grid.cellAt(0, 6)).to.throw(Error, 'Coordinates out of bound');
  });

  test('shoud change cells state correctly', () => {
    grid.setCellStateAt(1, 0, CELL_STATES.ALIVE)
    expect(grid.cellAt(1, 0).isAlive()).to.be.true;

    grid.setCellStateAt(1, 1, CELL_STATES.ALIVE)
    expect(grid.cellAt(1, 1).isAlive()).to.be.true;

    grid.setCellStateAt(1, 1, CELL_STATES.DEAD)
    expect(grid.cellAt(1, 1).isAlive()).to.be.false;

  });
});