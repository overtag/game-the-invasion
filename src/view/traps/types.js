import * as PIXI from 'pixi.js';

export const types = {
  rake: 'RakeEffect_mc',
  sheep: 'Sheep_mc',
  boom2: 'Boom2_mc',
  cross: 'CrossEffect_mc',
  pumpkin: 'PumpkinEffect_mc',
  stone: 'Stone_mc',
};

export const price = {
  RakeEffect_mc: 3,
  Sheep_mc: 2,
  Cross_mc: 3,
  PumpkinEffect_mc: 2,
  Stone: 1,
};

const Names = {
  RakeEffect_mc: 13,
  Sheep_mc: 20,
  Boom2_mc: 14,
  CrossEffect_mc: 20,
  PumpkinEffect_mc: 25,
  Stone: 2,
};

export function getTexture(type) {
  const textureArray = [];
  for (let i = 0; i < Names[type]; i++) {
    const textureName = `${type}${i < 10 ? '000' : '00'}${i}`;
    textureArray.push(PIXI.Texture.from(textureName));
  }

  return textureArray;
}
