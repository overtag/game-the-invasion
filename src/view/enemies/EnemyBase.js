import * as PIXI from 'pixi.js';
import { config } from '../../config';
import { eventEmitter, EVENTS } from '../../events/EventEmitter';
import { getTexture, types } from './types';
import { HealthBar } from '../health/HealthBar';

export class EnemyBase extends PIXI.Container {
  constructor() {
    super();

    // this.sprite = new PIXI.Sprite(trapTexture);
    this.timerId = 0;
    this.health = 1;
    this.sprite = null;
    this.speed = 3;
    this.textureArray = [];
    this.type = types.Patch;
    this.healthBar = new HealthBar();
    this.addChild(this.healthBar);

    this.spriteContainer = new PIXI.Container();
    // this.addChild(this.createRectangleButton());
    this.addChild(this.spriteContainer);
  }

  initSprite() {
    this.textureArray = getTexture(this.type);
    this.sprite = new PIXI.extras.AnimatedSprite(this.textureArray);
    this.sprite.rotation = Math.PI / 2;
    this.sprite.scale.set(2);
    this.sprite.position.set(this.sprite.height, 0);
    this.sprite.gotoAndPlay(4);
    this.sprite.animationSpeed = 0.5;

    this.spriteContainer.addChild(this.sprite);

    //this.addChild(this.createRectangle());
  }

  init(x, y) {
    this.initSprite();

    // this.healthBar.init(this.health);
    this.sprite.gotoAndPlay(
      Math.floor(Math.random() * this.textureArray.length - 1),
    );
    this.sprite.alpha = 1;
    this.position.set(x, y);

    this.health = 1;
    this.healthBar.init(this.health);
    this.healthBar.y = -this.sprite.height * 0.5 - this.healthBar.height - 20;
    this.healthBar.x =
      this.spriteContainer.width * 0.5 - this.healthBar.width * 0.5;
  }

  damage(value) {
    console.log('DAMAGE');
    this.health -= value;
    this.healthBar.damage(this.health);
    this.speed = 0;
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.speed = 3;
    }, 500);

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
