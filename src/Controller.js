import * as PIXI from 'pixi.js';

import { config } from './config.js';
import { EVENTS, eventEmitter } from './events/EventEmitter.js';
import { EventEmitter } from 'events';

const STATE_GAME = 1;
const STATE_LOBBY = 2;
const STATE_PAUSE = 3;

const STATE_START_GAME = 4;
const STATE_GAME_OVER = 5;
const STATE_YOU_WIN = 6;

export class Controller extends PIXI.Container {
  constructor() {
    super();

    this.gameState = 0;
    this.currentLevel = 0;
    this.vol = 1;
    this.sound = 0;
  }

  init() {
    eventEmitter.emit(EVENTS.SET_SCREEN, { state: STATE_LOBBY });
  }
}
