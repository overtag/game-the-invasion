import * as PIXI from 'pixi.js';
import { config } from '../config';
import { Button } from './ui/Button';
import { types, price } from './traps/types';

import { eventEmitter, EVENTS } from '../events/EventEmitter';

export class BottomPanel extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Sprite(PIXI.Texture.fromImage('panelBack0000'));
    bg.position.set(config.defaultWidth * 0.5, 0);
    bg.anchor.set(0.5, 0);

    this.addChild(bg);
    this.isDrag = false;
    this.targetSprite = null;

    this.coinsTf = new PIXI.Text('0', config.panel_text);
    this.coinsTf.position.set(400, 80);
    this.addChild(this.coinsTf);

    this.healtTf = new PIXI.Text('0', config.panel_text);
    this.healtTf.position.set(400, 40);
    this.addChild(this.healtTf);

    let trapTexture = PIXI.utils.TextureCache['../assets/trab_back.png'];

    const oneTrapBtn = new Button(trapTexture, trapTexture, trapTexture);
    oneTrapBtn.position.set(50, 35);
    this.addChild(oneTrapBtn);
    oneTrapBtn.pointerdown = evt => {
      this.payTrap(types.cross, evt);
    };

    const rakeSprite = new PIXI.Sprite(PIXI.Texture.fromImage('Cross_mc0000'));
    rakeSprite.anchor.set(0.5, 0.5);
    rakeSprite.position.set(oneTrapBtn.width * 0.5, oneTrapBtn.height * 0.5);
    oneTrapBtn.addChild(rakeSprite);

    const twoTrapBtn = new Button(trapTexture, trapTexture, trapTexture);
    twoTrapBtn.position.set(155, 35);
    this.addChild(twoTrapBtn);
    twoTrapBtn.pointerdown = evt => {
      this.payTrap(types.pumpkin, evt);
    };

    const sheepSprite = new PIXI.Sprite(
      PIXI.Texture.fromImage('Pumpkin_mc0000'),
    );
    sheepSprite.anchor.set(0.5, 0.5);
    sheepSprite.position.set(twoTrapBtn.width * 0.5, twoTrapBtn.height * 0.5);
    twoTrapBtn.addChild(sheepSprite);

    const threeTrapBtn = new Button(trapTexture, trapTexture, trapTexture);
    threeTrapBtn.position.set(255, 35);
    this.addChild(threeTrapBtn);

    const stoneSprite = new PIXI.Sprite(PIXI.Texture.fromImage('Stone_mc0000'));
    stoneSprite.anchor.set(0.5, 0.5);
    stoneSprite.position.set(
      threeTrapBtn.width * 0.5,
      threeTrapBtn.height * 0.5,
    );
    threeTrapBtn.addChild(stoneSprite);
    threeTrapBtn.pointerdown = evt => {
      this.payTrap(types.stone, evt);
    };

    eventEmitter.on(EVENTS.UPDATE_GOLD, evt => {
      this.coinsTf.text = evt.gold;
    });

    eventEmitter.on(EVENTS.UPDATE_HEALTH, evt => {
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
    if (+this.coinsTf.text - price[type] < 0) {
      console.log('Нужно больше золота');
      return;
    }

    eventEmitter.emit(EVENTS.PAY_TRAP, {
      type,
      point: evt.data.global,
      price: price[type],
    });
  }
}
