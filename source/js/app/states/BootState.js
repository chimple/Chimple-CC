define([
    'phaser'
], function (
    Phaser
) {
    'use strict';

   function BootState() {}

   BootState.prototype = {
       init: function() {
         console.log("in init of BootState()");
         this.input.maxPointers = 1;
         this.stage.disableVisibilityChange = true;
         this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

         this.scale.forceOrientation(true,false);

         var assetScale = 1;

         ChimpleBase.realWidth = Math.max(window.innerWidth,window.innerHeight);
         ChimpleBase.realHeight = Math.min(window.innerWidth,window.innerHeight);

         if(ChimpleBase.realWidth>ChimpleBase.designedWidth || ChimpleBase.realHeight>ChimpleBase.designedHeight){
             assetScale = 2;
         }
         var ws = ChimpleBase.realWidth/(ChimpleBase.designedWidth*assetScale);
         var wh = ChimpleBase.realHeight/(ChimpleBase.designedHeight*assetScale);
         ChimpleBase.assetScale = assetScale;
         ChimpleBase.scaleRatio = Math.max(ws,wh);
         this.scale.setResizeCallback(this.gameResized, this);
         this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
         this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
         this.game.plugin=this.game.plugins.add(Phaser.Plugin.FadePlugin);         
         
         this.game.physics.startSystem(Phaser.Physics.ARCADE);                    
         
         console.log('assetScale:' + ChimpleBase.assetScale);
         console.log('scaleRatio:' + ChimpleBase.scaleRatio);         

       },

       preload: function () {

              //  Here we load the assets required for our preloader (in this case a background and a loading bar)
              this.load.image('preloaderBackground', 'assets/game-misc/images/kids_background.png');
              this.load.image('progressBar', 'assets/game-misc/images/progressBar.png');
              this.load.bitmapFont('gameFont', 'assets/game-misc/fonts/font72.png', 'assets/game-misc/fonts/font72.xml');

        },

        create: function () {

            this.state.start('Preloader');

        },

        gameResized: function (width, height) {

            //  This could be handy if you need to do any extra processing if the game resizes.
            //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
            //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

        },

        enterIncorrectOrientation: function () {

            ChimpleBase.orientated = false;
            document.getElementById('orientation').style.display = 'block';

        },

        leaveIncorrectOrientation: function () {

            ChimpleBase.orientated = true;
            document.getElementById('orientation').style.display = 'none';

        }
   };

   return BootState;
});
