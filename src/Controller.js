import * as PIXI from 'pixi.js';

import { config } from './config.js';
import { EVENTS, eventEmitter } from './events/EventEmitter.js';
import { WaveCreator } from './WaveCreator.js';

export class Controller extends PIXI.Container {
  constructor() {
    super();

    this.gameState = 0;
    this.currentLevel = 0;
    this.vol = 1;
    this.sound = 0;
    this.gold = 10;
    this.health = 3;

    this.tiker = new PIXI.ticker.Ticker();
    this.tiker.add(this.enterFrame.bind(this));
    PIXI.ticker.Ticker.FPS = 60;
    this.tiker.stop();

    this.waveCreator = new WaveCreator();

    eventEmitter.on(EVENTS.NEW_GAME_CONTROLLER, this.newGame, this);
    eventEmitter.on(EVENTS.PAY_TRAP, this.payTrap, this);
    eventEmitter.on(EVENTS.ENEMY_HAS_COME, this.enemyHasCome, this);
  }

  defaultSettings() {
    this.health = 3;
    this.glod = 10;
  }

  enemyHasCome() {
    this.health -= 1;

    if (this.health < 0) {
      eventEmitter.emit(EVENTS.SET_SCREEN, {
        state: config.STATE_SCREEN_GAME_OVER,
      });
      this.tiker.stop();
    }
    eventEmitter.emit(EVENTS.UPDATE_HEALTH, { health: this.health });
  }

  payTrap(evt) {
    this.gold -= evt.type;
    eventEmitter.emit(EVENTS.UPDATE_GOLD, { gold: this.gold });
  }

  newGame() {
    this.defaultSettings();
    const data = {
      state: config.STATE_SCREEN_GAME,
      level: 1,
    };

    this.tiker.start();
    this.waveCreator.play();

    eventEmitter.emit(EVENTS.CLEAN_GAME, {});
    eventEmitter.emit(EVENTS.SET_SCREEN, data);
    eventEmitter.emit(EVENTS.UPDATE_GOLD, { gold: this.gold });
    eventEmitter.emit(EVENTS.UPDATE_HEALTH, { health: this.health });
  }

  init() {
    eventEmitter.emit(EVENTS.SET_SCREEN, {
      state: config.STATE_SCREEN_LOBBY,
    });
  }

  enterFrame(evt) {
    if ((this.state = config.STATE_SCREEN_GAME)) {
      this.waveCreator.update();
      eventEmitter.emit(EVENTS.UPDATE, {});
    }
  }
}
