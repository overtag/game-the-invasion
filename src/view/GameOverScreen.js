import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';
import { ButtonText } from './ui/ButtonText';

function update(obj) {
  obj.update();
}

export class GameOverScreen extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Sprite(PIXI.Texture.fromImage('GameOver_mc0000'));
    bg.scale.set(1.2, 1.2);
    bg.anchor.set(0.5, 0);
    bg.position.set(config.defaultWidth * 0.5, 0);
    this.addChild(bg);

    let texture = PIXI.utils.TextureCache['../assets/button.png'];

    this.restartBtn = new ButtonText(texture, texture, texture, 'Restart');
    this.addChild(this.restartBtn);
    this.restartBtn.position.set(
      config.defaultWidth * 0.5 - this.restartBtn.width * 0.5,
      300,
    );
    this.restartBtn.onclick = () => {
      eventEmitter.emit(EVENTS.NEW_GAME_CONTROLLER);
    };

    this.lobbyBtn = new ButtonText(texture, texture, texture, 'Lobby');
    this.addChild(this.lobbyBtn);
    this.lobbyBtn.position.set(
      config.defaultWidth * 0.5 - this.lobbyBtn.width * 0.5,
      500,
    );

    this.lobbyBtn.onclick = () => {
      eventEmitter.emit(EVENTS.SET_SCREEN, {
        state: config.STATE_SCREEN_LOBBY,
      });
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
