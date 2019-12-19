import { BaseTrap } from './BaseTrap';
import { types } from './types';

export class Pumpkin extends BaseTrap {
  constructor() {
    super();
    this.type = types.pumpkin;
    this.initSprite();
    this.initEffect();
  }
}
