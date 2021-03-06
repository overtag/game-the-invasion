import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Arancar extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Arancar;
  }

  initSprite() {
    super.initSprite();
    this.sprite.animationSpeed = 0.3;
  }
}
