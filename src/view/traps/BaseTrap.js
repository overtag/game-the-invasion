import * as PIXI from 'pixi.js';
import { config } from '../../config';
import { eventEmitter, EVENTS } from '../../events/EventEmitter';
import { Amath } from '../../utils/Amath';
import { types, getTexture } from './types';

export class BaseTrap extends PIXI.Container {
  constructor() {
    super();
    this.type = types.rake;
    this.damage = 1;
    this.sprite = null;
    this.effectSprite = null;
  }

  initSprite() {
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('Rake_mc0000'));
    this.sprite.scale.set(2, 2);
    this.sprite.anchor.set(0.5, 0.5);
    this.addChild(this.sprite);
  }

  initEffect() {
    this.effectSprite = new PIXI.extras.AnimatedSprite(getTexture(this.type));
    this.effectSprite.anchor.set(0.5, 0.5);
    this.effectSprite.position.set(-100, 50);
    this.effectSprite.scale.set(2, 2);
    this.effectSprite.loop = false;
    this.effectSprite.animationSpeed = 0.5;
    this.addChild(this.effectSprite);
    this.effectSprite.onComplete = evt => {
      this.remove();
    };
  }

  init(point) {
    this.effectSprite.gotoAndStop(1);
    this.effectSprite.visible = false;
    this.sprite.visible = true;
    this.position.set(point.x, point.y);
  }

  createRectangle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xeeffcc);
    graphics.drawRect(0, 0, 80, 80);
    graphics.endFill();

    return graphics;
  }

  update(enemies) {
    enemies.forEach(enemy => {
      this.collision(enemy, this);
    });
  }

  collision(enemy) {
    if (
      Amath.hitTestRectangle(this, enemy) &&
      this.sprite.visible &&
      Math.abs(
        this.y + this.sprite.height * 0.5 - enemy.y - enemy.sprite.height * 0.5,
      ) <= 10
    ) {
      console.log();
      enemy.damage(this.damage);

      this.effectSprite.gotoAndPlay(0);
      this.effectSprite.visible = true;
      this.sprite.visible = false;
    } else {
    }
  }

  remove() {
    eventEmitter.emit(EVENTS.REMOVE_TRAP, { trap: this });
  }
}
