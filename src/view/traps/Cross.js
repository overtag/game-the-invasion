import { BaseTrap } from './BaseTrap';
import { types, getTexture } from './types';

export class Cross extends BaseTrap {
  constructor() {
    super();
    this.type = types.cross;
    this.initSprite();
    this.initEffect();
  }

  initSprite() {
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('Cross_mc0000'));
    this.sprite.scale.set(1.5, 1.5);
    this.sprite.anchor.set(0, 0);
    this.addChild(this.sprite);
  }

  initEffect() {
    this.effectSprite = new PIXI.extras.AnimatedSprite(getTexture(this.type));
    this.effectSprite.anchor.set(0, 0);
    this.effectSprite.scale.set(1.5, 1.5);
    this.effectSprite.position.set(
      this.sprite.x +
        this.sprite.width * 0.5 -
        this.effectSprite.width * 0.5 -
        10,
      this.sprite.y - this.effectSprite.height + this.sprite.height,
    );

    this.effectSprite.loop = false;
    this.effectSprite.animationSpeed = 0.5;
    this.addChild(this.effectSprite);
    this.effectSprite.onComplete = evt => {
      this.remove();
    };
  }

  playEffect(enemy) {
    this.effectSprite.gotoAndPlay(0);
    this.effectSprite.visible = true;

    this.sprite.visible = false;
  }
}
