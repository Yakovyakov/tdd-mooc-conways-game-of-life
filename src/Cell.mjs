
export const CELL_STATES = Object.freeze({
  ALIVE: Symbol('alive'),
  DEAD: Symbol('dead')
});

export default class Cell {
  #state;

  constructor(initialState = CELL_STATES.DEAD) {
    this.#state = initialState;
  }

  isAlive() {
    return this.#state === CELL_STATES.ALIVE;
  }
}

