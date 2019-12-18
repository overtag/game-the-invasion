import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';
import { BottomPanel } from './BottomPanel';

import { EnemyController } from './EnemyController';
import { TrapController } from './TrapController';
function update(obj) {
  obj.update();
}

export class Game extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Sprite(PIXI.Texture.fromImage('LevelCemetery'));

    this.addChild(bg);

    this.enemyController = new EnemyController(this);
    this.trapController = new TrapController(this);

    this.bottomPanel = new BottomPanel();
    this.bottomPanel.position.set(
      +125,
      config.defaultHeight - this.bottomPanel.height - 35,
    );
    this.addChild(this.bottomPanel);
    this.visible = false;

    eventEmitter.on(EVENTS.NEW_GAME_VIEW, this.newGame, this);
    eventEmitter.on(EVENTS.UPDATE, this.enterFrame, this);
  }

  newGame() {
    this.enemyController.play();
  }

  enterFrame(evt) {
    this.enemyController.update();
    this.trapController.update(this.enemyController.enemies);
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
