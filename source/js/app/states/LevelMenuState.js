define([
  'phaser',
  'app/builder/ShapeLevelBuilder'
],
function(Phaser
) {

    'use strict';

    function LevelMenuState() {}

    LevelMenuState.prototype = {

      preload: function() {

        //Load Data to construct Levels
        this.load.atlas('level-icons', 'assets/level-info/match-shape/images/level-icons.png', 'assets/level-info/match-shape/images/level-icons.json');
        this.load.atlas('base-level', 'assets/level-info/match-shape/images/base-level.png', 'assets/level-info/match-shape/images/base-level.json');
        this.load.atlas('level-object', 'assets/level-info/match-shape/images/level-object.png', 'assets/level-info/match-shape/images/level-object.json');
        this.load.atlas('level-color', 'assets/level-info/match-shape/images/level-color.png', 'assets/level-info/match-shape/images/level-color.json');        
        this.load.image('levelMenuBackGround', 'assets/level-info/match-shape/images/Level_Menu_Background.png');

      },

      create: function() {
          console.log('into building levels for game');
          console.log('level inforamation => initialLevels:' + ShapeLevelBuilder.initialLevels);
          this.parentLevelGroup = this.game.add.group();
          this.levelMenuBackGroundSprite =  this.parentLevelGroup.create(0,0,'levelMenuBackGround');
          this.levelIconsArr = [];
          this.buildShapewhichLevel();
      },

      buildShapewhichLevel: function() {
        this.createLevels();
        this.animateLevels();
      },

      createLevels: function() {
        console.log('level inforamation => rows:' + ShapeLevelBuilder.rows());
        console.log('level inforamation => columns:' + ShapeLevelBuilder.cols());
        this.constructLevelGrid(ShapeLevelBuilder.rows(), ShapeLevelBuilder.cols(), ShapeLevelBuilder.initialLevels, ShapeLevelBuilder.scores);
        this.scaleGame();
      },

      constructLevelGrid:function(rows, columns, levelLocks, levelScores)
      {
        var levelStartIndex = 0;

        for (var iRows=0; iRows < rows; iRows++) {
        		for (var iCols=0; iCols < columns; iCols++) {
        			// player progress info for this level

        			levelStartIndex = levelStartIndex + 1;

              if(levelStartIndex <= levelLocks.length) {

                var levelLockInfo = levelLocks[levelStartIndex-1];

                // decide which icon 'locked vs unlocked'

                var isLocked = true; // locked
                var stars = 0; // no stars

                if (levelLockInfo > -1) {
                  isLocked = false; // unlocked

                  if (levelLockInfo < 4) {

                    stars = levelScores[levelStartIndex-1];

                    if(stars == undefined) {

                      stars = 0;

                    }
                  }
                }

                // create icon
                var builtLevelIcon = this.consturctLevelIconGroup(iCols, iRows, columns, rows, (levelStartIndex - 1), isLocked, stars);
                this.parentLevelGroup.add(builtLevelIcon);
                this.levelIconsArr[levelStartIndex-1] = builtLevelIcon;
                var topIcon = this.levelIconsArr[levelStartIndex-1].getAt(0);

                // keep level nr, used in onclick method
                topIcon.whichLevel = levelStartIndex;

                // input handler
                topIcon.inputEnabled = true;
                topIcon.events.onInputDown.add(this.onSpriteDown, this);

              }

        		}
        	}
      },

      consturctLevelIconGroup: function(iCol, iRow, columns, rows, level, isLocked, howManyStars)
      {
        // create new group
        var iconGroup = this.game.add.group();

        //Add Box
        var boxSprite = this.game.add.sprite(0, 0, 'level-icons');
        boxSprite.anchor.setTo(0.5, 0.5);
        boxSprite.frameName = 'box.png';
        iconGroup.add(boxSprite);

        var horizontalSpacing = 350;
        var verticalSpacing = 300;

        var horizontalOffSet = 300;
        var verticalOffSet = 250;

        iconGroup.x = horizontalOffSet + (iCol * horizontalSpacing);
        iconGroup.y = verticalOffSet + (iRow * verticalSpacing);

        // keep original position, for restoring after certain tweens
        iconGroup.xOrg = horizontalOffSet + (iCol * horizontalSpacing);
        iconGroup.yOrg = verticalOffSet + (iRow * verticalSpacing);

        if (isLocked == false) {
          //Find out what is score
          var scoreForLevel = ShapeLevelBuilder.scores[level];
          var iconStars = this.game.add.sprite(0, 0, 'level-icons');
          iconStars.anchor.setTo(0.5, 0.5);
          if (scoreForLevel == 3) {
            iconStars.frameName = 'star_3.png';
          } else if(scoreForLevel == 2)
          {
            iconStars.frameName = 'star_2.png';
          } else if(scoreForLevel == 1) 
          {
            iconStars.frameName = 'star_1.png';
          } else {
            iconStars.frameName = 'star_white.png';  
          }
          
          iconGroup.add(iconStars);

        } else {

          //Add Lock Frame
          var lockSprite = this.game.add.sprite(0, 0, 'level-icons');
          lockSprite.anchor.setTo(0.5, 0.5);
          lockSprite.frameName = 'lock.png';
          iconGroup.add(lockSprite);

        }

        return iconGroup;

      },

      animateLevels: function() {
        // slide all icons into screen
	       for (var i=0; i < this.levelIconsArr.length; i++) {
		         // get variables
		         var iconGroup = this.levelIconsArr[i];
		         iconGroup.y = iconGroup.y + 600;
		         var y = iconGroup.y;

		        // tween animation
		         this.game.add.tween(iconGroup).to( {y: y-600}, 500, Phaser.Easing.Back.Out, true, (i*40));
	          }
      },

      onSpriteDown: function(sprite, pointer) {

        console.log('clicked:' + sprite);
        // retrieve the iconlevel
        var levelnr = sprite.whichLevel;

        if (ShapeLevelBuilder.initialLevels[levelnr-1] < 0) {
          // indicate it's locked by shaking left/right
          var iconGroup = this.levelIconsArr[levelnr-1];
          var xPos = iconGroup.xOrg;

          var tween = this.game.add.tween(iconGroup)
            .to({ x: xPos+4 }, 20, Phaser.Easing.Linear.None)
            .to({ x: xPos-4 }, 30, Phaser.Easing.Linear.None)
            .to({ x: xPos+4 }, 40, Phaser.Easing.Linear.None)
            .to({ x: xPos }, 50, Phaser.Easing.Linear.None)
            .start();
        } else {
          // simulate button press animation to indicate selection
          var iconGroup = this.levelIconsArr[levelnr-1];
          var tween = this.game.add.tween(iconGroup.scale)
            .to({ x: 0.9, y: 0.9}, 100, Phaser.Easing.Linear.None)
            .to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.None)
            .start();

          tween.onComplete.add(function(){
            console.log('OK level selected! -> ' +sprite.whichLevel);
            console.log('data for level:' +  JSON.stringify(ShapeLevelBuilder[sprite.whichLevel]));
            this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"LevelMaster",ShapeLevelBuilder[sprite.whichLevel]);
          }, this)
        }

      },

      scaleGame: function()
      {
        this.parentLevelGroup.scale.setTo(ChimpleBase.scaleRatio);
        this.parentLevelGroup.x = ChimpleBase.realWidth/2 - ChimpleBase.designedWidth*ChimpleBase.assetScale*this.parentLevelGroup.scale.y/2;
        this.parentLevelGroup.y = ChimpleBase.realHeight/2 - ChimpleBase.designedHeight*ChimpleBase.assetScale*this.parentLevelGroup.scale.x/2;
        this.scale.setResizeCallback(this.gameResized, this);

      },

      gameResized: function (width,height) {

          ChimpleBase.updateScaleRatio();
          this.parentLevelGroup.scale.setTo(ChimpleBase.scaleRatio);
          this.parentLevelGroup.x = ChimpleBase.realWidth/2 - ChimpleBase.designedWidth*ChimpleBase.assetScale*this.parentLevelGroup.scale.y/2;
          this.parentLevelGroup.y = ChimpleBase.realHeight/2 - ChimpleBase.designedHeight*ChimpleBase.assetScale*this.parentLevelGroup.scale.x/2;

      },

    };


    return LevelMenuState;

});
