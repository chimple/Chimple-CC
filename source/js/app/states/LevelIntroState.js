define([
  'phaser'
],
function(Phaser) {
    'use strict';

    function LevelIntroState() {}

    LevelIntroState.prototype =  {
      init: function(levelData) {

            this.levelData = levelData;

        },

        create: function() {

            var tweenIntro = this.tweenIntro();

            if (this.levelData.level === 1) {
                var tweenSkillMenuPop = this.tweenSkillMenuPop();
                tweenIntro.chain(tweenSkillMenuPop);
                tweenSkillMenuPop.onComplete.add(this.levelStart, this);
            } else {
                tweenIntro.onComplete.add(this.levelStart, this);
            }

        },

        levelStart: function() {

            this.game.state.start('LevelExecute', true, false, this.levelData);

        },

        tweenIntro: function() {

            var tween = this.game.add.tween({})
                    .to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);

            return tween;

        },

        tweenSkillMenuPop: function() {

            var tween = this.game.add.tween({}).to({x: 1, y: 1}, 100, Phaser.Easing.Linear.None, true);
            return tween;

        }
    };

    return LevelIntroState;
});
