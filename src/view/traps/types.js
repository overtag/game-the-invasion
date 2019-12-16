import * as PIXI from 'pixi.js';

export const types = {
  rake: 'RakeEffect_mc',
  sheep: 'Sheep_mc',
  boom2: 'Boom2_mc',
};

const Names = {
  RakeEffect_mc: 13,
  Sheep_mc: 20,
  Boom2_mc: 14,
};

export function getTexture(type) {
  const textureArray = [];
  for (let i = 0; i < Names[type]; i++) {
    const textureName = `${type}${i < 10 ? '000' : '00'}${i}`;
    textureArray.push(PIXI.Texture.from(textureName));
  }

  return textureArray;
}
