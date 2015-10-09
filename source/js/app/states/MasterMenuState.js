define(['phaser'], function(Phaser) {

    'use strict';

    function MasterMenuState() {};

    MasterMenuState.prototype = {

      preload: function() {
        		this.game.load.spritesheet('shapeLevelIcons', 'assets/level-info/match-shape/images/icons.png', 96, 96);
      },

      create: function() {

        //Add parent group for Scaling
        this.group = this.game.add.group();
        this.menubackGroundSprite =  this.group.create(0,0,'masterMenuBackGround');

        this.nameLabel =  this.game.add.bitmapText(this.game.world.centerX, -50, 'gameFont', '... Matching Shapes ...', 32);
        this.nameLabel.anchor.setTo(0.5, 0.5);
        this.shapeMenuButton = this.game.add.button(ChimpleBase.getScaledX(this.game.world.centerX), ChimpleBase.getScaledY(this.game.world.centerY),'matchShapeIcon', this.start, this);
        this.shapeMenuButton.anchor.setTo(0.5, 0.5);
        this.shapeMenuButton.scale.setTo(0,0);
        this.group.add(this.shapeMenuButton);
        
        this.tweenScalePath	= this.game.add.tween(this.shapeMenuButton.scale);
        this.tweenScalePath.to( { x: 1, y: 1}, 2000, "Cubic.easeIn");
        this.labelTweenPath = this.game.add.tween(this.nameLabel);
    		this.labelTweenPath.to({y: 30}, 1000).easing(Phaser.Easing.Bounce.Out);

        this.tweenScalePath.chain(this.labelTweenPath);

        this.tweenScalePath.start();
        this.scaleGame();

      },

      scaleGame: function()
      {
        this.group.scale.setTo(ChimpleBase.scaleRatio);
        this.group.x = ChimpleBase.realWidth/2 - ChimpleBase.designedWidth*ChimpleBase.assetScale*this.group.scale.y/2;
        this.group.y = ChimpleBase.realHeight/2 - ChimpleBase.designedHeight*ChimpleBase.assetScale*this.group.scale.x/2;
        this.scale.setResizeCallback(this.gameResized, this);

      },

      gameResized: function (width,height) {

          ChimpleBase.updateScaleRatio();
          this.group.scale.setTo(ChimpleBase.scaleRatio);
          this.group.x = ChimpleBase.realWidth/2 - ChimpleBase.designedWidth*ChimpleBase.assetScale*this.group.scale.y/2;
          this.group.y = ChimpleBase.realHeight/2 - ChimpleBase.designedHeight*ChimpleBase.assetScale*this.group.scale.x/2;

      },

      start: function()
      {
        this.input.onDown.add(function(){
          //Stop BackGround Music
          //Do Animation if required
          this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"LevelsMenu");
        }, this);
      }

    };

    return MasterMenuState;

});
