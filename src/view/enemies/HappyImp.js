import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class HappyImp extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.HappyImp;
  }
}
