import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class ZRasta extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.ZRasta;
  }
}
