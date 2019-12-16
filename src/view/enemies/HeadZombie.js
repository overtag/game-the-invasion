import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class HeadZombie extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.HeadZombie;
  }
}
