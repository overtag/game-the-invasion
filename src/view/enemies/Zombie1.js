import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Zombie1 extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Zombie1;
  }
}
