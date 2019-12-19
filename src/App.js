import * as PIXI from 'pixi.js';
import * as filters from 'pixi-filters';
import { config } from './config.js';
import { Core } from './view/Core.js';
import { Controller } from './Controller';

export class App {
  constructor() {
    var canvas = document.getElementById('game-canvas');
    // filters
    Object.assign(PIXI.filters, filters);
    // sound
    document.body.style.transform = 'rotate(0deg)';

    this.isPixiLoad = false;
    this.isSoundLoad = false;

    PIXI.Graphics.CURVES.adaptive = true;
    config.isMobile = !!window.navigator.userAgent.match(
      /iPhone|Android|BlackBerry/i,
    );
    this.defaultWidth = config.defaultWidth;
    this.defaultHeight = config.defaultHeight;
    this.canvas = canvas;
    this.canvas.width = this.defaultWidth;
    this.canvas.height = this.defaultHeight;
    window.canvas = this.canvas;
    PIXI.loader
      .add('../assets/enemies/Ani.json')
      .add('../assets/enemies/Arancar.json')
      .add('../assets/enemies/Zombie.json')
      .add('../assets/enemies/ZJester.json')

      .add('../assets/enemies/Beggar.json')
      .add('../assets/enemies/Bitten.json')
      .add('../assets/enemies/Boffin.json')
      .add('../assets/enemies/Butcher.json')
      .add('../assets/enemies/Clown.json')
      .add('../assets/enemies/Director.json')
      .add('../assets/enemies/Doll.json')
      .add('../assets/enemies/HappyImp.json')
      .add('../assets/enemies/HeadZombie.json')
      .add('../assets/enemies/Iceman.json')
      .add('../assets/enemies/Kiss.json')
      .add('../assets/enemies/Liprikon.json')
      .add('../assets/enemies/MasqueradeV1.json')
      .add('../assets/enemies/MasqueradeV2.json')
      .add('../assets/enemies/Menos.json')
      .add('../assets/enemies/Mutant.json')
      .add('../assets/enemies/PatchKiss.json')
      .add('../assets/enemies/Possessed_mc.json')
      .add('../assets/enemies/Rambo.json')
      .add('../assets/enemies/Scarecrow.json')
      .add('../assets/enemies/Vampire.json')
      .add('../assets/enemies/Vampiressa.json')
      .add('../assets/enemies/Werewolf.json')
      .add('../assets/enemies/Witch.json')
      .add('../assets/enemies/Wonk.json')
      .add('../assets/enemies/YukiOnna.json')
      .add('../assets/enemies/ZBarbarian.json')
      .add('../assets/enemies/ZCyborg.json')
      .add('../assets/enemies/ZFire.json')
      .add('../assets/enemies/ZombieElectro.json')
      .add('../assets/enemies/ZombieLab.json')
      .add('../assets/enemies/ZombieV2.json')
      .add('../assets/enemies/ZombieV3.json')
      .add('../assets/enemies/ZombieV5.json')
      .add('../assets/enemies/ZombieV5Kiss.json')
      .add('../assets/enemies/ZombieV6.json')
      .add('../assets/enemies/ZRasta.json')
      .add('../assets/enemies/ZWoman.json')
      .add('../assets/enemies/ZWomanV2.json')
      .add('../assets/game_back.json')
      .add('../assets/lobby.json')
      .add('../assets/button.png')
      .add('../assets/Sheep_effect.json')

      .add('../assets/back.json')
      .add('../assets/LevelCemetery.json')

      .add('../assets/Cross.json')
      .add('../assets/Cross_effect.json')
      .add('../assets/Pumpkin.json')
      .add('../assets/Pumpkin_effect.json')
      .add('../assets/Stone.json')
      .add('../assets/Fairy.json')

      .add('../assets/trab_back.png')
      .add('../assets/rake.json')
      .add('../assets/rake_effect.json')
      .add('../assets/Sheep.json')
      .add('../assets/boom2.json')
      .load(this.init.bind(this));
  }

  init() {
    const stage = new PIXI.Container();
    const renderer = PIXI.autoDetectRenderer(
      this.canvas.width,
      this.canvas.height,
      {
        view: this.canvas,
        transparent: true,
        antialias: true,
        autoResize: true,
      },
    );

    this.app = { stage, renderer, view: this.canvas };
    config.app = { stage, renderer, view: this.canvas };
    requestAnimationFrame(this.update.bind(this));

    this.viewWidth = 1;
    this.viewHeight = 1;

    if (!this.core) this.core = new Core();
    if (!this.controller) this.controller = new Controller();

    this.core.visible = true;
    this.app.stage.addChild(this.core);

    this.controller.init();

    this.resize();
  }

  update() {
    this.app.renderer.render(this.app.stage);
    requestAnimationFrame(this.update.bind(this));
  }

  onResize() {
    let width = window.innerWidth; // document.getElementById('visualization').clientWidth;
    let height = window.innerHeight;

    const canvas = this.app.view;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width;
    canvas.height = height;

    this.app.renderer.resize(width, height);
    // this.defaultWidth = config.internalWidth;
    // this.defaultHeight = config.internalHeight;
  }

  resize() {
    this.onResize();
    const sW = ((this.app.view.width / this.defaultWidth) * 10) / 10;
    const sH = ((this.app.view.height / this.defaultHeight) * 10) / 10;
    let koef = sW < sH ? sW : sH;

    this.core.scale.set(koef);
    this.core.position.set(
      this.app.view.width / 2 - this.core.width / 2,
      this.app.view.height / 2 - this.core.height / 2,
    );
  }
}

new App();
