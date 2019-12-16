import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Menos extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Menos;
  }
}
