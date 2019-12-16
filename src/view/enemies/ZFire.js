import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class ZFire extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.ZFire;
  }
}
