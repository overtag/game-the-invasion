import * as PIXI from 'pixi.js';
import { config } from './config';
import { EVENTS, eventEmitter } from './events/EventEmitter';
import { types } from './view/enemies/types';
import { Jester } from './view/enemies/Jester';
import { Patch } from './view/enemies/Patch';

import { Ani } from './view/enemies/Ani';
import { Arancar } from './view/enemies/Arancar';
import { Beggar } from './view/enemies/Beggar';
import { Bitten } from './view/enemies/Bitten';
import { Boffin } from './view/enemies/Boffin';
import { Butcher } from './view/enemies/Butcher';
import { Clown } from './view/enemies/Clown';
import { Director } from './view/enemies/Director';
import { Doll } from './view/enemies/Doll';
import { Fire } from './view/enemies/Fire';
import { HappyImp } from './view/enemies/HappyImp';
import { HeadZombie } from './view/enemies/HeadZombie';
import { Iceman } from './view/enemies/Iceman';
import { Kiss } from './view/enemies/Kiss';
import { Liprikon } from './view/enemies/Liprikon';
import { MasqueradeV1 } from './view/enemies/MasqueradeV1';
import { MasqueradeV2 } from './view/enemies/MasqueradeV2';
import { Menos } from './view/enemies/Menos';
import { Mutant } from './view/enemies/Mutant';
import { PatchKiss } from './view/enemies/PatchKiss';
import { Possessed } from './view/enemies/Possessed';
import { Rambo } from './view/enemies/Rambo';
import { Scarecrow } from './view/enemies/Scarecrow';
import { Vampire } from './view/enemies/Vampire';
import { Vampiressa } from './view/enemies/Vampiressa';
import { Werewolf } from './view/enemies/Werewolf';
import { Witch } from './view/enemies/Witch';
import { Woman } from './view/enemies/Woman';

import { Woman2 } from './view/enemies/Woman2';
import { Wonk } from './view/enemies/Wonk';
import { YukiOnna } from './view/enemies/YukiOnna';
import { ZCyborg } from './view/enemies/ZCyborg';
import { ZFire } from './view/enemies/ZFire';
import { Zombie } from './view/enemies/Zombie';

import { ZombieElectro } from './view/enemies/ZombieElectro';
import { ZombieLab } from './view/enemies/ZombieLab';
import { ZombieV2 } from './view/enemies/ZombieV2';
import { ZombieV3 } from './view/enemies/ZombieV3';
import { ZombieV5 } from './view/enemies/ZombieV5';
import { ZombieV5Kiss } from './view/enemies/ZombieV5Kiss';
import { ZombieV6 } from './view/enemies/ZombieV6';
import { ZRasta } from './view/enemies/ZRasta';

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
