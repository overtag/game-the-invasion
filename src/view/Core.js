import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';

import { Lobby } from './Lobby';
import { Game } from './Game';
import { TrapScreen } from './TrapScreen';
import { GameOverScreen } from './GameOverScreen';
import { LevelsScreen } from './LevelsScreen';
import { WinScreen } from './WinScreen';

export class Core extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Sprite(PIXI.Texture.fromImage('LevelCemetery'));
    bg.position.set(config.defaultWidth * 0.5, 0);
    bg.anchor.set(0.5, 0);

    this.addChild(bg);

    window.bg = bg;

    this.visible = false;

    this.game = new Game();
    this.addChild(this.game);

    this.lobby = new Lobby();
    this.addChild(this.lobby);

    this.trapScreen = new TrapScreen();
    this.addChild(this.trapScreen);

    this.gameOverScreen = new GameOverScreen();
    this.addChild(this.gameOverScreen);

    this.winScreen = new WinScreen();
    this.addChild(this.winScreen);

    this.levelsScreen = new LevelsScreen();
    this.addChild(this.levelsScreen);

    eventEmitter.on(EVENTS.SET_SCREEN, this.setScreen, this);
  }

  enemyDeath() {
    this.enemies;
  }

  setScreen(evt) {
    this.visible = true;
    console.log('ev1t', evt);
    switch (evt.state) {
      case config.STATE_SCREEN_GAME:
        this.game.show();
        this.trapScreen.show();

        this.lobby.hide();
        this.levelsScreen.hide();
        this.gameOverScreen.hide();
        this.winScreen.hide();
        break;

      case config.STATE_SCREEN_LOBBY:
        this.lobby.show();

        this.game.hide();
        this.trapScreen.hide();
        this.levelsScreen.hide();
        this.gameOverScreen.hide();
        this.winScreen.hide();
        break;

      case config.STATE_SCREEN_LEVELS:
        this.levelsScreen.show();

        this.game.hide();
        this.trapScreen.hide();
        this.lobby.hide();
        this.gameOverScreen.hide();
        this.winScreen.hide();
        break;

      case config.STATE_SCREEN_GAME_OVER:
        this.game.show();
        this.trapScreen.show();
        this.gameOverScreen.show();

        this.lobby.hide();
        this.levelsScreen.hide();
        this.winScreen.hide();
        break;

      case config.STATE_SCREEN_WIN:
        this.game.show();
        this.trapScreen.show();

        this.lobby.hide();
        this.levelsScreen.hide();
        this.gameOverScreen.hide();
        this.winScreen.show();
        break;
    }
  }
}
