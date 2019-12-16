import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Wonk extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Wonk;
  }
}
