import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Possessed extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Possessed;
  }
}
