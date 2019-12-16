import { EnemyBase } from './EnemyBase';
import { types } from './types';

export class Werewolf extends EnemyBase {
  constructor(universe) {
    super();
    this.type = types.Werewolf;
  }
}
