import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Doll extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Doll;
  }
}
