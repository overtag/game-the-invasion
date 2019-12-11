import * as PIXI from 'pixi.js';
import { config } from '../../config';
export class ButtonText extends PIXI.Container {
  constructor(normal, over, down, text = '') {
    super();
    /*this.textures = {
      normal : PIXI.Texture.fromImage(normal),
      over : PIXI.Texture.fromImage(over),
      down : PIXI.Texture.fromImage(down),
    };*/

    this.textures = {
      normal: normal,
      over: over,
      down: down,
    };

    this.sprite = new PIXI.Sprite(this.textures.normal);

    this.interactive = true;
    this.sprite.interactive = true;
    this.addChild(this.sprite);

    this.textField = new PIXI.Text(text, config.textFont);
    this.textField.anchor.set(0.5, 0.5);
    this.textField.position.set(
      this.sprite.width * 0.5,
      this.sprite.height * 0.5,
    );
    this.addChild(this.textField);

    this.pointerdown = this.defaultClick.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseover = this.mouseover.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.mouseupoutside = this.mouseupoutside.bind(this);
    this.mouseout = this.mouseout.bind(this);
  }

  onclick() {
    console.log('KLICK');
  }

  defaultClick() {
    this.onclick();
  }

  mousedown() {
    this.sprite.texture = this.textures.down;
  }

  mouseover() {
    this.sprite.texture = this.textures.over;
  }

  mouseup() {
    this.sprite.texture = this.textures.over;
  }

  mouseupoutside() {
    this.sprite.texture = this.textures.normal;
  }

  mouseout() {
    this.sprite.texture = this.textures.normal;
  }
}
