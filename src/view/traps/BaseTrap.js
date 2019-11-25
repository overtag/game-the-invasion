import * as PIXI from 'pixi.js';
import { config } from '../../config';
import { eventEmitter, EVENTS } from '../../events/EventEmitter';

export class BaseTrap extends PIXI.Container {
  constructor() {
    super();

    const texture = this.createRectangle().generateCanvasTexture();
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5, 0.5);
    this.addChild(this.sprite);
  }

  init(point) {
    this.position.set(point.x, point.y);
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffcc00);
    graphics.drawRect(0, 0, 80, 80);
    graphics.endFill();

    return graphics;
  }
}
