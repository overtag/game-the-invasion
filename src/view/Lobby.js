import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';
import { Button } from './ui/Button';

export class Lobby extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Graphics();
    bg.beginFill(0x235a3b);
    bg.drawRect(0, 0, config.defaultWidth, config.defaultHeight);
    bg.endFill();
    this.addChild(bg);

    const grT = this.createRectangleButton().generateCanvasTexture();
    this.btnNewGame = new Button(
      PIXI.Texture.fromImage('Game_btn0000'),
      PIXI.Texture.fromImage('Game_btn0001'),
      PIXI.Texture.fromImage('Game_btn0001'),
    );

    this.btnNewGame.position.set(
      config.defaultWidth * 0.5 - this.btnNewGame.width * 0.5,
      400,
    );

    this.addChild(this.btnNewGame);

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
