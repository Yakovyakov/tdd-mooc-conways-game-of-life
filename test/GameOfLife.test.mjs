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

    test('dead cell with 3 live neighbors, will live, born', () => {
      const randomNeighbors = shuffleAndPickCopy(testNeighbors, 3);

      setLiveCellsToGrid(gameOfLife.grid, randomNeighbors);
      expect(gameOfLife.willLive(testCell.row, testCell.col), '3 live neighbors, live, born').to.be.true;

    });

  });


  describe('general patterns', () => {
    test('should compute next generation', () => {
      const initialGrid = new Grid(3, 3);

      // test pattern, blinker
      //  b b b
      //  o o o
      //  b b b

      const initialLiveCells = [
        {row: 1, col: 0},
        {row: 1, col: 1},
        {row: 1, col: 2},
      ];

      setLiveCellsToGrid(initialGrid, initialLiveCells);

      const gameOfLife = new GameOfLife(initialGrid);

      const expectedLiveCells = [
        {row: 0, col: 1},
        {row: 1, col: 1},
        {row: 2, col: 1},
      ];

      gameOfLife.nextGeneration();
      testGrid(gameOfLife.grid, expectedLiveCells);

    });

    test('should compute multiple generations', () => {
      const initialGrid = new Grid(4, 4);

      // test pattern, blinker
      //  b b o b
      //  o b o b
      //  b o o b
      //  b b b b

      const initialLiveCells = [
        {row: 0, col: 2},
        {row: 1, col: 0},
        {row: 1, col: 2},
        {row: 2, col: 1},
        {row: 2, col: 2},
      ];

      setLiveCellsToGrid(initialGrid, initialLiveCells);
      const gameOfLife = new GameOfLife(initialGrid);

      const liveCellsAfter2Rounds = [
        {row: 0, col: 2},
        {row: 1, col: 3},
        {row: 2, col: 1},
        {row: 2, col: 2},
        {row: 2, col: 3},
      ];

      gameOfLife.simulate(2);
      testGrid(gameOfLife.grid, liveCellsAfter2Rounds);
      expect(gameOfLife.generations).to.equal(2);

      const liveCellsAfter4Rounds = [
        {row: 1, col: 3},
        {row: 2, col: 1},
        {row: 2, col: 3},
        {row: 3, col: 2},
        {row: 3, col: 3},
      ];

      // another 2 rounds
      gameOfLife.simulate(2);
      testGrid(gameOfLife.grid, liveCellsAfter4Rounds);
      expect(gameOfLife.generations).to.equal(4);

    });
  });

  describe('expand world', () => {
    describe('predict', () => {
      test('should predict if grid must to expand on top', () => {
        const initialGrid = new Grid(3, 3);
        const initialLiveCells = [
          {row: 0, col: 0},
          {row: 0, col: 1},
          {row: 0, col: 2},
        ];
  
        setLiveCellsToGrid(initialGrid, initialLiveCells);
        const gameOfLife = new GameOfLife(initialGrid);

        const {shouldExpand, top, bottom, left, right} = gameOfLife.detectBoundaryExpansionNeeded();
        expect(shouldExpand).to.be.true;
        expect(top).to.equal(1);
        expect(bottom).to.equal(0);
        expect(left).to.equal(0);
        expect(right).to.equal(0);
  
      });
      test('should predict if grid must to expand on bottom', () => {
        const initialGrid = new Grid(3, 3);
        const initialLiveCells = [
          {row: 2, col: 0},
          {row: 2, col: 1},
          {row: 2, col: 2},
        ];
  
        setLiveCellsToGrid(initialGrid, initialLiveCells);
        const gameOfLife = new GameOfLife(initialGrid);

        const {shouldExpand, top, bottom, left, right} = gameOfLife.detectBoundaryExpansionNeeded();
        expect(shouldExpand).to.be.true;
        expect(top).to.equal(0);
        expect(bottom).to.equal(1);
        expect(left).to.equal(0);
        expect(right).to.equal(0);
  
      });

      test('should predict if grid must to expand on left', () => {
        const initialGrid = new Grid(3, 3);
        const initialLiveCells = [
          {row: 0, col: 0},
          {row: 1, col: 0},
          {row: 2, col: 0},
        ];
  
        setLiveCellsToGrid(initialGrid, initialLiveCells);
        const gameOfLife = new GameOfLife(initialGrid);

        const {shouldExpand, top, bottom, left, right} = gameOfLife.detectBoundaryExpansionNeeded();
        expect(shouldExpand).to.be.true;
        expect(top).to.equal(0);
        expect(bottom).to.equal(0);
        expect(left).to.equal(1);
        expect(right).to.equal(0);
  
      });
      test('should predict if grid must to expand on right', () => {
        const initialGrid = new Grid(3, 3);
        const initialLiveCells = [
          {row: 0, col: 2},
          {row: 1, col: 2},
          {row: 2, col: 2},
        ];
  
        setLiveCellsToGrid(initialGrid, initialLiveCells);
        const gameOfLife = new GameOfLife(initialGrid);

        const {shouldExpand, top, bottom, left, right} = gameOfLife.detectBoundaryExpansionNeeded();
        expect(shouldExpand).to.be.true;
        expect(top).to.equal(0);
        expect(bottom).to.equal(0);
        expect(left).to.equal(0);
        expect(right).to.equal(1);
  
      });

      test('should predict if must expand on all possible directioins', () => {
        const initialGrid = new Grid(3, 3);

        const testSides = [
          {
            liveCells: [
              {row: 0, col: 0},
              {row: 0, col: 1},
              {row: 0, col: 2},
            ],
            description: 'topSide',
          },
          {
            liveCells: [
              {row: 2, col: 0},
              {row: 2, col: 1},
              {row: 2, col: 2},
            ],
            description: 'bottomSide',
          },
          {
            liveCells: [
              {row: 0, col: 0},
              {row: 1, col: 0},
              {row: 2, col: 0},
            ],
            description: 'leftSide',
          },
          {
            liveCells: [
              {row: 0, col: 2},
              {row: 1, col: 2},
              {row: 2, col: 2},
            ],
            description: 'rightSide',
          },
        ];

        for (const n of [1, 2, 3, 4]) {
          setAllCellsDead(initialGrid);
          const randomSides = shuffleAndPickCopy(testSides, n);
          for (let i = 0; i < n; i++) {
            setLiveCellsToGrid(initialGrid, randomSides[i].liveCells);
          }
          const gameOfLife = new GameOfLife(initialGrid);
          const {shouldExpand, top, bottom, left, right} = gameOfLife.detectBoundaryExpansionNeeded();
          expect(shouldExpand).to.be.true;
          let expectTop = 0, expectBottom = 0, expectLeft = 0, expectRight = 0;

          const existTopSide = randomSides.some(side => side.description === 'topSide')
          if (existTopSide)
            expectTop = 1;
          const existBottomSide = randomSides.some(side => side.description === 'bottomSide')
          if (existBottomSide)
            expectBottom = 1;
          const existLeftSide = randomSides.some(side => side.description === 'leftSide')
          if (existLeftSide)
            expectLeft = 1;
          const existRightSide = randomSides.some(side => side.description === 'rightSide')
          if (existRightSide)
            expectRight = 1;

          expect(top).to.equal(expectTop);
          expect(bottom).to.equal(expectBottom);
          expect(left).to.equal(expectLeft);
          expect(right).to.equal(expectRight);
          
          
        }

      });

    });

    describe('expand grid', () => {
      test('should expand on all posible directions', () => {
        const width = 3;
        const height = 3;

        const initialGrid = new Grid(width, height);
        const testCell = {row: 1, col: 1};
        
        initialGrid.setCellStateAt(testCell.row, testCell.col, CELL_STATES.ALIVE);

        const testSide = [
          {
            description: 'topSide'
          },
          {
            description: 'bottomSide'
          },
          {
            description: 'leftSide'
          },
          {
            description: 'rightSide'
          },
        ];

        for (const n of [1, 2, 3, 4]) {
          const randomSides = shuffleAndPickCopy(testSide, n);

          const gameOfLife = new GameOfLife(initialGrid);

          let top = 0, bottom = 0, left = 0, right = 0;

          const existTopSide = randomSides.some(side => side.description === 'topSide')
          if (existTopSide)
            top = 1;
          const existBottomSide = randomSides.some(side => side.description === 'bottomSide')
          if (existBottomSide)
            bottom = 1;
          const existLeftSide = randomSides.some(side => side.description === 'leftSide')
          if (existLeftSide)
            left = 1;
          const existRightSide = randomSides.some(side => side.description === 'rightSide')
          if (existRightSide)
            right = 1;
          gameOfLife.expandGrid(top, bottom, left, right);
          const expectedLiveCells = [
            {row: 1 + top, col: 1 + left}
          ]

          expect(gameOfLife.grid.width()).to.equal(initialGrid.width() + left + right);
          expect(gameOfLife.grid.height()).to.equal(initialGrid.height() + top + bottom);
          testGrid(gameOfLife.grid, expectedLiveCells);

        }
      });

    });

    test('should simulate and expand Grid if necesary', () => {
      const height = 1;
      const width = 3;

      // blinker
      const initialLiveCells = [
        {row: 0, col: 0},
        {row: 0, col: 1},
        {row: 0, col: 2},
        
      ];

      const liveCellsNonRounds = [
        {row: 0, col: 1},
        {row: 1, col: 1},
        {row: 2, col: 1},
      ];

      const initialGrid = new Grid(width, height);
      setLiveCellsToGrid(initialGrid, initialLiveCells);

      const gameOfLife = new GameOfLife(initialGrid);

      gameOfLife.simulate(3);

      expect(gameOfLife.generations).to.equal(3);
      expect(gameOfLife.grid.width()).to.equal(3);
      expect(gameOfLife.grid.height()).to.equal(3);
      testGrid(gameOfLife.grid, liveCellsNonRounds);

    });
  });

});