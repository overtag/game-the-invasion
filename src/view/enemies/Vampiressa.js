import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Vampiressa extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Vampiressa;
  }
}
