import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class ZombieV5 extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.ZombieV5;
  }
}
