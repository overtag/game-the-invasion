import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Kiss extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Kiss;
  }
}
