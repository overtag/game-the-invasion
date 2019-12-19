import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';
import { types } from './traps/types';
import { Rake } from './traps/Rake';
import { Sheep } from './traps/Sheep';
import { Cross } from './traps/Cross';
import { Pumpkin } from './traps/Pumpkin';
import { Stone } from './traps/Stone';

function update(obj) {
  obj.update();
}

export class TrapController {
  constructor(universe) {
    this.universe = universe;

    this.traps = [];
    eventEmitter.on(EVENTS.ADD_TRAP, this.add, this);
    eventEmitter.on(EVENTS.REMOVE_TRAP, this.remove, this);
    eventEmitter.on(EVENTS.CLEAN_GAME, this.cleanGame, this);
  }

  add(evt) {
    const trap = this.createTrap(evt.type);
    this.traps.push(trap);
    trap.init(evt.point);
    this.universe.addChild(trap);
  }

  remove(evt) {
    const { trap } = evt;
    const index = this.traps.findIndex(curr => curr === trap);
    this.traps.splice(index, 1);
    //Не удалил до конца
    this.universe.removeChild(trap);
  }

  createTrap(type) {
    switch (type) {
      case types.rake:
        return new Rake();

      case types.sheep:
        return new Sheep();
        break;
      case types.cross:
        return new Cross();
        break;
      case types.pumpkin:
        return new Pumpkin();
        break;
      case types.stone:
        return new Stone();
        break;
    }
  }

  update(enemies) {
    this.traps.forEach(curr => {
      curr.update(enemies);
    });
  }

  cleanGame() {
    this.traps.forEach(trap => {
      this.universe.removeChild(trap);
    });

    this.traps = [];
  }
}
