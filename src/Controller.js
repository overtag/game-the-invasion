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
    this.health = 1;

    this.tiker = new PIXI.ticker.Ticker();
    this.tiker.add(this.enterFrame.bind(this));
    PIXI.ticker.Ticker.FPS = 60;
    this.tiker.stop();

    this.waveCreator = new WaveCreator();

    eventEmitter.on(EVENTS.NEW_GAME_CONTROLLER, this.newGame, this);
    eventEmitter.on(EVENTS.PAY_TRAP, this.payTrap, this);
    eventEmitter.on(EVENTS.ENEMY_HAS_COME, this.enemyHasCome, this);
    eventEmitter.on(EVENTS.LEVEL_COMPLETE, this.levelComplete, this);
    eventEmitter.on(EVENTS.ENEMY_DEATH, this.enemyDeath, this);
  }

  enemyDeath(evt) {
    console.log('GOLD', evt, this.glod);

    this.gold += evt.gold;
    console.log('GOLD', evt, this.gold);

    eventEmitter.emit(EVENTS.UPDATE_GOLD, { gold: this.gold });
  }

  levelComplete() {
    eventEmitter.emit(EVENTS.SET_SCREEN, {
      state: config.STATE_SCREEN_WIN,
    });
    this.tiker.stop();
  }

  defaultSettings() {
    this.health = 1;
    this.gold = 10;
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
    this.gold -= evt.price;
    eventEmitter.emit(EVENTS.UPDATE_GOLD, { gold: this.gold });
  }

  newGame() {
    eventEmitter.emit(EVENTS.CLEAN_GAME, {});
    this.defaultSettings();
    const data = {
      state: config.STATE_SCREEN_GAME,
      level: 1,
    };

    this.tiker.start();
    this.waveCreator.play();

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
