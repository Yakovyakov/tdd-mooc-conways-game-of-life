import { describe, test } from "vitest";
import { Grid } from "../src/Grid.mjs";
import { setLiveCellsToGrid, testGrid } from "./util.mjs";
import { expect } from "chai";
import { GameOfLife } from "../src/GameOfLife.mjs";

describe('GameOfLife class', () => {
  test('should be initialize with an initial Grid correctly', () => {
    const initialGrid = new Grid(3, 3);

    const cellsLive = [
      {row: 0, col: 0},
      {row: 1, col: 0},
      {row: 2, col: 2},
    ];

    setLiveCellsToGrid(initialGrid, cellsLive);

    const gameOfLife = new GameOfLife(initialGrid);

    expect(gameOfLife.grid.width()).to.equal(3);
    expect(gameOfLife.grid.height()).to.equal(3);
    expect(gameOfLife.generations).to.equal(0);

    testGrid(gameOfLife.grid, cellsLive);
  });
});