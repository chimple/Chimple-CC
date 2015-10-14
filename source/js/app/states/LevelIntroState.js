define(['phaser'], function(Phaser) {
  'use strict';

  function LevelIntroState() {}

  LevelIntroState.prototype = Object.create(Phaser.State.prototype);
  LevelIntroState.contructor = LevelIntroState;


  LevelIntroState.prototype.init = function(levelData) {
    this.levelData = levelData;
  };

  LevelIntroState.prototype.create = function() {

    var tweenIntro = this.tweenIntro();

    if (this.levelData.level === 1) {
      var tweenSkillMenuPop =
        this.tweenSkillMenuPop();
      tweenIntro.chain(tweenSkillMenuPop);
      tweenSkillMenuPop.onComplete.add(this.levelStart, this);
    } else {
      tweenIntro.onComplete.add(this.levelStart, this);
    }

  };

  LevelIntroState.prototype.levelStart = function() {

      this.game.state.start('LevelExecute', true, false, this.levelData);

    },

    LevelIntroState.prototype.tweenIntro = function() {

      var tween = this.game.add.tween({}).to({
          alpha: 0
        }, 100,
        Phaser.Easing.Linear.None, true);

      return tween;

    };

  LevelIntroState.prototype.tweenSkillMenuPop = function() {

    var tween = this.game.add.tween({}).to({
        x: 1,
        y: 1
      }, 100,
      Phaser.Easing.Linear.None, true);
    return tween;

  };

  return LevelIntroState;
});
