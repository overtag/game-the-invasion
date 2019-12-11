import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Jester extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Jester;
  }
}
