import { expect } from "chai";
import { beforeEach, describe, test } from "vitest";

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
});