import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Iceman extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Iceman;
  }
}
