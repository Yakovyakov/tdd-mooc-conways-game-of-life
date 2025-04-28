import { expect } from "chai";
import { afterAll, beforeAll, describe, test } from "vitest";
import { runGameOfLife } from "../src/index.mjs";


describe('e2e', () => {
  const inputFile = 'test.rle';
  const generations = 4;

  beforeAll(() => {

  });

  afterAll(() => {

  });
  test('Walking skeleton', () => {
    const result  = runGameOfLife(inputFile, generations);
    expect(result).to.equal('test.rle 4');

  });
});