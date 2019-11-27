import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';
import { EnemyBase } from './enemies/EnemyBase';
import { WaveCreator } from '../WaveCreator';

function update(obj) {
  obj.update();
}

const level = [
  {
    types: ['base'],
    count: 6,
    interval: 120,
  },
  {
    types: ['base'],
    count: 6,
    interval: 120,
  },
];

export class EnemyController {
  constructor(universe) {
    this.universe = universe;

    this.enemies = [];

    eventEmitter.on(EVENTS.CREATE_ENEMY, this.addEnemy, this);
    eventEmitter.on(EVENTS.ENEMY_DEATH, this.removeEnemy, this);
    eventEmitter.on(EVENTS.CLEAN_GAME, this.cleanGame, this);
  }

  cleanGame() {
    this.enemies.forEach(enemy => {
      enemy.remove();
      this.universe.removeChild(enemy);
    });
  }

  removeEnemy(evt) {
    const { enemy } = evt;
    const index = this.enemies.findIndex(curr => curr === enemy);
    this.enemies.splice(index, 1);
    //Не удалил до конца
    this.universe.removeChild(enemy);
  }

  addEnemy(evt) {
    const enemy = this.createEnemy(evt.type);
    const startX = Math.random() * (config.defaultWidth - enemy.width);
    enemy.position.set(startX, 0);
    this.universe.addChild(enemy);
    this.enemies.push(enemy);
  }

  createEnemy(type) {
    switch (type) {
      case 'base':
        return new EnemyBase();
    }
  }

  update(evt) {
    this.enemies.forEach(update);
  }
}
