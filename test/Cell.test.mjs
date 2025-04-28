import { describe, test } from "vitest";
import { CELL_STATES } from "../src/Cell.mjs";
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
});