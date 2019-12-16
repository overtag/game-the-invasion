import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Beggar extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Beggar;
  }
}
