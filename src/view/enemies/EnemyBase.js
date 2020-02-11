import * as PIXI from 'pixi.js';
import { config } from '../../config';
import { eventEmitter, EVENTS } from '../../events/EventEmitter';
import { getTexture, types } from './types';
import { HealthBar } from '../health/HealthBar';

export function getTexture1(type, length) {
  const listNames = [];
  const textureArray = [];
  for (let i = 0; i < length; i++) {
    const textureName = `${type}${i < 10 ? '000' : '00'}${i}`;
    textureArray.push(PIXI.Texture.from(textureName));
  }

  return textureArray;
}

export class EnemyBase extends PIXI.Container {
  constructor() {
    super();

    // this.sprite = new PIXI.Sprite(trapTexture);
    this.timerId = 0;
    this.health = 1;
    this.sprite = null;
    this.speed = 0.7;
    this.textureArray = [];
    this.type = types.Patch;
    this.healthBar = new HealthBar();
    this.addChild(this.healthBar);

    this.spriteContainer = new PIXI.Container();
    // this.addChild(this.createRectangleButton());
    this.addChild(this.spriteContainer);
    // deade_effect0010
    this.dead_effect = new PIXI.extras.AnimatedSprite(
      getTexture1('deade_effect', 10),
    );
    this.dead_effect.scale.set(0.9);
    this.dead_effect.position.set(0, 0);

    this.dead_effect.loop = false;
    this.dead_effect.visible = false;
    this.dead_effect.animationSpeed = 0.5;

    this.spriteContainer.addChild(this.dead_effect);
    this.dead_effect.onComplete = evt => {
      eventEmitter.emit(EVENTS.ENEMY_DEATH, { enemy: this, gold: 5 });
    };
  }

  initSprite() {
    this.dead_effect.visible = false;
    this.textureArray = getTexture(this.type);
    this.sprite = new PIXI.extras.AnimatedSprite(this.textureArray);
    this.sprite.scale.set(0.9);
    this.sprite.position.set(0, 0);
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
    this.healthBar.y = -10 - this.healthBar.height;
    this.healthBar.x =
      this.spriteContainer.width * 0.5 - this.healthBar.width * 0.5;
    this.sprite.visible = true;
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
    this.sprite.visible = false;
    this.dead_effect.visible = true;

    this.dead_effect.gotoAndPlay(0);
  }

  createRectangleButton() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 80, 80);
    graphics.endFill();

    return graphics;
  }
}
