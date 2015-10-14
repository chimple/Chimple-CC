define(['phaser'],
function(Phaser) {
  'use strict';

  function PreloaderState() {
    this.spinner = null;
    this.text = null;
    this.emitter = null;
  };

  PreloaderState.prototype = Object.create(Phaser.State.prototype);
  PreloaderState.prototype.constructor = PreloaderState;

  PreloaderState.prototype.init = function() {
    //Add parent group for Scaling
    this.parentGroup = this.add.group();
    this.parentGroup.create(0, 0, 'preloaderBackground');

    var box = this.make.graphics(0, 0);

    box.lineStyle(8, 0xFF0000, 0.8);
    box.beginFill(0xFF700B, 1);
    box.drawRect(-50, -50, 100, 100);
    box.endFill();

    this.spinner = this.add.sprite(this.world.centerX, this.world.centerY, box.generateTexture());
    this.spinner.anchor.set(0.5);
    this.parentGroup.add(this.spinner);

    this.text = this.add.text(this.game.world.centerX, this.game.world.centerY - 30, "Loading: 0%", {
      font: "32px Arial",
      fill: "#ffffff",
      align: "center"
    });
    this.text.anchor.x = 0.5;
    this.parentGroup.add(this.text);
    this.manager = this.game.plugins.add(Phaser.ParticleStorm);
  };

  PreloaderState.prototype.preload = function() {
    this.game.forceSingleUpdate = true;

    //load background image for Master-Menu
    this.load.image('masterMenuBackGround', 'assets/master-menu/images/main_menu_background.png');
    this.load.image('block1', 'assets/game-misc/particles/block1.png');


    //load icons for Master-Menu
    this.load.atlas('shpaesMenu', 'assets/master-menu/images/game_start_button.png', 'assets/master-menu/images/game_start_button.json');

    this.load.audio('jump', ['assets/sound/jump.ogg', 'assets/sound/jump.mp3']);
    this.load.audio('coin', ['assets/sound/coin.ogg', 'assets/sound/coin.mp3']);
    this.load.audio('dead', ['assets/sound/dead.ogg', 'assets/sound/dead.mp3']);

    this.load.onFileComplete.add(this.fileLoaded, this);

  };

  PreloaderState.prototype.fileLoaded = function(progress) {

    console.log("loading how much " + progress + "%");
    this.text.setText("Loading: " + progress + "%");

  };


  PreloaderState.prototype.loadUpdate = function() {

    this.spinner.rotation += 0.05;

  };

  PreloaderState.prototype.create = function() {

    this.scaleGame();

    this.add.tween(this.spinner.scale).to({
      x: 0,
      y: 0
    }, 1000, "Elastic.easeIn", true, 250);

    this.add.tween(this.text).to({
      alpha: 0
    }, 1000, "Linear", true);

    var jump = this.game.add.audio('jump');
    var coin = this.game.add.audio('coin');
    var dead = this.game.add.audio('dead');

    //  Acceleration using number value (acceleration will not change over time)

    var data = {
      lifespan: 4000,
      image: 'block1',
      ax: 0.05,
      vx: 0.1,
      vy: {
        min: -0.5,
        max: 0.5
      }
    };

    this.manager.addData('basic', data);

    this.emitter = this.manager.createEmitter();

    this.emitter.addToWorld();

    this.emitter.emit('basic', -16, 250, {
      repeat: -1,
      frequency: 1000
    });

    this.game.sound.setDecodedCallback(
      [jump, coin, dead], this.start, this
    );

  };

  PreloaderState.prototype.render = function() {
    this.emitter.debug(432, 522);
  };

  PreloaderState.prototype.scaleGame = function() {

    this.parentGroup.scale.setTo(ChimpleBase.scaleRatio);
    this.parentGroup.x = ChimpleBase.realWidth / 2 - ChimpleBase.designedWidth * ChimpleBase.assetScale * this.parentGroup.scale.y / 2;
    this.parentGroup.y = ChimpleBase.realHeight / 2 - ChimpleBase.designedHeight * ChimpleBase.assetScale * this.parentGroup.scale.x / 2;
    this.scale.setResizeCallback(this.gameResized, this);

  };

  PreloaderState.prototype.gameResized = function(width, height) {

    ChimpleBase.updateScaleRatio();
    this.parentGroup.scale.setTo(ChimpleBase.scaleRatio);
    this.parentGroup.x = ChimpleBase.realWidth / 2 - ChimpleBase.designedWidth * ChimpleBase.assetScale * this.parentGroup.scale.y / 2;
    this.parentGroup.y = ChimpleBase.realHeight / 2 - ChimpleBase.designedHeight * ChimpleBase.assetScale * this.parentGroup.scale.x / 2;

  };

  PreloaderState.prototype.start = function() {
    this.game.plugin.fadeAndPlay("rgb(0,0,0)", 0.5, "MasterMenu");
  };
};

return PreloaderState;
});
