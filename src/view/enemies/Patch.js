import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Patch extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Patch;
  }
}
