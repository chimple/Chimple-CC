define([
    'phaser',
    'app/states/BootState',
    'app/states/PreloaderState',
    'app/states/MasterMenuState',
    'app/states/LevelMenuState',
    'app/states/LevelMasterState',
    'app/states/LevelIntroState',
    'app/states/LevelExecuteState',
    'app/ChimpleBase',
], function (
    Phaser,
    BootState,
    PreloaderState,
    MasterMenuState,
    LevelMenuState,
    LevelMasterState,
    LevelIntroState,
    LevelExecuteState
) {
    'use strict';

    function Game() {}

    Game.prototype = {
        constructor: Game,
        start: function() {
            this.game = new Phaser.Game(ChimpleBase.designedWidth, ChimpleBase.designedHeight, Phaser.AUTO, 'game');
            this.game.state.add('Boot', BootState);
            this.game.state.add('Preloader', PreloaderState);
            this.game.state.add('MasterMenu', MasterMenuState);
            this.game.state.add('LevelsMenu', LevelMenuState);
            this.game.state.add('LevelMaster', LevelMasterState);
            this.game.state.add('LevelIntro', LevelIntroState);
            this.game.state.add('LevelExecute', LevelExecuteState);
            this.game.state.start('Boot');
        }
    };

    return Game;
});
