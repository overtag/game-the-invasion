import * as PIXI from 'pixi.js';

import { config } from './config.js';
import { EVENTS, eventEmitter } from './events/EventEmitter.js';

export class Controller extends PIXI.Container {
  constructor() {
    super();

    this.gameState = 0;
    this.currentLevel = 0;
    this.vol = 1;
    this.sound = 0;

    eventEmitter.on(EVENTS.NEW_GAME_CONTROLLER, this.newGame, this);
  }

  newGame() {
    const data = {
      state: config.STATE_SCREEN_GAME,
    };

    eventEmitter.emit(EVENTS.SET_STATE, { state: config.STATE_SCREEN_GAME });
  }

  init() {
    eventEmitter.emit(EVENTS.SET_STATE, { state: config.STATE_SCREEN_LOBBY });
  }
}
