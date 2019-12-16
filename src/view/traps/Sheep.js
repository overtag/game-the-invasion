import { BaseTrap } from './BaseTrap';
import { types } from './types';
import { config } from '../../config';

const RIGHT = -1;
const LEFT = 1;

export class Sheep extends BaseTrap {
  constructor(universe) {
    super();

    this.speed = 0.3;
    this.orientation = LEFT;
    this.type = types.sheep;
    this.sprite = new PIXI.extras.AnimatedSprite(getTexture(this.type));
    this.sprite.scale.set(2, 2);
    this.sprite.anchor.set(0.5, 0.5);
    this.addChild(this.sprite);
    this.initEffect();
    console.log(this.type);
  }

  init(point) {
    super.init(point);

    if (point.x < config.defaultWidth * 0.5) {
      this.orientation = LEFT;
      this.position.x = 1;
    } else {
      this.orientation = RIGHT;
      this.position.x = config.defaultWidth;
    }
  }

  walkedAway() {
    if (this.orientation === LEFT && this.position.x > config.defaultWidth) {
      this.remove();
    } else if (this.orientation === RIGHT && this.position.x < 0) {
      this.remove();
    }
  }

  update(enemies) {
    this.x += this.speed * this.orientation;
    this.walkedAway();
    super.update(enemies);
  }
}
