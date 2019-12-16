import * as PIXI from 'pixi.js';

export const types = {
  Ani: 'Ani_mc',
  Arancar: 'Arancar_mc',
  Beggar: 'Beggar_mc',
  Bitten: 'Bitten_mc',

  Boffin_mc0019: 'Boffin_mc0019',
  Butcher_mc0019: 'Butcher_mc0019',
  Clown_mc0079: 'Clown_mc0079',
  Director_mc0039: 'Director_mc0039',
  Doll_mc0079: 'Doll_mc0079',
  HappyImp_mc0039: 'HappyImp_mc0039',
  HeadZombie_mc0039: 'HeadZombie_mc0039',
  Iceman_mc0039: 'Iceman_mc0039',
  Liprikon_mc0039: 'Liprikon_mc0039',
  MasqueradeV1_mc0039: 'MasqueradeV1_mc0039',
  Menos_mc0013: 'Menos_mc0013',
  Mutant_mc0019: 'Mutant_mc0019',
  MasqueradeV2_mc0039: 'MasqueradeV2_mc0039',
  PatchKiss_mc0019: 'PatchKiss_mc0019',
  Possessed_mc0019: 'Possessed_mc0019',
  Rambo_mc0039: 'Rambo_mc0039',
  Scarecrow_mc0039: 'Scarecrow_mc0039',
  Vampire_mc0019: 'Vampire_mc0019',
  Vampiressa_mc0019: 'Vampiressa_mc0019',
  Werewolf_mc0019: 'Werewolf_mc0019s',
  Witch_mc0019: 'Witch_mc0019',
  Wonk_mc0039: 'Wonk_mc0039',
  YukiOnna_mc0039: 'YukiOnna_mc0039',
  ZBarbarian_mc0019: 'ZBarbarian_mc0019',
  ZCyborg_mc0019: 'ZCyborg_mc0019',
  ZFire_mc0039: 'ZFire_mc0039',
  ZombieElectro_mc0019: 'ZombieElectro_mc0019',
  ZombieLab_mc0039: 'ZombieLab_mc0039',
  ZombieV2_mc0019: 'ZombieV2_mc0019',
  ZombieV3_mc0038: 'ZombieV3_mc0038',
  ZombieV5_mc0019: 'ZombieV5_mc0019',
  ZombieV5Kiss_mc0019: 'ZombieV5Kiss_mc0019',
  ZombieV6_mc0019: 'ZombieV6_mc0019',
  ZRasta_mc0019: 'ZRasta_mc0019',
  Kiss_mc0019: 'Kiss_mc0019',
  ZWoman2_mc0019: 'ZWoman2_mc0019',
  ZWoman_mc0019: 'ZWoman_mc0019',

  Patch: 'Patch_mc',
  Jester: 'ZJester_mc',
  Fire: 'ZFire_mc',
  Woman: 'ZWoman_mc',
  ZombieV5: 'ZombieV5_mc',
  ZombieV6: 'ZombieV6_mc',
  Zombie: 'zombie_mc',
};

const Names = {
  Patch_mc: 20,
  ZJester_mc: 80,
  Ani_mc: 20,
  Arancar_mc: 40,
  Beggar_mc: 20,
  Bitten_mc: 20,
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
