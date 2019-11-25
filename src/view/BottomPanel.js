import * as PIXI from 'pixi.js';
import { config } from '../config';
import { Button } from './ui/Button';

export class BottomPanel extends PIXI.Container {
  constructor() {
    super();

    const bg = new PIXI.Graphics();
    bg.beginFill(0xd7dce1);
    bg.drawRect(0, 0, config.defaultWidth, 150);
    bg.endFill();
    this.addChild(bg);

    const trapTexture = this.createRectangleButton().generateCanvasTexture();
    const oneTrapBtn = new Button(trapTexture, trapTexture, trapTexture);
    oneTrapBtn.position.set(50, 35);
    this.addChild(oneTrapBtn);

    const twoTrapBtn = new Button(trapTexture, trapTexture, trapTexture);
    twoTrapBtn.position.set(50, 35);
    this.addChild(twoTrapBtn);

    const threeTrapBtn = new Button(trapTexture, trapTexture, trapTexture);
    threeTrapBtn.position.set(50, 35);
    this.addChild(threeTrapBtn);
  }

  createRectangleButton() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 80, 80);
    graphics.endFill();

    return graphics;
  }
}
