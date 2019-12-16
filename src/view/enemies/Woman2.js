import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Woman2 extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.ZWoman2;
  }
}
