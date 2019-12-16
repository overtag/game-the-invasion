import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Woman extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.ZWoman;
  }
}
