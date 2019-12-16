import * as PIXI from 'pixi.js';

export const types = {
  rake: 'RakeEffect_mc',
  sheep: 'Sheep_mc',
};

const Names = {
  RakeEffect_mc: 13,
  Sheep_mc: 20,
};

export function getTexture(type) {
  const listNames = [];
  const textureArray = [];
  for (let i = 0; i < Names[type]; i++) {
    const textureName = `${type}${i < 10 ? '000' : '00'}${i}`;
    textureArray.push(PIXI.Texture.from(textureName));
  }

  return textureArray;
}
