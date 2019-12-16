import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Arancar extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Arancar;
  }
}
