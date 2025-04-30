import { beforeEach, describe, test } from "vitest";
import { Grid } from "../src/Grid.mjs";
import { setAllCellsDead, setLiveCellsToGrid, shuffleAndPickCopy, testGrid } from "./util.mjs";
import { expect } from "chai";
import { GameOfLife } from "../src/GameOfLife.mjs";
import { CELL_STATES } from "../src/Cell.mjs";

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

  describe('block basic pattern', () => {
    let gameOfLife;

    const blockCells = [
      {row: 0, col: 0},
      {row: 0, col: 1},
      {row: 1, col: 0},
      {row: 1, col: 1},
    ];

    beforeEach(() => {
      const initialGrid = new Grid(2, 2);

      setLiveCellsToGrid(initialGrid, blockCells);

      gameOfLife = new GameOfLife(initialGrid)
    });

    test('should compute next generation', () => {
      gameOfLife.nextGeneration();
      testGrid(gameOfLife.grid, blockCells);
      expect(gameOfLife.generations).to.equal(1);
    });

    test('should compute multiple generations', () => {
      gameOfLife.simulate(3);
      testGrid(gameOfLife.grid, blockCells);
      expect(gameOfLife.generations).to.equal(3);
    });

  });

  describe('game rules set', () => {
    let grid;
    let gameOfLife;

    const testNeighbors = [
      {row: 0, col: 0},
      {row: 0, col: 1},
      {row: 0, col: 2},
      {row: 1, col: 0},
      {row: 1, col: 2},
      {row: 2, col: 0},
      {row: 2, col: 1},
      {row: 2, col: 2},
    ];

    const testCell = {row: 1, col: 1};

    beforeEach(() => {
      grid = new Grid(3, 3);
      gameOfLife = new GameOfLife(grid);

    });

    test('live cell with 2 < neighbors, dies', () => {

      gameOfLife.grid.setCellStateAt(testCell.row, testCell.col, CELL_STATES.ALIVE);

      expect(gameOfLife.willLive(testCell.row, testCell.col), 'no live neighbors, dies').to.be.false;

      const randomNeighbors = shuffleAndPickCopy(testNeighbors, 1);

      setLiveCellsToGrid(gameOfLife.grid, randomNeighbors);
      expect(gameOfLife.willLive(testCell.row, testCell.col), '1 live neighbors, dies').to.be.false;


    });

    test('live cell with 2 - 3 live neighbors, will live', () => {
      
      for (const n of [2, 3]) {
        setAllCellsDead(gameOfLife.grid);
        gameOfLife.grid.setCellStateAt(testCell.row, testCell.col, CELL_STATES.ALIVE);
        const randomNeighbors = shuffleAndPickCopy(testNeighbors, n);

        setLiveCellsToGrid(gameOfLife.grid, randomNeighbors);
        expect(gameOfLife.willLive(testCell.row, testCell.col), `${n} live neighbors, will live`).to.be.true;
      }
    });

    test('live cell with + 3 live neighbors, will dies', () => {
      
      for (const n of [4, 5, 6, 7, 8]) {
        setAllCellsDead(gameOfLife.grid);
        gameOfLife.grid.setCellStateAt(testCell.row, testCell.col, CELL_STATES.ALIVE);
        const randomNeighbors = shuffleAndPickCopy(testNeighbors, n);

        setLiveCellsToGrid(gameOfLife.grid, randomNeighbors);
        expect(gameOfLife.willLive(testCell.row, testCell.col), `${n} live neighbors, will dies`).to.be.false;
      }
    });

  });
});