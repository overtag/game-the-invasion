import * as PIXI from 'pixi.js';
import { config } from '../config';
import { Names } from './Names';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { HealthBar } from '../health/HealthBar';

export class EnemyBase extends PIXI.Container {
  constructor() {
    super();

    const trapTexture = this.createRectangleButton().generateCanvasTexture();
    this.sprite = new PIXI.Sprite(trapTexture);
    this.addChild(this.sprite);

    this.health = 1;
    this.sprite = null;
  }

  createRectangleButton() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 80, 80);
    graphics.endFill();

    return graphics;
  }
}
