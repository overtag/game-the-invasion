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
    this.gold = 10;
    this.health = 3;

    eventEmitter.on(EVENTS.NEW_GAME_CONTROLLER, this.newGame, this);
    eventEmitter.on(EVENTS.PAY_TRAP, this.payTrap, this);
  }

  payTrap(evt) {
    console.log('PAY_TRAP', evt);
    this.gold -= evt.type;

    eventEmitter.emit(EVENTS.UPDATE_GOLD, { gold: this.gold });
    eventEmitter.emit(EVENTS.UPDATE_GOLD, { gold: this.gold });

    console.log('evt.type', evt.type);
  }

  newGame() {
    const data = {
      state: config.STATE_SCREEN_GAME,
    };

    eventEmitter.emit(EVENTS.SET_STATE, data);
    eventEmitter.emit(EVENTS.UPDATE_GOLD, { gold: this.gold });
  }

  init() {
    eventEmitter.emit(EVENTS.SET_STATE, { state: config.STATE_SCREEN_LOBBY });
  }
}
