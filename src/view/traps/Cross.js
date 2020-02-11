import { BaseTrap } from './BaseTrap';
import { types, getTexture } from './types';
import { Amath } from '../../utils/Amath';

export class Cross extends BaseTrap {
  constructor() {
    super();
    this.type = types.cross;
    this.initSprite();
    this.initEffect();
  }

  initSprite() {
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('Cross_light0000'));
    this.sprite.scale.set(1.3, 1.3);
    this.sprite.anchor.set(0, 0);
    this.addChild(this.sprite);
  }

  initEffect() {
    this.effectSprite = new PIXI.extras.AnimatedSprite(getTexture(this.type));
    this.effectSprite.anchor.set(0, 0);
    this.effectSprite.scale.set(1.3, 1.3);
    this.effectSprite.position.set(
      this.sprite.x + this.sprite.width * 0.5 - this.effectSprite.width * 0.5,
      this.sprite.y - this.effectSprite.height + this.sprite.height + 14,
    );

    this.effectSprite.loop = false;
    this.effectSprite.animationSpeed = 0.4;
    this.addChild(this.effectSprite);
    this.effectSprite.onComplete = evt => {
      this.remove();
    };
    this.effectSprite.visible = false;
  }

  collision(enemy) {
    if (
      Amath.hitTestRectangle(this, enemy) &&
      this.sprite.visible &&
      Math.abs(
        this.y + this.sprite.height - enemy.y - enemy.spriteContainer.height,
      ) <= 10
    ) {
      console.log();
      enemy.damage(this.damage);

      this.playEffect(enemy);
    } else {
    }
  }

  playEffect(enemy) {
    this.effectSprite.gotoAndPlay(0);
    this.effectSprite.visible = true;

    this.sprite.visible = false;
  }
}
