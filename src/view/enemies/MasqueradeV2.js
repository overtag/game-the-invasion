import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class MasqueradeV2 extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.MasqueradeV2;
  }
}
