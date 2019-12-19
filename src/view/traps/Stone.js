import { BaseTrap } from './BaseTrap';
import { types } from './types';

export class Stone extends BaseTrap {
  constructor(universe) {
    super();
    this.type = types.rake;
    this.initSprite();
    this.initEffect();
  }
}
