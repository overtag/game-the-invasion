import * as PIXI from 'pixi.js';
import { config } from '../config';
import { Button } from './ui/Button';
import { eventEmitter, EVENTS } from '../events/EventEmitter';

export class BottomPanel extends PIXI.Container {
  constructor() {
    super();

    this.isDrag = false;
    this.targetSprite = null;

    const bg = new PIXI.Graphics();
    bg.beginFill(0xd7dce1);
    bg.drawRect(0, 0, config.defaultWidth, 150);
    bg.endFill();
    this.addChild(bg);

    this.coinsTf = new PIXI.Text('0', config.panel_text);
    this.coinsTf.position.set(500, 60);
    this.addChild(this.coinsTf);

    this.healtTf = new PIXI.Text('0', config.panel_text);
    this.healtTf.position.set(500, 20);
    this.addChild(this.healtTf);

    let trapTexture = PIXI.utils.TextureCache['../assets/trab_back.png'];

    const oneTrapBtn = new Button(trapTexture, trapTexture, trapTexture);

    const rakeSprite = new PIXI.Sprite(PIXI.Texture.fromImage('Rake_mc0000'));
    rakeSprite.anchor.set(0.5, 0.5);
    rakeSprite.position.set(oneTrapBtn.width * 0.5, oneTrapBtn.height * 0.5);
    oneTrapBtn.addChild(rakeSprite);
    oneTrapBtn.pointerdown = evt => {
      this.payTrap(config.TRAP_RAKE, evt);
    };

    oneTrapBtn.position.set(50, 35);
    this.addChild(oneTrapBtn);

    const twoTrapBtn = new Button(trapTexture, trapTexture, trapTexture);
    twoTrapBtn.position.set(155, 35);
    this.addChild(twoTrapBtn);

    const threeTrapBtn = new Button(trapTexture, trapTexture, trapTexture);
    threeTrapBtn.position.set(255, 35);
    this.addChild(threeTrapBtn);

    eventEmitter.on(EVENTS.UPDATE_GOLD, evt => {
      console.log('UPDATE_GOLD', evt);
      this.coinsTf.text = evt.gold;
    });

    eventEmitter.on(EVENTS.UPDATE_HEALTH, evt => {
      console.log('UPDATE_HEALTH', evt);
      this.healtTf.text = evt.health;
    });
  }

  createRectangleButton() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 80, 80);
    graphics.endFill();

    return graphics;
  }

  payTrap(type, evt) {
    if (+this.coinsTf.text - type < 0) {
      console.log('Нужно больше золота');
      return;
    }

    console.log('createTrap', type, evt);

    eventEmitter.emit(EVENTS.PAY_TRAP, { type, point: evt.data.global });
  }
}
