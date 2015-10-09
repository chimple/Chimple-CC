define([
    'phaser'
], function (
    Phaser
) {
    'use strict';

    function LevelMasterState() {}

    LevelMasterState.prototype =  {
      init: function (levelData) {
          this.levelData = levelData;
          console.log('data received:' + this.levelData);
      },

      create: function() {
          this.decideLevelState();
      },

      decideLevelState: function() {
          if (this.isFirstLevel() || this.advanceToNextLevel() !== -1) {
              this.nextLevel();
          } else {
              this.nextRound();
          }
      },

      nextLevel: function() {
          this.levelData.round = 1; //first round
          this.game.state.start('LevelIntro', true, false, this.levelData);
      },

      nextRound: function() {
          this.levelData.round++;          
          this.game.state.start('LevelExecute', true, false, this.levelData);
      },

      isFirstLevel: function() {
          return this.levelData.level === 0;
      },

      advanceToNextLevel: function() {
         return this.levelData.advanceLevel;
      }

    };

    return LevelMasterState;
});
