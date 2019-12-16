import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Director extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Director;
  }
}
