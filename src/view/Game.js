import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';
import { BottomPanel } from './BottomPanel';

export class Game extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Graphics();
    bg.beginFill(0xffcc00);
    bg.drawRect(0, 0, config.defaultWidth, config.defaultHeight);
    bg.endFill();
    this.addChild(bg);

    this.bottomPanel = new BottomPanel();
    this.bottomPanel.position.set(0, config.defaultHeight - this.bottomPanel.height);
    this.addChild(this.bottomPanel);
    this.visible = false;

    this.tiker = new PIXI.ticker.Ticker();
    this.tiker.add(this.enterFrame.bind(this));
    PIXI.ticker.Ticker.FPS = 60;
    this.tiker.stop();

    eventEmitter.on(EVENTS.NEW_GAME_VIEW, this.newGame, this);
  }

  newGame() {}

  enterFrame(evt) {}

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
