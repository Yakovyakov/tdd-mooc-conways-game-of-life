
export const CELL_STATES = Object.freeze({
  ALIVE: Symbol('alive'),
  DEAD: Symbol('dead')
});

export default class Cell {
  #state;

  constructor(initialState = CELL_STATES.DEAD) {
    if (!Object.values(CELL_STATES).includes(initialState)) {
      throw new Error('Invalid state');
    }
    this.#state = initialState;
  }

  isAlive() {
    return this.#state === CELL_STATES.ALIVE;
  }
}

