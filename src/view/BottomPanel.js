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

    const trapTexture = this.createRectangleButton().generateCanvasTexture();
    const oneTrapBtn = new Button(trapTexture, trapTexture, trapTexture);
    oneTrapBtn.onclick = () => {
      this.payTrap(config.TRAP_RAKE);
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
      console.log('UPDATE_GOLD', evt);
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

  payTrap(type) {
    if (+this.coinsTf.text - type < 0) {
      console.log('Нужно больше золота');
      return;
    }

    console.log('createTrap', type);

    eventEmitter.emit(EVENTS.PAY_TRAP, { type });
  }
}
