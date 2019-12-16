import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class ZombieLab extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.ZombieLab;
  }
}
