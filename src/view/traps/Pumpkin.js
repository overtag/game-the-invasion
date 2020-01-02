import { BaseTrap } from './BaseTrap';
import { types, getTexture } from './types';
import { Amath } from '../../utils/Amath';

export class Pumpkin extends BaseTrap {
  constructor() {
    super();
    this.type = types.pumpkin;
    this.initSprite();
    this.initEffect();
    this.damage = 1;
    this.isPlayEffect = false;
    this.timerId = null;
  }

  init(point) {
    super.init(point);
    this.isPlayEffect = false;

    this.timerId = setTimeout(() => {
      this.effectSprite.gotoAndPlay(0);
      this.isPlayEffect = true;
      this.effectSprite.visible = true;
      this.sprite.visible = false;
    }, 1000);
  }

  initSprite() {
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('Pumpkin_mc0000'));
    this.sprite.scale.set(1.5, 1.5);

    this.addChild(this.sprite);
  }

  initEffect() {
    this.effectSprite = new PIXI.extras.AnimatedSprite(getTexture(this.type));
    this.effectSprite.scale.set(1.5, 1.5);

    this.effectSprite.position.set(
      this.sprite.width * 0.5 - this.effectSprite.width * 0.5,
      this.sprite.height * 0.5 - this.effectSprite.height * 0.5,
    );

    this.effectSprite.loop = false;
    this.effectSprite.animationSpeed = 0.5;
    this.addChild(this.effectSprite);
    this.effectSprite.onComplete = evt => {
      this.remove();
    };
  }

  collision(enemy) {
    if (Amath.hitTestRectangle(this, enemy) && this.isPlayEffect) {
      console.log('collision!!!');
      enemy.damage(this.damage);
    } else {
    }
  }

  remove() {
    clearTimeout(this.timerId);
    super.remove();
  }
}
