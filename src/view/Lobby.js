import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';
import { ButtonText } from './ui/ButtonText';

export class Lobby extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Sprite(PIXI.Texture.fromImage('cemetery'));

    this.addChild(bg);

    let texture = PIXI.utils.TextureCache['../assets/button.png'];

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
