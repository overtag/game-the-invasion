import * as PIXI from 'pixi.js';
import { config } from '../config';
import { Button } from './ui/Button';
import { types, price } from './traps/types';

import { eventEmitter, EVENTS } from '../events/EventEmitter';

export class BottomPanel extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Sprite(PIXI.Texture.fromImage('BottomPanel3'));
    bg.position.set(config.defaultWidth * 0.5, 0);
    bg.anchor.set(0.5, 0);

    this.addChild(bg);
    this.isDrag = false;
    this.targetSprite = null;

    this.coinsTf = new PIXI.Text('1', config.panel_gold_text);
    this.coinsTf.position.set(400, 25);
    this.addChild(this.coinsTf);

    const coin = new PIXI.Sprite(PIXI.Texture.fromImage('gold0000'));
    coin.position.set(390, 29);
    coin.anchor.set(0.5, 0);
    this.addChild(coin);

    this.healtTf = new PIXI.Text('0', config.panel_text);
    this.healtTf.position.set(400, 50);
    this.addChild(this.healtTf);

    const healt = new PIXI.Sprite(PIXI.Texture.fromImage('life0000'));
    healt.position.set(390, 59);
    healt.anchor.set(0.5, 0);
    this.addChild(healt);

    this.scoreTf = new PIXI.Text('0', config.panel_text);
    this.scoreTf.position.set(400, 75);
    this.addChild(this.scoreTf);

    const score = new PIXI.Sprite(PIXI.Texture.fromImage('cupe0000'));
    score.position.set(390, 81);
    score.anchor.set(0.5, 0);
    this.addChild(score);

    // ONE TRAP
    const oneTrapBtn = new Button(
      PIXI.Texture.fromImage('Cross_btn0000'),
      PIXI.Texture.fromImage('Cross_btn0001'),
      PIXI.Texture.fromImage('Cross_btn0002'),
    );
    oneTrapBtn.width = 60;
    oneTrapBtn.height = 60;
    oneTrapBtn.position.set(170, 25);
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
      PIXI.Texture.fromImage('Pumpkin_btn0000'),
      PIXI.Texture.fromImage('Pumpkin_btn0001'),
      PIXI.Texture.fromImage('Pumpkin_btn0002'),
    );
    twoTrapBtn.width = 60;
    twoTrapBtn.height = 60;
    twoTrapBtn.position.set(235, 25);
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
      PIXI.Texture.fromImage('Stone_btn0000'),
      PIXI.Texture.fromImage('Stone_btn0001'),
      PIXI.Texture.fromImage('Stone_btn0002'),
    );
    threeTrapBtn.width = 60;
    threeTrapBtn.height = 60;
    threeTrapBtn.position.set(300, 25);
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
    const fairySprite = new PIXI.extras.AnimatedSprite(
      getTexture('FairyMenBtn'),
    );
    fairySprite.scale.set(2, 2);
    fairySprite.anchor.set(0.5, 0.5);
    fairySprite.position.set(550, 55);
    this.addChild(fairySprite);
    fairySprite.pointerdown = evt => {
      this.payTrap(types.fairy, evt);
    };
    fairySprite.animationSpeed = 0.2;
    fairySprite.gotoAndPlay(0);
    fairySprite.interactive = true;

    const coin3 = new PIXI.Sprite(PIXI.Texture.fromImage('gold0000'));
    coin3.position.set(545, 111);
    coin3.anchor.set(0.5, 0);
    this.addChild(coin3);

    const coins3Tf = new PIXI.Text('50', config.panel_gold_text);
    coins3Tf.anchor.set(0, 0.5);
    coins3Tf.position.set(510, 110 + coin3.height * 0.5);
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
