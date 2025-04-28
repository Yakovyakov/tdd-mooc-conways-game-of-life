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
  });
});