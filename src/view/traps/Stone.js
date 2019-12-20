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
    this.sprite.scale.set(2, 2);
    this.sprite.anchor.set(0.5, 0.5);
    this.addChild(this.sprite);
  }

  init(point) {
    this.health = 100;
    this.sprite.visible = true;
    this.position.set(point.x, point.y);
  }

  collision(enemy) {
    if (Amath.hitTestRectangle(this, enemy)) {
      this.health -= 1;
      enemy.damage(this.damage);
    }

    if (this.health <= 0) {
      this.remove();
    }
  }
}
