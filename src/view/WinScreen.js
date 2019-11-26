import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';

function update(obj) {
  obj.update();
}

export class WinScreen extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Graphics();
    bg.beginFill(0xf26065);
    bg.drawRect(0, 0, config.defaultWidth, 200);
    bg.endFill();
    this.addChild(bg);
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
