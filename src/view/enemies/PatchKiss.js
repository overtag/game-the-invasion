import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class PatchKiss extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.PatchKiss;
  }
}
