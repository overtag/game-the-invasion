import { BaseTrap } from './BaseTrap';
import { types } from './types';

export class Rake extends BaseTrap {
  constructor(universe) {
    super();
    this.type = types.rake;
    this.initSprite();
    this.initEffect();
  }
}
