import { expect } from "chai";
import { describe, test } from "vitest";
import { RLEParser } from "../src/RLEParser.mjs";
import { setLiveCellsToGrid, testGrid } from "./util.mjs";
import { Grid } from "../src/Grid.mjs";

describe('RLEParser', () => {
  describe('RLE to Grid', () => {
    test('should split file in header and pattern', () => {
      const rleString = 'x = 3, y = 2\nbo$2o!';

      const rleParser = new RLEParser(rleString);

      expect(rleParser.header).to.equal('x = 3, y = 2');
      expect(rleParser.pattern).to.equal('bo$2o!');      
    });

    test('should throw error with empty file', () => {
      expect(() => new RLEParser('')).to.throw(Error, 'Invalid header');
    });

    test('should throw error with invalid header', () => {
      const rleString = 'x = 3, x = 2\nbo$2o!';
      expect(() => new RLEParser(rleString)).to.throw(Error, 'Invalid header');
    });

    test('should ignore comments, and empty lines', () => {
      const rleString = `
        #N Glider
        #O Richard K. Guy
        #C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.
        #C www.conwaylife.com/wiki/index.php?title=Glider

        x = 3, y = 3, rule = B3/S23

        #C another comment


        bob$2bo$3o!


      `;

      const rleParser = new RLEParser(rleString);
      expect(rleParser.header).to.equal('x = 3, y = 3, rule = B3/S23');
      expect(rleParser.pattern).to.equal('bob$2bo$3o!');
    });

    test('pattern, multiple lines are joined into one', () => {
      const rleString = `
        #N Gosper glider gun
        #O Bill Gosper
        #C A true period 30 glider gun.
        #C The first known gun and the first known finite pattern with unbounded growth.
        #C www.conwaylife.com/wiki/index.php?title=Gosper_glider_gun
        x = 36, y = 9, rule = B3/S23
        24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8b
        o3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!
      `;

      const rleParser = new RLEParser(rleString);
      expect(rleParser.header).to.equal('x = 36, y = 9, rule = B3/S23');
      expect(rleParser.pattern).to.equal('24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8bo3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!');

    });

    test('should parser RLE header and initialize width and height', () => {
      const rleString = 'x = 3, y = 2\nbo$2bo!';

      const rleParser = new RLEParser(rleString);

      expect(rleParser.width).to.equal(3);
      expect(rleParser.height).to.equal(2);
      expect(rleParser.header).to.equal('x = 3, y = 2');
      expect(rleParser.pattern).to.equal('bo$2bo!');
    });

    test('should parse RLE pattern, non repeat tags', () => {
      const rleString = 'x = 2, y = 2\nbo$!';

      const rleParser = new RLEParser(rleString);

      const grid = rleParser.parseToGrid();

      const initialLiveCells = [
        {row: 0, col: 1}
      ];

      testGrid(grid, initialLiveCells);
    });

    test('should parse RLE pattern, repeat tags', () => {
      const rleString = 'x = 5, y = 5\n2b3o4$2o!';
      // test pattern
      //  bbooo
      //  bbbbb
      //  bbbbb
      //  bbbbb
      //  oobbb

      const rleParser = new RLEParser(rleString);

      const grid = rleParser.parseToGrid();

      const initialLiveCells = [
        {row: 0, col: 2},
        {row: 0, col: 3},
        {row: 0, col: 4},
        {row: 4, col: 0},
        {row: 4, col: 1},
      ];

      testGrid(grid, initialLiveCells);
    });

  });

  describe('Grid to LRE', () => {
    test('non repeat tags', () => {
      const grid = new Grid(2,2);

      // test pattern
      //  b o
      //  b o

      const initialLiveCells = [
        {row: 0, col: 1},
        {row: 1, col: 1},
      ];

      setLiveCellsToGrid(grid, initialLiveCells);

      const rle = RLEParser.gridToRLE(grid);

      expect(rle).to.equal('x = 2, y = 2\nbo$bo!');
    });

    test('repeat tags (b, o)', () => {
      const grid = new Grid(3,2);

      // test pattern
      //  b b o
      //  b o o

      const initialLiveCells = [
        {row: 0, col: 2},
        {row: 1, col: 1},
        {row: 1, col: 2},
      ];

      setLiveCellsToGrid(grid, initialLiveCells);

      const rle = RLEParser.gridToRLE(grid);

      expect(rle).to.equal('x = 3, y = 2\n2bo$b2o!');
    });

    test('ignore dead cells at end of lines', () => {
      const grid = new Grid(3,3);

      // test pattern
      //  b o b 
      //  o b b
      //  o o b

      const initialLiveCells = [
        {row: 0, col: 1},
        {row: 1, col: 0},
        {row: 2, col: 0},
        {row: 2, col: 1},
      ];

      setLiveCellsToGrid(grid, initialLiveCells);

      const rle = RLEParser.gridToRLE(grid);

      expect(rle).to.equal('x = 3, y = 3\nbo$o$2o!');
    });

  });
});



