import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class ZCyborg extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.ZCyborg;
  }
}
