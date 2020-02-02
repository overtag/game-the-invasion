import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Ded extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Ded;
  }

  initSprite() {
    super.initSprite();
    this.sprite.animationSpeed = 0.5;
  }
}
