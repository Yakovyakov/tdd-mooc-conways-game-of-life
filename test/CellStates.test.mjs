import { expect } from "chai";
import { describe, test } from "vitest";
import { CELL_STATES } from "../src/Cell.mjs";

describe('CELL_STATES', () => {
  test('should be a frozen object with right property(ALIVE or DEAD)', () => {
    expect(CELL_STATES).to.be.an('object');
    expect(CELL_STATES).to.be.frozen;

    expect(CELL_STATES).to.have.keys('ALIVE', 'DEAD');
    expect(CELL_STATES.ALIVE.description).to.equal('alive');
    expect(CELL_STATES.DEAD.description).to.equal('dead');
    
  });

});