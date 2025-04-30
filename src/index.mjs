import fs from 'fs';
import { RLEParser } from './RLEParser.mjs';
import { GameOfLife } from './GameOfLife.mjs';
export function runGameOfLife(inputFile, generations) {
  try {
    const rleString = fs.readFileSync(inputFile, 'utf-8');
    const parser = new RLEParser(rleString);
    const initialGrid = parser.parseToGrid();

    const gameOfLife = new GameOfLife(initialGrid);
    gameOfLife.simulate(generations);
    const result = RLEParser.gridToRLE(gameOfLife.grid);
    return result;
  } catch (error) {
    console.error('Error: ', error.message);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [,, inputFile, generations] = process.argv;

  if (!inputFile || !generations) {
    console.log('Usage: node src/index.mjs <input.rle> <generations>');
    process.exit(1);
  }

  const result = runGameOfLife(inputFile, generations);
  console.log(result);
}