import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Ani extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Ani;
  }
}
