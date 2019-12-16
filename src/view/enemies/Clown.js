import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Clown extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Clown;
  }
}
