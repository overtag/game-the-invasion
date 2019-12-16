import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class MasqueradeV1 extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.MasqueradeV1;
  }
}
