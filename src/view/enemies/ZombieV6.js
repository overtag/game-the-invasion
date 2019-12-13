import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class ZombieV6 extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.ZombieV6;
  }
}
