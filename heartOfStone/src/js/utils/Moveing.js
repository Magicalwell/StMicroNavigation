import Phaser from 'phaser'
import Engine from '../Engine/index'
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
  },
  move: function (path) {
    //if(this.isHero) console.log('move from (',path[0][0],',',path[0][1],') to (',path[path.length-1][0],',',path[path.length-1][1],')');
    if (!path || path.length <= 1) {
      return
    }
    //if(this.isActiveFighter) BattleManager.deactivateCell();
    this.currentPath = path

    var tweens = []
    for (var i = 0; i < path.length - 1; i++) {
      var sx = path[i][0]
      var sy = path[i][1]
      var ex = path[i + 1][0]
      var ey = path[i + 1][1]
      // var time = PFUtils.getDuration(sx, sy, ex, ey) // in sec
      tweens.push({
        targets: this,
        x: { value: ex, duration: 3000 },
        y: { value: ey, duration: 3000 },
        onStartParams: [sx, sy, ex, ey]
      })
    }

    this.moving = true
    this.movement = Engine.scene.tweens.timeline({
      tweens: tweens
    })
  }
})

export default Moving
