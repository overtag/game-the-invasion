import * as PIXI from 'pixi.js';

export const eventEmitter = new PIXI.utils.EventEmitter();
export const EVENTS = {
  SET_STATE: 'SET_STATE',
  NEW_GAME_CONTROLLER: 'NEW_GAME_CONTROLLER',
  NEW_GAME_VIEW: 'NEW_GAME_VIEW',
};
