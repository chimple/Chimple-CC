define([
  'phaser',
  'app/builder/ShapeLevelBuilder'
],
function(Phaser) {
    'use strict';

    function LevelExecuteState() {};

    LevelExecuteState.prototype = Object.create(Phaser.State.prototype);

    LevelExecuteState.contructor = LevelExecuteState;


        LevelExecuteState.prototype.init =  function (data) {
            //Initialize level with Data
            this.levelData = data;

            //Current Level
            this.currentLevel = this.levelData['level'];

            //build local variables used
            this.howManyAttempts =  0;

            //Add parent group for Scaling
            this.group = this.game.add.group();



        };

        LevelExecuteState.prototype.renderGame =  function()
        {
            this.findStaticSpritePosition();
            this.findDraggableSpritePosition();
            this.renderStaticShape();
            this.renderDraggableShape();

        };

        LevelExecuteState.prototype.getRandomInt =  function (min, max) {

            return Math.floor(Math.random() * (max - min + 1)) + min;

        };

        LevelExecuteState.prototype.draggingStopped =  function(sprite)
        {
            console.log('3333 draging stoped' + sprite + 'static:' + this.staticShapeGroup);
            this.game.physics.arcade.overlap(sprite, this.staticShapeGroup, this.matchShapes, null, this);

            if(!sprite.joined)
            {
                this.resetSprite(sprite);
            }

        };

        LevelExecuteState.prototype.resetSprite =  function (sprite)
        {

            this.game.add.tween(sprite).to(
            {x: sprite.originX, y: sprite.originY, angle: Math.floor(Math.random() * 360)}, 1000, Phaser.Easing.Cubic.Out, true, 0, 0, false).start();

        };

        LevelExecuteState.prototype.matchShapes =  function (moveableSprite, fixedSpriteGroup)
        {
            if(!moveableSprite.joined && !fixedSpriteGroup.joined && moveableSprite.type === fixedSpriteGroup.type) {
                moveableSprite.joined = true;

                fixedSpriteGroup.joined = true;

                moveableSprite.inputEnabled = false;
                console.log('that is game:' + this.game);
                var successTween = this.game.add.tween(moveableSprite);

                successTween.to( {x: fixedSpriteGroup.x, y: fixedSpriteGroup.y}, 1000, Phaser.Easing.Cubic.In);

                successTween.to({angle: fixedSpriteGroup.angle},1000, Phaser.Easing.Cubic.In);

                successTween.onComplete.add(this.postProcess, this);
                successTween.start();
                this.howManyAttempts++;
            } else {
                this.howManyAttempts++;
            }
        };


        LevelExecuteState.prototype.postProcess = function()
        {
            console.log("post process game");
            this.computeScore();
            this.transitToNextLevel();
        };

        LevelExecuteState.prototype.computeScore =  function()
        {

            console.log('cur level:' + this.currentLevel);
            var indexLevel = this.currentLevel - 1;
            if(this.howManyAttempts == 1)
            {
                ShapeLevelBuilder.scores[indexLevel] = 3;
            }
            else if(this.howManyAttempts > 1 && this.howManyAttempts <= 3)
            {
                ShapeLevelBuilder.scores[indexLevel] = 2;
            }  else {
                ShapeLevelBuilder.scores[indexLevel] = 1;
            }
            console.log("score for level:" + ShapeLevelBuilder.scores[indexLevel]);

        };


        LevelExecuteState.prototype.transitToNextLevel =  function ()
        {
            console.log('transitToNextLevel' + this.currentLevel);
          if(this.currentLevel < ShapeLevelBuilder.initialLevels.length)
          {
            //Unlock Next Level - Array starts with Index 0
            ShapeLevelBuilder.initialLevels[this.currentLevel] = 0;
            var nextLevelData = ShapeLevelBuilder[this.currentLevel + 1];
            console.log('nextLevelData:' + nextLevelData);
            nextLevelData.advanceLevel = 1;
            this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"LevelMaster",nextLevelData);
          } else {
            this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"LevelsMenu");
          }
        };

        LevelExecuteState.prototype.renderStaticShape =  function()
        {

            var choicesOfCenterElements = this.levelData['centerElements']['count'];

            //Generate a random number between 1 and choicesOfCenterElements

            var rndIndex = this.getRandomInt(0, choicesOfCenterElements - 1);

            var randomY = this.getRandomInt(0, this.game.height);

            var item = this.flattenObject(this.levelData['centerElements']['items']);

            var position = this.findStaticSpritePosition();

            var staticShape = this.createShape(position.xPos, position.yPos, -50, randomY, item[rndIndex+'.type'],
                item[rndIndex+'.shape'], this.staticShapeGroup, this.levelData['atlas'], 0.5, 0.5, 0.2, false, false);

            var tweenPathX = this.game.add.tween(staticShape);

            var tweenPathY = this.game.add.tween(staticShape);

            tweenPathX.to( { x: staticShape.originX }, 1000, "Linear");

            tweenPathY.to( { y: staticShape.originY }, 1000, "Back.easeIn");

            var tweenScale = this.game.add.tween(staticShape.scale);

            tweenScale.to( { x: ChimpleBase.scaleRatio.x, y: ChimpleBase.scaleRatio.y }, 1000, "Cubic.easeIn");

            var tweenAlpha = this.game.add.tween(staticShape);

            tweenAlpha.to( { alpha: 1 }, 1000, "Linear");

            tweenPathX.start();

            tweenPathY.start();

            tweenScale.start();

            tweenAlpha.start();

        };

        LevelExecuteState.prototype.renderDraggableShape = function()
        {

            var shuffledDraggableElements = this.shuffleArray(this.levelData['draggableElements']['items']);
            var randomX;
            var randomY;
            var whichType;
            var whichShape;
            var tweenPathX;
            var tweenPathY;
            var draggableShapeSprite;
            var tweenAlpha;

            var radius = this.game.height/2.5;
            this.angle = 0;
            this.step = (2 * Math.PI) / shuffledDraggableElements.length;

            for (var i = 0; i < shuffledDraggableElements.length; i++) {

                whichType = shuffledDraggableElements[i]['type'];

                whichShape = shuffledDraggableElements[i]['shape'];

                randomX = Math.round(this.game.width/2 + radius * Math.cos(this.angle));

                randomY = Math.round(this.game.height/2 + radius * Math.sin(this.angle));

                var position = this.findDraggableSpritePosition(this.angle, radius);
                console.log('position drag:' + position);

                draggableShapeSprite = this.createShape(position.xPos, position.yPos, -50, -50, whichType,
                whichShape, this.draggableShapeSpriteGroup, this.levelData['atlas'], 0.5, 0.5, 0.2, true, true);

                draggableShapeSprite.inputEnabled = true;

                draggableShapeSprite.input.enableDrag();

                tweenPathX = this.game.add.tween(draggableShapeSprite);

                tweenPathY = this.game.add.tween(draggableShapeSprite);

                tweenPathX.to( { x: draggableShapeSprite.originX }, 1000, "Linear");

                tweenPathY.to( { y: draggableShapeSprite.originY }, 1000, "Back.easeIn");

                var tweenScale = this.game.add.tween(draggableShapeSprite.scale);

                tweenScale.to( { x: ChimpleBase.scaleRatio.x, y: ChimpleBase.scaleRatio.y }, 1000, "Cubic.easeIn");

                tweenAlpha = this.game.add.tween(draggableShapeSprite);

                tweenAlpha.to( { alpha: 1 }, 1000, "Linear");

                tweenPathX.start();

                tweenPathY.start();

                tweenScale.start();

                tweenAlpha.start();

                draggableShapeSprite.events.onDragStop.add(this.draggingStopped, this);

                this.angle += this.step;
            };
        };


        LevelExecuteState.prototype.findStaticSpritePosition = function()
        {
            var position = {};
            var howManyCenterElements = this.levelData['centerElements']['count'];
            var howManyDraggableElements = this.levelData['draggableElements']['count'];

            if(howManyCenterElements == 1 && howManyDraggableElements < 3)
            {
                //position Left
                position.xPos = this.game.world.centerX - this.game.world.centerX/2;
                position.yPos = this.game.world.centerY;

            } else
            {

                position.xPos = this.game.world.centerX;
                position.yPos = this.game.world.centerY;

            }
            return position;
        };


        LevelExecuteState.prototype.findDraggableSpritePosition = function(angle, radius)
        {

            var position = {};
            var howManyCenterElements = this.levelData['centerElements']['count'];
            var howManyDraggableElements = this.levelData['draggableElements']['count'];

            if(howManyCenterElements == 1 && howManyDraggableElements == 1)
            {
                //position right
                position.xPos = this.game.world.centerX + this.game.world.centerX/2;
                position.yPos = this.game.world.centerY;

            } else
            {

                position.xPos = Math.round(this.game.width/2 + radius * Math.cos(angle));
                position.yPos = Math.round(this.game.height/2 + radius * Math.sin(angle));

            }
            return position;

        };


        LevelExecuteState.prototype.flattenObject = function (ob)
        {
            var toReturn = {};

            for (var i in ob)
            {
                console.log('value of i:' + i);
                if (!ob.hasOwnProperty(i)) continue;

                if ((typeof ob[i]) == 'object')
                {

                    var flatObject = this.flattenObject(ob[i]);

                    for (var x in flatObject)
                    {

                        if (!flatObject.hasOwnProperty(x)) continue;
                        toReturn[i + '.' + x] = flatObject[x];

                    }

                } else
                {

                    toReturn[i] = ob[i];
                }
            }
            return toReturn;
        };

        LevelExecuteState.prototype.createShape =  function(posX, posY, initialXPos, initialYPos, type, frameName, group, atlas, anchorX, anchorY, alpha, inputEnabled, draggable)
        {

            var shapeSprite = group.create(0,0,atlas);
            shapeSprite.frameName =  frameName;
            shapeSprite.type = type;
            shapeSprite.anchor.setTo(anchorX, anchorY);
            shapeSprite.joined = false;
            shapeSprite.originX = ChimpleBase.getScaledX(posX);
            shapeSprite.originY = ChimpleBase.getScaledY(posY);
            shapeSprite.x = ChimpleBase.getScaledX(initialXPos);
            shapeSprite.y = ChimpleBase.getScaledY(initialYPos);

            shapeSprite.alpha = alpha;
            this.game.physics.arcade.enable(shapeSprite);
            shapeSprite.inputEnabled = inputEnabled;
            if(draggable === true) {
                console.log('draggable enabled' + frameName);
                shapeSprite.input.enableDrag();
            }
            return shapeSprite;

        };

        LevelExecuteState.prototype.preload =  function()
        {
            this.gameLevelBackGround = 'game-level-background' + this.currentLevel;
            this.load.image(this.gameLevelBackGround, this.levelData['backgroundImage']['image']);

        };

        LevelExecuteState.prototype.shuffleArray = function(array)
        {

            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;

        };


        LevelExecuteState.prototype.create = function()
        {

            this.backGroundSprite = this.group.create(0, 0,this.gameLevelBackGround);
            //this.backGroundSprite.anchor.setTo(0.5, 0.5);

            //Create Groups for Game

            this.staticShapeGroup = this.game.add.group();
            this.staticShapeGroup.enableBody = true;

            this.group.add(this.staticShapeGroup);

            this.draggableShapeSpriteGroup = this.game.add.group();
            this.draggableShapeSpriteGroup.enableBody = true;

            this.group.add(this.draggableShapeSpriteGroup);

            //Game's current Level
            this.currentLevel = this.levelData['level'];

            this.renderGame();

            this.renderControlToNavigatePreviousLevel();

            this.renderControlToNavigateNextLevel();

            this.renderControlToNavigateHome();

            this.renderControlToReloadLevel();

            this.scaleGame();

        },

        LevelExecuteState.prototype.showPreviousLevel = function()
        {

            return this.currentLevel > 1 && this.currentLevel <= ShapeLevelBuilder.initialLevels.length;

        };

        LevelExecuteState.prototype.renderControlToNavigatePreviousLevel = function()
        {

            if(this.showPreviousLevel())
            {
                console.log('render Previous level...');
                this.prevButton = this.game.add.button(ChimpleBase.getScaledX(20), ChimpleBase.getScaledY(20), 'control-buttons', this.goPrevLevel, this);
                this.prevButton.frameName = 'previous_button.png';
            }

        };

        LevelExecuteState.prototype.goPrevLevel = function() {

            console.log('clicked Previous level...');
            var prevLevelData = ShapeLevelBuilder[this.currentLevel - 1];
            prevLevelData.advanceLevel = 1;
            this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"LevelMaster",prevLevelData);

        };

        LevelExecuteState.prototype.showNextLevel = function()
        {

            return ShapeLevelBuilder.initialLevels[this.currentLevel] > -1 && this.currentLevel < ShapeLevelBuilder.initialLevels.length;

        };

        LevelExecuteState.prototype.renderControlToNavigateHome = function (){

            this.homeButton = this.game.add.button(ChimpleBase.getScaledX(20), ChimpleBase.getScaledY(this.game.world.height - 140), 'control-buttons', this.goHome, this);
            this.homeButton.frameName = 'home_button.png';

        };

        LevelExecuteState.prototype.goHome = function()
        {

            this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"LevelsMenu");

        };


        LevelExecuteState.prototype.reloadGame = function()
        {

            var reloadLevelData = ShapeLevelBuilder[this.currentLevel];
            this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"LevelMaster",reloadLevelData);

        };

        LevelExecuteState.prototype.renderControlToReloadLevel = function()
        {

            this.reloadLevel = this.game.add.button(ChimpleBase.getScaledX(this.game.world.width - 140), ChimpleBase.getScaledY(this.game.world.height - 140), 'control-buttons', this.reloadGame, this);
            this.reloadLevel.frameName = 'reload_button.png';

        };


        LevelExecuteState.prototype.renderControlToNavigateNextLevel = function()
        {
            if(this.showNextLevel())
            {
                console.log('render Next level...');
                this.nextButton = this.game.add.button(ChimpleBase.getScaledX(this.game.world.width - 140), ChimpleBase.getScaledY(20), 'control-buttons', this.goNextLevel, this);
                this.nextButton.frameName = 'next_button.png';
            }
        };

        LevelExecuteState.prototype.goNextLevel =  function()
        {

            console.log('clicked Next level...');
            var nextLevelData = ShapeLevelBuilder[this.currentLevel + 1];
            nextLevelData.advanceLevel = 1;
            this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"LevelMaster",nextLevelData);

        };

        LevelExecuteState.prototype.scaleGame = function()
        {

            /*console.log('group x  11:' + this.group.x);
            console.log('group y  11:' + this.group.y);
            console.log('ChimpleBase.realWidth:' + ChimpleBase.realWidth);
            console.log('ChimpleBase.realHeight:' + ChimpleBase.realHeight);
            console.log('ChimpleBase.designedWidth:' + ChimpleBase.designedWidth);
            console.log('ChimpleBase.designedHeight:' + ChimpleBase.designedHeight);
            console.log('this.group.scale.x:' + this.group.scale.x);
            console.log('this.group.scale.y:' + this.group.scale.y);
            */
            this.group.scale.setTo(ChimpleBase.scaleRatio);
            this.group.x = ChimpleBase.realWidth/2 - ChimpleBase.designedWidth*ChimpleBase.assetScale*this.group.scale.y/2;
            this.group.y = ChimpleBase.realHeight/2 - ChimpleBase.designedHeight*ChimpleBase.assetScale*this.group.scale.x/2;

            this.scale.setResizeCallback(this.gameResized, this);

        };

        LevelExecuteState.prototype.gameResized = function (width,height) {

          ChimpleBase.updateScaleRatio();
          this.group.scale.setTo(ChimpleBase.scaleRatio);
          this.group.x = ChimpleBase.realWidth/2 - ChimpleBase.designedWidth*ChimpleBase.assetScale*this.group.scale.y/2;
          this.group.y = ChimpleBase.realHeight/2 - ChimpleBase.designedHeight*ChimpleBase.assetScale*this.group.scale.x/2;

      };


    return LevelExecuteState;
});
