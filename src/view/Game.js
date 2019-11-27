import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';
import { BottomPanel } from './BottomPanel';
import { BaseTrap } from './traps/BaseTrap';
import { EnemyController } from './EnemyController';

function update(obj) {
  obj.update();
}

export class Game extends PIXI.Container {
  constructor() {
    super();

    this.enemyController = new EnemyController(this);

    this.traps = [];

    const bg = new PIXI.Graphics();
    bg.beginFill(0xffcc00);
    bg.drawRect(0, 0, config.defaultWidth, config.defaultHeight);
    bg.endFill();
    this.addChild(bg);

    this.bottomPanel = new BottomPanel();
    this.bottomPanel.position.set(
      0,
      config.defaultHeight - this.bottomPanel.height,
    );
    this.addChild(this.bottomPanel);
    this.visible = false;

    eventEmitter.on(EVENTS.NEW_GAME_VIEW, this.newGame, this);
    eventEmitter.on(EVENTS.ADD_TRAP, this.addTrap, this);
    eventEmitter.on(EVENTS.UPDATE, this.enterFrame, this);
    eventEmitter.on(EVENTS.CLEAN_GAME, this.cleanGame, this);
  }

  cleanGame() {
    this.traps.forEach(trap => {
      trap.remove();
      this.removeChild(trap);
    });
  }

  addTrap(evt) {
    const trap = this.createTrap(evt.type);
    trap.init(evt.point);
    this.addChild(trap);
  }

  createTrap(type) {
    switch (type) {
      case config.TRAP_RAKE:
        return new BaseTrap();

      case config.TRAP_SHEEP:
        break;
      case config.TRAP_FENCE:
        break;
    }
  }

  createEnemy(type) {
    switch (type) {
      case config.TRAP_RAKE:
        return new BaseTrap();

      case config.TRAP_SHEEP:
        break;

      case config.TRAP_FENCE:
        break;
    }
  }

  newGame() {
    this.enemyController.play();
  }

  enterFrame(evt) {
    this.enemyController.update();
    this.traps.forEach(update);
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
