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
        start: function() {
            var game = new Phaser.Game(ChimpleBase.designedWidth, ChimpleBase.designedHeight, Phaser.AUTO, 'game');
            console.log('BootState:' + BootState);
            game.state.add('Boot', BootState);
            game.state.add('Preloader', PreloaderState);
            game.state.add('MasterMenu', MasterMenuState);
            game.state.add('LevelsMenu', LevelMenuState);
            game.state.add('LevelMaster', LevelMasterState);
            game.state.add('LevelIntro', LevelIntroState);
            game.state.add('LevelExecute', LevelExecuteState);
            game.state.start('Boot');            
        }
    };

    return Game;
});
