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
  });
});