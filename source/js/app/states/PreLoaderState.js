define(['phaser'],
  function(Phaser){
    'use strict';

    function PreloaderState() {};

    PreloaderState.prototype = {
        init: function()
        {
              //Add parent group for Scaling
              this.group = this.game.add.group();

        },

        preload: function()
        {
              //load background image for Master-Menu
              this.load.image('masterMenuBackGround', 'assets/master-menu/images/Main_Menu_Background.png');

              //load icons for Master-Menu
              this.load.image('matchShapeIcon', 'assets/master-menu/images/match-shapes-icon.png')

              this.group.create(0,0,'preloaderBackground');

              //show percentage
              this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY-30, '0%', {fill: 'white'});
              this.group.add(this.progress);
              this.progress.anchor.setTo(0.5,0.5);

              //show progress bar
              var progressBar = this.group.create(this.game.world.centerX, this.game.world.centerY, 'progressBar');
              progressBar.anchor.setTo(0.5, 0.5);
              this.load.setPreloadSprite(progressBar);

              this.load.onFileComplete.add(this.fileComplete, this);

              this.load.audio('jump', ['assets/sound/jump.ogg', 'assets/sound/jump.mp3']);
		          this.load.audio('coin', ['assets/sound/coin.ogg', 'assets/sound/coin.mp3']);
		          this.load.audio('dead', ['assets/sound/dead.ogg', 'assets/sound/dead.mp3']);

        },

        fileComplete : function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this.progress.text = progress+"%";
        },

        create: function() {

            this.group.scale.setTo(ChimpleBase.scaleRatio);
            this.group.x = ChimpleBase.realWidth/2 - ChimpleBase.designedWidth*ChimpleBase.assetScale*this.group.scale.y/2;
            this.group.y = ChimpleBase.realHeight/2 - ChimpleBase.designedHeight*ChimpleBase.assetScale*this.group.scale.x/2;
            this.scale.setResizeCallback(this.gameResized, this);

            var jump = this.game.add.audio('jump');
            var coin = this.game.add.audio('coin');
            var dead = this.game.add.audio('dead');
            this.game.sound.setDecodedCallback(
              [jump, coin, dead], this.start, this
            );

        },

        gameResized: function (width,height) {

            ChimpleBase.updateScaleRatio();
            this.group.scale.setTo(ChimpleBase.scaleRatio);
            this.group.x = ChimpleBase.realWidth/2 - ChimpleBase.designedWidth*ChimpleBase.assetScale*this.group.scale.y/2;
            this.group.y = ChimpleBase.realHeight/2 - ChimpleBase.designedHeight*ChimpleBase.assetScale*this.group.scale.x/2;

        },

        start: function() {
		        this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"MasterMenu");
	      }
    };

    return PreloaderState;
});
