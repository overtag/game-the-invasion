import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';

export class Lobby extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Graphics();
    bg.beginFill(0x235a3b);
    bg.drawRect(0, 0, config.defaultWidth, config.defaultHeight);
    bg.endFill();
    this.addChild(bg);

    this.visible = false;
    eventEmitter.on(EVENTS.SET_SCREEN, this.setScreen, this);
  }
}
