import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class YukiOnna extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.YukiOnna;
  }
}
