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
    types: [types.Patch, types.Patch, types.Patch, types.Patch],
    count: 100,
    interval: 60,
  },
  {
    types: [types.Patch, types.Jester],
    count: 10,
    interval: 100,
  },
];

export class WaveCreator {
  createEnemy(type) {
    switch (type) {
      case types.Patch:
        return new Patch();
      case types.Jester:
        return new Jester();
      case types.Ani:
        return new Ani();
      case types.Arancar:
        return new Arancar();
      case types.Beggar:
        return new Beggar();
      case types.Bitten:
        return new Bitten();
      case types.Boffin:
        return new Boffin();
      case types.Butcher:
        return new Butcher();
      case types.Clown:
        return new Clown();
      case types.Director:
        return new Director();

      case types.Doll:
        return new Doll();
      case types.Fire:
        return new Fire();
      case types.HappyImp:
        return new HappyImp();
      case types.HeadZombie:
        return new HeadZombie();
      case types.Iceman:
        return new Iceman();
      case types.Kiss:
        return new Kiss();
      case types.Liprikon:
        return new Liprikon();
      case types.MasqueradeV1:
        return new MasqueradeV1();
      case types.MasqueradeV2:
        return new MasqueradeV2();
      case types.Menos:
        return new Menos();
      case types.Mutant:
        return new Mutant();
      case types.PatchKiss:
        return new PatchKiss();
      case types.Possessed:
        return new Possessed();
      case types.Rambo:
        return new Rambo();
      case types.Vampire:
        return new Vampire();
      case types.Vampiressa:
        return new Vampiressa();

      case types.Witch:
        return new Witch();
      case types.Woman:
        return new Woman();
      case types.Woman2:
        return new Woman2();
      case types.Wonk:
        return new Wonk();
      case types.YukiOnna:
        return new YukiOnna();
      case types.ZCyborg:
        return new ZCyborg();
      case types.ZFire:
        return new ZFire();
      case types.Zombie:
        return new Zombie();
      case types.ZombieElectro:
        return new ZombieElectro();
      case types.ZombieLab:
        return new ZombieLab();
      case types.ZombieV2:
        return new ZombieV2();
      case types.ZombieV3:
        return new ZombieV3();
      case types.ZombieV5:
        return new ZombieV5();
      case types.ZombieV5Kiss:
        return new ZombieV5Kiss();
      case types.ZombieV6:
        return new ZombieV6();
      case types.ZRasta:
        return new ZRasta();
    }
  }

  constructor() {
    this.wave = null;
    this.isPlay = false;
    this.ticks = 0;
  }

  play() {
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
}
