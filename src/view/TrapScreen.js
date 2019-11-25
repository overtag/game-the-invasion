import * as PIXI from 'pixi.js';
import { eventEmitter, EVENTS } from '../events/EventEmitter';
import { config } from '../config';
import { BottomPanel } from './BottomPanel';

export class TrapScreen extends PIXI.Container {
  constructor() {
    super();
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
