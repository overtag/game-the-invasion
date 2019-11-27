import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';
import { BaseTrap } from './traps/BaseTrap';

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
    console.log('remove');
    const { trap } = evt;
    const index = this.traps.findIndex(curr => curr === trap);
    this.traps.splice(index, 1);
    //Не удалил до конца
    this.universe.removeChild(trap);
  }

  createTrap(type) {
    console.log('TYPE', type);
    switch (type) {
      case config.TRAP_RAKE:
        return new BaseTrap();

      case config.TRAP_SHEEP:
        break;
      case config.TRAP_FENCE:
        break;
    }
  }

  update(evt) {
    this.traps.forEach(update);
  }

  cleanGame() {
    this.traps.forEach(trap => {
      this.universe.removeChild(trap);
    });

    this.traps = [];
  }
}
