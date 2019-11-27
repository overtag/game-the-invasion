import * as PIXI from 'pixi.js';
import { config } from '../../config';
import { eventEmitter, EVENTS } from '../../events/EventEmitter';

export class EnemyBase extends PIXI.Container {
  constructor() {
    super();

    const trapTexture = this.createRectangleButton().generateCanvasTexture();
    this.sprite = new PIXI.Sprite(trapTexture);
    this.addChild(this.sprite);

    this.health = 1;
    this.sprite = null;

    this.speed = 5;
  }

  createRectangleButton() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 80, 80);
    graphics.endFill();

    return graphics;
  }

  update() {
    this.y += this.speed;

    if (this.y > config.ENEMY_MAX_Y) {
      eventEmitter.emit(EVENTS.ENEMY_HAS_COME, {});
      this.remove();
    }
  }

  remove() {
    eventEmitter.emit(EVENTS.ENEMY_DEATH, { enemy: this });
  }
}
