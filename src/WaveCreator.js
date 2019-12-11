import * as PIXI from 'pixi.js';
import { config } from './config';
import { EVENTS, eventEmitter } from './events/EventEmitter';
import { types } from './view/enemies/types';
import { Jester } from './view/enemies/Jester';
import { Patch } from './view/enemies/Patch';
import { EnemyBase } from './view/enemies/EnemyBase';

const level = [
  {
    types: [types.Patch, types.Jester],
    count: 6,
    interval: 120,
  },
  {
    types: [types.Patch, types.Jester],
    count: 6,
    interval: 120,
  },
];

export class WaveCreator {
  constructor() {
    this.wave = null;
    this.isPlay = false;
    this.ticks = 0;
  }

  play() {
    console.log('PLAY');
    this.isPlay = true;
    this.newWave([...level]);
  }

  stop() {
    this.isPlay = false;
  }

  newWave(currLevel) {
    if (currLevel.length >= 0) {
      this.wave = currLevel.shift();
    } else {
      eventEmitter.emit(EVENTS.LEVEL_COMPLETE, {});
    }
  }

  update() {
    if (!this.isPlay || !this.wave) return;
    this.ticks++;

    if (this.ticks >= this.wave.interval) {
      const type = this.wave.types[
        Math.round(Math.random() * (this.wave.types.length - 1))
      ];
      eventEmitter.emit(EVENTS.CREATE_ENEMY, { enemy: this.createEnemy(type) });
      this.ticks = 0;
      this.wave.count -= 1;
    }

    if (this.wave.count <= 0) {
      this.newWave(level);
    }
  }

  createEnemy(type) {
    switch (type) {
      case types.Patch:
        return new Patch();
      case types.Jester:
        return new Jester();
    }
  }
}
