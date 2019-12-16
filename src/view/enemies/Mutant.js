import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Mutant extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Mutant;
  }
}
