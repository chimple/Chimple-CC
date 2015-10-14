define([
  'phaser'
], function(
  Phaser
) {
  'use strict';

  function LevelMasterState() {}

  LevelMasterState.prototype = Object.create(Phaser.State.prototype);
  LevelMasterState.prototype.constructor = LevelMasterState;

  LevelMasterState.prototype.init = function(levelData) {
      this.levelData = levelData;
      console.log('data received:' + this.levelData);
    };

    LevelMasterState.prototype.create =  function() {
      this.decideLevelState();
    };

    LevelMasterState.prototype.decideLevelState = function() {
      if (this.isFirstLevel() || this.advanceToNextLevel() !== -1) {
        this.nextLevel();
      } else {
        this.nextRound();
      }
    };

    LevelMasterState.prototype.nextLevel = function() {
      this.levelData.round = 1; //first round
      this.game.state.start('LevelIntro', true, false, this.levelData);
    },

    LevelMasterState.prototype.nextRound = function() {
      this.levelData.round++;
      this.game.state.start('LevelExecute', true, false, this.levelData);
    };

    LevelMasterState.prototype.isFirstLevel = function() {
      return this.levelData.level === 0;
    };

    LevelMasterState.prototype.advanceToNextLevel = function() {
      return this.levelData.advanceLevel;
    };

  return LevelMasterState;
});
