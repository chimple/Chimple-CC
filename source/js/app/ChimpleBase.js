var ChimpleBase = (function() {
  return {
    /* Your game can check ChimpleBase.orientated in internal loops to know if it should pause or not */
    orientated: false,
    realWidth: 0,
    realHeight: 0,
    scaleRatio: 0,
    assetScale: 0,
    designedWidth: 1280,
    designedHeight: 800,

    updateScaleRatio: function() {
      this.realWidth = Math.max(window.innerWidth, window.innerHeight);
      this.realHeight = Math.min(window.innerWidth, window.innerHeight);
      var ws = this.realWidth / (this.designedWidth * this.assetScale);
      var wh = this.realHeight / (this.designedHeight * this.assetScale);
      this.scaleRatio = Math.max(ws, wh);
      console.log('updateScaleRatio computed:' + this.scaleRatio);
    },

    getScaledX: function(originalX) {
      return originalX / ChimpleBase.scaleRatio;
    },

    getScaledY: function(originalY) {
      return originalY / ChimpleBase.scaleRatio;
    }
  };
}());
