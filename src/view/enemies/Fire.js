import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Fire extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Fire;
  }
}
