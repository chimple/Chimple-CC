(function () {
    'use strict';

    requirejs.config({
        baseUrl: "js/",
        paths: {
            phaser: 'lib/phaser/phaser',
            jquery: 'lib/jquery/jquery'
        },
        shim: {
            'jquery': {
              exports: "$"
            },
            'phaser': {
                deps: ["jquery"],
                exports: 'Phaser'
            }
        }
    });

    require([
        'phaser',
        'app/ChimpleBase',
        'app/plugins/FadePlugin',
        'app/plugins/PhaserStorm',
        'app/Game'
    ],
    function (
        Phaser,
        ChimpleBase,
        FadePlugin,
        PhaserStorm,
        Game
    ) {
        var game = new Game();
        game.start();
    });
}());
