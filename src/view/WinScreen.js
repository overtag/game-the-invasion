import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';
import { Button } from './ui/Button';

function update(obj) {
  obj.update();
}

export class WinScreen extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Graphics();
    bg.beginFill(0xf26065);
    bg.drawRect(0, 0, config.defaultWidth, 200);
    bg.endFill();
    this.addChild(bg);
    const grT = this.createRectangleButton().generateCanvasTexture();
    this.btnNewGame = new Button(grT, grT, grT);
    this.addChild(this.btnNewGame);
    this.btnNewGame.position.set(10, 300);
    this.btnNewGame.onclick = () => {
      eventEmitter.emit(EVENTS.NEW_GAME_CONTROLLER);
    };

    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  createRectangleButton() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 240, 80);
    graphics.endFill();

    return graphics;
  }
}
