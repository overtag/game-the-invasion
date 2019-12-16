import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class ZombieV3 extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.ZombieV3;
  }
}
