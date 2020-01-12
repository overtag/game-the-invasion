import { BaseTrap } from './BaseTrap';
import { types, getTexture } from './types';
import { config } from '../../config';
import { Amath } from '../../utils/Amath';
const RIGHT = -1;
const LEFT = 1;

export class Fairy extends BaseTrap {
  constructor(universe) {
    super();

    this.speed = 3;
    this.orientation = LEFT;
    this.type = types.fairy;
    this.damage = 10;
    this.initSprite();
    this.initEffect();
  }

  initSprite() {
    this.sprite = new PIXI.extras.AnimatedSprite(getTexture(this.type));
    this.sprite.anchor.set(0, 0);

    this.sprite.scale.set(2, 2);
    this.sprite.loop = true;
    this.sprite.animationSpeed = 1;
    this.addChild(this.sprite);
  }

  initEffect() {
    this.effectSprite = new PIXI.extras.AnimatedSprite(
      getTexture(types.fairyEffect),
    );

    this.effectSprite.scale.set(2, 2);
    this.effectSprite.loop = false;
    this.effectSprite.animationSpeed = 0.5;

    this.effectSprite.onComplete = evt => {
      this.effectSprite.parent.removeChild(this.effectSprite);
    };
  }

  init(point) {
    super.init(point);

    if (point.x < config.defaultWidth * 0.5) {
      this.orientation = LEFT;
      this.sprite.scale.x = -2;
      this.sprite.x = this.sprite.width;
      this.position.x = 0 - this.sprite.width;
    } else {
      this.sprite.scale.x = 2;
      this.orientation = RIGHT;
      this.position.x = config.defaultWidth;
    }

    this.sprite.gotoAndPlay(0);
  }

  walkedAway() {
    if (this.orientation === LEFT && this.position.x > config.defaultWidth) {
      this.remove();
    } else if (this.orientation === RIGHT && this.position.x < 0) {
      this.remove();
    }
  }

  update(enemies) {
    this.x += this.speed * this.orientation;
    this.walkedAway();
    super.update(enemies);
  }

  collision(enemy) {
    const x = this.orientation === RIGHT ? 50 : 70;

    if (
      Math.abs(this.y + 100 - enemy.y - enemy.spriteContainer.height * 0.5) <=
        50 &&
      Math.abs(this.x + x - enemy.x - enemy.spriteContainer.width * 0.5) <=
        50 &&
      this.sprite.visible
    ) {
      console.log();

      enemy.damage(this.damage);

      this.playEffect(enemy);
    } else {
    }
  }

  createCircle() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffcc00);
    graphics.drawCircle(0, 0, 50, 50);
    graphics.endFill();

    return graphics;
  }

  playEffect(enemy) {
    this.parent.addChild(this.effectSprite);
    this.effectSprite.position.set(enemy.x, enemy.y);
    this.effectSprite.gotoAndPlay(0);
    this.effectSprite.visible = true;
    //this.sprite.visible = false;
  }
}
