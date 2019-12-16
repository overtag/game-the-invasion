import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Rambo extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Rambo;
  }
}
