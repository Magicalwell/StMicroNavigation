import Phaser from 'phaser'
// import CustomSprite from './CustomSprite'
var Moving = new Phaser.Class({
  // Extends: CustomSprite,

  initialize: function Moving() {
    // Using call(), the called method will be executed while having 'this' pointing to the first argumentof call()

    this.orientation = 'down'
    this.previousOrientation = null
    this.movement = null
    this.currentPath = []

    this.bubbleOffsetX = 55
    this.bubbleOffsetY = 75
  }
})

export default Moving
