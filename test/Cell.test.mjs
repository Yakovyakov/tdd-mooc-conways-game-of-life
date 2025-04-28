import { describe, test } from "vitest";
import Cell, { CELL_STATES } from "../src/Cell.mjs";
import { expect } from "chai";

describe('Cell class', () => {
  test('should be initialized with right state(ALIVE or DEAD), DEAD is a default', () => {
    const aliveCell = new Cell(CELL_STATES.ALIVE);
    expect(aliveCell.isAlive()).to.be.true;

    const deadCell = new Cell(CELL_STATES.DEAD);
    expect(deadCell.isAlive()).to.be.false;

    const defaultCell = new Cell();
    expect(defaultCell.isAlive()).to.be.false;

  });

  test('should throw error if invalid state', () => {
    expect(() => new Cell('invalid')).to.throw(Error, 'Invalid state');
  });

  test('should be possible to stablish state', () => {

    // dead cell
    const cell = new Cell();

    cell.setState(CELL_STATES.ALIVE);
    expect(cell.isAlive()).to.be.true;
    cell.setState(CELL_STATES.DEAD);
    expect(cell.isAlive()).to.be.false;
  });

  test('setStae should throw error if invalid state', () => {
    // dead cell
    const cell = new Cell();

    expect(() => cell.setState('invalid')).to.throw(Error, 'Invalid state');
  });
});