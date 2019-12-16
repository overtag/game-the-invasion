import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Vampire extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Vampire;
  }
}
