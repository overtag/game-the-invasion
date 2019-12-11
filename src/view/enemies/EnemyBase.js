import * as PIXI from 'pixi.js';
import { config } from '../../config';
import { eventEmitter, EVENTS } from '../../events/EventEmitter';
import { getTexture, types } from './types';

export class EnemyBase extends PIXI.Container {
  constructor() {
    super();

    // this.sprite = new PIXI.Sprite(trapTexture);

    this.health = 1;
    this.sprite = null;
    this.speed = 3;
    this.textureArray = [];
    this.type = types.Patch;
  }

  initSprite() {
    this.textureArray = getTexture(this.type);
    this.sprite = new PIXI.extras.AnimatedSprite(this.textureArray);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.rotation = Math.PI / 2;
    this.sprite.position.set(0, 0);
    this.sprite.scale.set(2);
    this.sprite.gotoAndPlay(4);
    this.sprite.animationSpeed = 0.5;

    this.addChild(this.sprite);

    //this.addChild(this.createRectangle());
  }

  init(x, y) {
    this.initSprite();
    this.health = 1;
    // this.healthBar.init(this.health);
    this.sprite.gotoAndPlay(
      Math.floor(Math.random() * this.textureArray.length - 1),
    );
    this.sprite.alpha = 1;
    this.position.set(x, y);
    // this.healthBar.y = this.sprite.height - this.healthBar.height;
  }

  damage(value) {
    this.health -= value;
    if (this.health <= 0) {
      this.remove();
    }
  }

  update() {
    this.y += this.speed;

    if (this.y > config.ENEMY_MAX_Y) {
      eventEmitter.emit(EVENTS.ENEMY_HAS_COME, {});
      this.remove();
    }
  }

  remove() {
    eventEmitter.emit(EVENTS.ENEMY_DEATH, { enemy: this, gold: 5 });
  }

  createRectangleButton() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 80, 80);
    graphics.endFill();

    return graphics;
  }
}
