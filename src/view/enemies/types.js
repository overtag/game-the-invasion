import * as PIXI from 'pixi.js';

export const types = {
  Patch: 'Patch_mc',
  Jester: 'ZJester_mc',
};

const Names = {
  Patch_mc: 20,
  ZJester_mc: 80,
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
