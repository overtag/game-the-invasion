import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class ZombieV2 extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.ZombieV2;
  }
}
