import * as PIXI from 'pixi.js';
import { config } from '../../config';

export class HealthBar extends PIXI.Container {
  constructor() {
    super();

    this.cache = [];

    this.container = new PIXI.Container();
    this.addChild(this.container);
  }

  init(health) {
    this.updateBar(health);
  }

  damage(health) {
    this.updateBar(health);
  }

  updateBar(health) {
    this.cache.forEach(sprite => {
      sprite.visible = false;
    });
    for (let i = 0; i < health; i++) {
      if (this.cache.length <= i) {
        const hearth = new PIXI.Sprite(PIXI.Texture.fromImage('life0000'));

        hearth.anchor.set(0, 0);
        // hearth.scale.set(5, 5);
        hearth.position.set(i * 23, 0);
        this.container.addChild(hearth);
        this.cache.push(hearth);
      } else {
        this.cache[i].visible = true;
      }
    }

    this.container.position.set(0, 0);
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffcc00);
    graphics.drawRect(0, 0, 5, 5);
    graphics.endFill();

    return graphics;
  }
}
