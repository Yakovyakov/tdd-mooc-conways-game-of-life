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
  });
});