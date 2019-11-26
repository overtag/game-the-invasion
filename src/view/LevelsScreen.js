import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';

function update(obj) {
  obj.update();
}

export class LevelsScreen extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Graphics();
    bg.beginFill(0xffcc00);
    bg.drawRect(0, 0, config.defaultWidth, config.defaultHeight);
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
