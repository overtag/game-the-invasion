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

    const oneTrapBtn = new Button(
      PIXI.Texture.fromImage('Cross_btn0000'),
      PIXI.Texture.fromImage('Cross_btn0001'),
      PIXI.Texture.fromImage('Cross_btn0002'),
    );
    oneTrapBtn.position.set(170, 55);
    this.addChild(oneTrapBtn);
    oneTrapBtn.pointerdown = evt => {
      this.payTrap(types.cross, evt);
    };

    const twoTrapBtn = new Button(
      PIXI.Texture.fromImage('Pumpkin_btn0000'),
      PIXI.Texture.fromImage('Pumpkin_btn0001'),
      PIXI.Texture.fromImage('Pumpkin_btn0002'),
    );
    twoTrapBtn.position.set(170 + 50, 55);
    this.addChild(twoTrapBtn);
    twoTrapBtn.pointerdown = evt => {
      this.payTrap(types.pumpkin, evt);
    };

    /* const sheepSprite = new PIXI.Sprite(
      PIXI.Texture.fromImage('Pumpkin_mc0000'),
    );
    //sheepSprite.scale.set(2);
    sheepSprite.anchor.set(0.5, 0.5);
    sheepSprite.position.set(twoTrapBtn.width * 0.5, twoTrapBtn.height * 0.5);
    twoTrapBtn.addChild(sheepSprite);*/

    const threeTrapBtn = new Button(
      PIXI.Texture.fromImage('Stone_btn0000'),
      PIXI.Texture.fromImage('Stone_btn0001'),
      PIXI.Texture.fromImage('Stone_btn0002'),
    );
    threeTrapBtn.position.set(270, 55);
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

    // FairyMenBtn0164

    // FOUR
    const fairySprite = new PIXI.extras.AnimatedSprite(
      getTexture('FairyMenBtn'),
    );
    fairySprite.anchor.set(0.5, 0.5);
    fairySprite.position.set(550, 55);
    this.addChild(fairySprite);
    fairySprite.pointerdown = evt => {
      this.payTrap(types.stone, evt);
    };
    fairySprite.gotoAndPlay(0);
    eventEmitter.on(EVENTS.UPDATE_GOLD, evt => {
      this.coinsTf.text = evt.gold;
    });

    eventEmitter.on(EVENTS.UPDATE_HEALTH, evt => {
      this.healtTf.text = evt.health;
    });
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

const Names = {
  FairyMenBtn: 164,
};

//
function getTexture(type) {
  const textureArray = [];
  for (let i = 0; i < Names[type]; i++) {
    const textureName = `${type}${'0000'.substr(`${i}`.length)}${i}`;
    textureArray.push(PIXI.Texture.from(textureName));
  }

  return textureArray;
}
