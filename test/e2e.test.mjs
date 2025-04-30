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
  
  describe('simulate Blinker pattern', () => {
    test('odd number of rounds', () => {
      const result  = runGameOfLife('./testdata/blinker.rle', 3);
      expect(result).to.equal('x = 3, y = 3\nbo$bo$bo!');
  
    });


    test('even number of rounds', () => {
      const result  = runGameOfLife('./testdata/blinker.rle', 6);
      expect(result).to.equal('x = 3, y = 3\n$3o!');
  
    });

  });

  describe('simulate Glider pattern', () => {
    test('glider pattern', () => {
      const result  = runGameOfLife('./testdata/glider.rle', 4);
      expect(result).to.equal('x = 4, y = 4\n$2bo$3bo$b3o!');

    });
  });
  
});