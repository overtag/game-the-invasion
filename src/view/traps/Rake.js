import { BaseTrap } from './BaseTrap';
import { types } from './types';

export class Rake extends BaseTrap {
  constructor(universe) {
    super();
    this.type = types.rake;
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage(`${this.type}0000`));
    this.sprite.scale.set(2, 2);
    this.sprite.anchor.set(0.5, 0.5);
    this.addChild(this.sprite);
    this.initEffect();
  }
}
