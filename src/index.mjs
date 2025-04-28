
export function runGameOfLife(inputFile, generations) {
  try {
    return `${inputFile} ${generations}`;
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