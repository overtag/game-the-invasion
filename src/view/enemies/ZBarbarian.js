import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class ZBarbarian extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.ZBarbarian;
  }
}
