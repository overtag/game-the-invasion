import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class ZombieElectro extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.ZombieElectro;
  }
}
