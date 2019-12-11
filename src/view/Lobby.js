import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';
import { ButtonText } from './ui/ButtonText';

export class Lobby extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Graphics();
    bg.beginFill(0x235a3b);
    bg.drawRect(0, 0, config.defaultWidth, config.defaultHeight);
    bg.endFill();
    this.addChild(bg);

    let texture = PIXI.utils.TextureCache['../assets/button.png'];
    let sprite = new PIXI.Sprite(texture);

    this.btnNewGame = new ButtonText(texture, texture, texture, 'Play');

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
