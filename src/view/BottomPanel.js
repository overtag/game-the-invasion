import * as PIXI from 'pixi.js';
import { config } from '../config';
import { Button } from './ui/Button';
import { types, price } from './traps/types';

import { eventEmitter, EVENTS } from '../events/EventEmitter';

export class BottomPanel extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Sprite(PIXI.Texture.fromImage('panel_back.png'));
    bg.position.set(0, 0);

    this.addChild(bg);
    this.isDrag = false;
    this.targetSprite = null;

    this.coinsTf = new PIXI.Text('1', config.panel_gold_text);
    this.coinsTf.position.set(450, 42);
    this.addChild(this.coinsTf);

    const coin = new PIXI.Sprite(PIXI.Texture.fromImage('coin'));
    coin.position.set(430, 35);
    coin.anchor.set(0.5, 0);
    this.addChild(coin);

    this.healtTf = new PIXI.Text('0', config.panel_text);
    this.healtTf.position.set(450, 73);
    this.addChild(this.healtTf);

    const healt = new PIXI.Sprite(PIXI.Texture.fromImage('heart'));
    healt.position.set(430, 7069);
    healt.anchor.set(0.5, 0);
    this.addChild(healt);

    this.scoreTf = new PIXI.Text('0', config.panel_text);
    this.scoreTf.position.set(450, 105);
    this.addChild(this.scoreTf);

    const score = new PIXI.Sprite(PIXI.Texture.fromImage('cube'));
    score.position.set(430, 101);
    score.anchor.set(0.5, 0);
    this.addChild(score);

    // ONE TRAP
    const oneTrapBtn = new Button(
      PIXI.Texture.fromImage('cross.png'),
      PIXI.Texture.fromImage('cross.png'),
      PIXI.Texture.fromImage('cross.png'),
    );
    oneTrapBtn.width = 90;
    oneTrapBtn.height = 90;
    oneTrapBtn.position.set(86, 46);
    this.addChild(oneTrapBtn);
    oneTrapBtn.pointerdown = evt => {
      this.payTrap(types.cross, evt);
    };

    const coin0 = new PIXI.Sprite(PIXI.Texture.fromImage('gold0000'));
    coin0.position.set(200, 87);
    coin0.anchor.set(0.5, 0);
    this.addChild(coin0);

    const coins0Tf = new PIXI.Text('5', config.panel_gold_text);
    coins0Tf.anchor.set(0, 0.5);
    coins0Tf.position.set(180, 87 + coin0.height * 0.5);
    this.addChild(coins0Tf);

    // TWO TRAP
    const twoTrapBtn = new Button(
      PIXI.Texture.fromImage('pumpkin.png'),
      PIXI.Texture.fromImage('pumpkin.png'),
      PIXI.Texture.fromImage('pumpkin.png'),
    );
    twoTrapBtn.width = 90;
    twoTrapBtn.height = 90;
    twoTrapBtn.position.set(194, 46);
    this.addChild(twoTrapBtn);
    twoTrapBtn.pointerdown = evt => {
      this.payTrap(types.pumpkin, evt);
    };

    const coin1 = new PIXI.Sprite(PIXI.Texture.fromImage('gold0000'));
    coin1.position.set(265, 87);
    coin1.anchor.set(0.5, 0);
    this.addChild(coin1);

    const coins1Tf = new PIXI.Text('3', config.panel_gold_text);
    coins1Tf.anchor.set(0, 0.5);
    coins1Tf.position.set(245, 87 + coin0.height * 0.5);
    this.addChild(coins1Tf);

    // THREE TRAP
    const threeTrapBtn = new Button(
      PIXI.Texture.fromImage('fence.png'),
      PIXI.Texture.fromImage('fence.png'),
      PIXI.Texture.fromImage('fence.png'),
    );
    threeTrapBtn.width = 90;
    threeTrapBtn.height = 90;
    threeTrapBtn.position.set(302, 46);
    this.addChild(threeTrapBtn);

    threeTrapBtn.pointerdown = evt => {
      this.payTrap(types.stone, evt);
    };

    const coin2 = new PIXI.Sprite(PIXI.Texture.fromImage('gold0000'));
    coin2.position.set(330, 87);
    coin2.anchor.set(0.5, 0);
    this.addChild(coin2);

    const coins2Tf = new PIXI.Text('1', config.panel_gold_text);
    coins2Tf.anchor.set(0, 0.5);
    coins2Tf.position.set(310, 87 + coin0.height * 0.5);
    this.addChild(coins2Tf);
    // FairyMenBtn0164

    // FOUR
    const fairySprite = new PIXI.Sprite(PIXI.Texture.fromImage('lamp.png'));

    fairySprite.position.set(536, 46);
    this.addChild(fairySprite);
    fairySprite.pointerdown = evt => {
      this.payTrap(types.fairy, evt);
    };

    fairySprite.interactive = true;

    const coin3 = new PIXI.Sprite(PIXI.Texture.fromImage('gold0000'));
    coin3.position.set(545, 111 - 20);
    coin3.anchor.set(0.5, 0);
    this.addChild(coin3);

    const coins3Tf = new PIXI.Text('50', config.panel_gold_text);
    coins3Tf.anchor.set(0, 0.5);
    coins3Tf.position.set(510, 110 + coin3.height * 0.5 - 20);
    this.addChild(coins3Tf);

    //
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
