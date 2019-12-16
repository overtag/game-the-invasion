import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Liprikon extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Liprikon;
  }
}
