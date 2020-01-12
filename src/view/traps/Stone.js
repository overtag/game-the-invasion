import { BaseTrap } from './BaseTrap';
import { types } from './types';
import { Amath } from '../../utils/Amath';

export class Stone extends BaseTrap {
  constructor(universe) {
    super();
    this.damage = 0;
    this.type = types.stone;
    this.initSprite();
    // this.initEffect();

    this.health = 100;
  }

  initSprite() {
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('Stone_mc0000'));
    this.sprite.scale.set(1.5, 1.5);

    this.addChild(this.sprite);
  }

  init(point) {
    this.health = 100;
    this.sprite.visible = true;
    this.position.set(point.x - this.width * 0.5, point.y - this.height * 0.5);
  }

  collision(enemy) {
    if (
      Amath.hitTestRectangle(this, enemy) &&
      this.sprite.visible &&
      Math.abs(
        this.y +
          this.height * 0.5 -
          enemy.y -
          enemy.spriteContainer.height * 0.5,
      ) <= 10
    ) {
      this.health -= 1;
      enemy.damage(this.damage);
    }

    if (this.health <= 0) {
      console.log('REVOME');
      this.remove();
    }
  }
}
