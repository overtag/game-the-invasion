import * as PIXI from 'pixi.js';

export const types = {
  Zombie1: 'Zombie1',
  Arancar: 'Arancar',
  Ded: 'Ded',

  Ani: 'Ani_mc',

  Beggar: 'Beggar_mc',
  Bitten: 'Bitten_mc',

  Boffin: 'Boffin_mc',
  Butcher: 'Butcher_mc',
  Clown: 'Clown_mc',
  Director: 'Director_mc',
  Doll: 'Doll_mc',
  HappyImp: 'HappyImp_mc',
  HeadZombie: 'HeadZombie_mc',
  Iceman: 'Iceman_mc',
  Liprikon: 'Liprikon_mc',
  MasqueradeV1: 'MasqueradeV1_mc',
  Menos: 'Menos_mc',
  Mutant: 'Mutant_mc',
  MasqueradeV2: 'MasqueradeV2_mc',
  PatchKiss: 'PatchKiss_mc',
  Possessed: 'Possessed_mc',
  Rambo: 'Rambo_mc',
  Scarecrow: 'Scarecrow_mc',
  Vampire: 'Vampire_mc',
  Vampiressa: 'Vampiressa_mc',
  Werewolf: 'Werewolf_mc',
  Witch: 'Witch_mc',
  Wonk: 'Wonk_mc',
  YukiOnna: 'YukiOnna_mc',
  ZBarbarian: 'ZBarbarian_mc',
  ZCyborg: 'ZCyborg_mc',
  ZFire: 'ZFire_mc',
  ZombieElectro: 'ZombieElectro_mc',
  ZombieLab: 'ZombieLab_mc',
  ZombieV2: 'ZombieV2_mc',
  ZombieV3: 'ZombieV3_mc',
  ZombieV5: 'ZombieV5_mc',
  ZombieV5Kiss: 'ZombieV5Kiss_mc',
  ZombieV6: 'ZombieV6_mc',
  ZRasta: 'ZRasta_mc',
  Kiss: 'Kiss_mc',
  ZWoman2: 'ZWoman2_mc',
  ZWoman: 'ZWoman_mc',

  Patch: 'Patch_mc',
  Jester: 'ZJester_mc',
  Fire: 'ZFire_mc',
  Woman: 'ZWoman_mc',
  ZombieV5: 'ZombieV5_mc',
  ZombieV6: 'ZombieV6_mc',
  Zombie: 'zombie_mc',
};

const Names = {
  Arancar: 19,
  Zombie1: 19,
  Ded: 20,
  Patch_mc: 20,
  ZJester_mc: 80,
  Ani_mc: 20,

  Beggar_mc: 20,
  Bitten_mc: 20,

  Boffin_mc: 20,
  Butcher_mc: 20,
  Clown_mc: 80,
  Director_mc: 40,
  Doll_mc: 80,
  HappyImp_mc: 40,
  HeadZombie_mc: 40,
  Iceman_mc: 40,
  Liprikon_mc: 40,
  MasqueradeV1_mc: 40,
  Menos_mc: 14,
  Mutant_mc: 20,
  MasqueradeV2_mc: 40,
  PatchKiss_mc: 20,
  Possessed_mc: 20,
  Rambo_mc: 40,
  Scarecrow_mc: 40,
  Vampire_mc: 20,
  Vampiressa_mc: 20,
  Werewolf_mc: 20,
  Witch_mc: 20,
  Wonk_mc: 40,
  YukiOnna_mc: 40,
  ZBarbarian_mc: 20,
  ZCyborg_mc: 20,
  ZFire_mc: 40,
  ZombieElectrov: 20,
  ZombieLab_mc: 40,
  ZombieV2_mc: 20,
  ZombieV3_mc: 39,
  ZombieV5_mc: 20,
  ZombieV5Kiss_mc: 20,
  ZombieV6_mc: 20,
  ZRasta_mc: 20,
  Kiss_mc: 20,
  ZWoman2_mc: 20,
  ZWoman_mc: 20,
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
