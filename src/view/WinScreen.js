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

    this.continueBtn = new Button(grT, grT, grT);
    this.addChild(this.continueBtn);
    this.continueBtn.position.set(
      config.defaultWidth * 0.5 - this.continueBtn.width * 0.5,
      100,
    );

    this.restartBtn = new Button(
      PIXI.Texture.fromImage('Replay_btn0000'),
      PIXI.Texture.fromImage('Replay_btn0001'),
      PIXI.Texture.fromImage('Replay_btn0002'),
    );
    this.addChild(this.restartBtn);
    this.restartBtn.position.set(
      config.defaultWidth * 0.5 - this.restartBtn.width * 0.5,
      300,
    );
    this.restartBtn.onclick = () => {
      eventEmitter.emit(EVENTS.NEW_GAME_CONTROLLER);
    };

    this.lobbyBtn = new Button(
      PIXI.Texture.fromImage('Game_btn0000'),
      PIXI.Texture.fromImage('Game_btn0001'),
      PIXI.Texture.fromImage('Game_btn0002'),
    );
    this.addChild(this.lobbyBtn);
    this.lobbyBtn.position.set(
      config.defaultWidth * 0.5 - this.lobbyBtn.width * 0.5,
      400,
    );

    this.lobbyBtn.onclick = () => {
      eventEmitter.emit(EVENTS.SET_SCREEN, {
        state: config.STATE_SCREEN_LOBBY,
      });
    };

    this.visible = false;

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
