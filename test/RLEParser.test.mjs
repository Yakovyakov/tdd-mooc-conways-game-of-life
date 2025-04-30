import { expect } from "chai";
import { describe, test } from "vitest";
import { RLEParser } from "../src/RLEParser.mjs";

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
  });
});