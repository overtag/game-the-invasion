import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Boffin extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Boffin;
  }
}
