import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Zombie extends EnemyBase {
  constructor() {
    super();
    this.type = types.Zombie;
  }
}
