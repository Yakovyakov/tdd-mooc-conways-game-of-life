import fs from 'fs';
import { expect } from "chai";
import { afterAll, beforeAll, describe, test } from "vitest";
import { runGameOfLife } from "../src/index.mjs";


describe('e2e', () => {
  const inputFile = 'test.rle';
  const generations = 4;
  const testRLE = 'x =2, y = 2\n2o$2o!'

  beforeAll(() => {
    fs.writeFileSync(inputFile, testRLE);

  });

  afterAll(() => {
    fs.unlinkSync(inputFile)

  });
  test('Integration test', () => {
    const result  = runGameOfLife(inputFile, generations);
    expect(result).to.equal('x = 2, y = 2\n2o$2o!');

  });
  /*
  describe('simulate Blinker pattern', () => {
    test('odd number of rounds', () => {
      const result  = runGameOfLife('./testdata/blinker.rle', 3);
      expect(result).to.equal('x = 3, y = 3\nbo$bo$bo!');
  
    });

  });
  */
});