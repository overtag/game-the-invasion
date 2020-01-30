import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';

function update(obj) {
  obj.update();
}

export class EnemyController {
  constructor(universe) {
    this.universe = universe;

    this.enemies = [];

    eventEmitter.on(EVENTS.CREATE_ENEMY, this.add, this);
    eventEmitter.on(EVENTS.ENEMY_DEATH, this.remove, this);
    eventEmitter.on(EVENTS.CLEAN_GAME, this.cleanGame, this);
  }

  cleanGame() {
    this.enemies.forEach(enemy => {
      this.universe.removeChild(enemy);
    });
    this.enemies = [];
  }

  remove(evt) {
    const { enemy } = evt;
    const index = this.enemies.findIndex(curr => curr === enemy);
    this.enemies.splice(index, 1);
    //Не удалил до конца
    this.universe.removeChild(enemy);
  }

  add(evt) {
    const { enemy } = evt;
    const startX = Math.random() * (config.defaultWidth - enemy.width);
    enemy.init(startX, 0);
    this.universe.addChildAt(enemy, 1);
    this.enemies.push(enemy);
  }

  update(evt) {
    this.enemies.forEach(update);
  }
}
