import { expect } from "chai";
import { describe, test } from "vitest";

describe('CELL_STATES', () => {
  test('should be a frozen object', () => {
    expect(CELL_STATES).to.be.an('object');
    expect(CELL_STATES).to.be.frozen;
  });

});