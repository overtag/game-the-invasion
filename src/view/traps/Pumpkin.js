import { BaseTrap } from './BaseTrap';
import { types, getTexture } from './types';
import { Amath } from '../../utils/Amath';

export class Pumpkin extends BaseTrap {
  constructor() {
    super();
    this.type = types.pumpkin;
    this.initSprite();
    this.initEffect();

    this.isPlayEffect = false;
    this.timerId = null;
  }

  init(point) {
    super.init(point);
    this.isPlayEffect = true;

    this.timerId = setTimeout(() => {
      this.effectSprite.gotoAndPlay(0);
      this.effectSprite.visible = true;
      this.sprite.visible = false;
    }, 3000);
  }

  initSprite() {
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('Pumpkin_mc0000'));
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

  collision(enemy) {
    if (
      Amath.hitTestRectangle(this, enemy) &&
      this.isPlayEffect &&
      this.sprite.visible
    ) {
      enemy.damage(this.damage);
    } else {
    }
  }

  remove() {
    clearTimeout(this.timerId);
    super.remove();
  }
}
