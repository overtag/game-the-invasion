import { BaseTrap } from './BaseTrap';
import { types } from './types';

export class Cross extends BaseTrap {
  constructor() {
    super();
    this.type = types.cross;
    this.initSprite();
    this.initEffect();
  }
}
