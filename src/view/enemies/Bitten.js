import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Bitten extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Bitten;
  }
}
