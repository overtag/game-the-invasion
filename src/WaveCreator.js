import * as PIXI from 'pixi.js';
import { config } from './config';
import { EVENTS, eventEmitter } from './events/EventEmitter';

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

export class WaveCreator {
  constructor() {
    this.wave = null;
    this.isPlay = false;
    this.ticks = 0;
  }

  play() {
    this.isPlay = true;
    this.newWave(level);
  }

  stop() {
    this.isPlay = false;
  }

  newWave(currLevel) {
    if (currLevel.length >= 0) {
      this.wave = currLevel.shift();
    } else {
      // end level
    }
  }

  update() {
    if (!this.isPlay || !this.wave) return;
    this.ticks++;

    if (this.ticks >= this.wave.interval) {
      const type = this.wave.types[
        Math.round(Math.random() * (this.wave.types.length - 1))
      ];
      eventEmitter.emit(EVENTS.CREATE_ENEMY, { type });
      this.ticks = 0;
      this.wave.count -= 1;
    }

    if (this.wave.count <= 0) {
      this.newWave(level);
    }
  }
}
