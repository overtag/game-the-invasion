import * as PIXI from 'pixi.js';
import { config } from '../config';
import { eventEmitter, EVENTS } from '../events/EventEmitter';

import { Lobby } from './Lobby';
import { Game } from './Game';

export class Core extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Graphics();
    bg.beginFill(0x235a3b);
    bg.drawRect(0, 0, config.defaultWidth, config.defaultHeight);
    bg.endFill();
    this.addChild(bg);

    this.visible = false;
    eventEmitter.on(EVENTS.SET_SCREEN, this.setScreen, this);

    this.game = new Game();
    this.addChild(this.game);

    this.lobby = new Lobby();
    this.addChild(this.lobby);
  }

  setScreen(evt) {
    this.visible = true;

    switch (evt.state) {
      case 1:
        this.game.hide();
        this.lobby.show();
        break;
      case 2:
        this.game.show();
        this.lobby.hide();
        break;
    }
  }
}
