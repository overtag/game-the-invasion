import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Butcher extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Butcher;
  }
}
