import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Witch extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Witch;
  }
}
