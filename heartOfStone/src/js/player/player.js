import Phaser from 'phaser'

import Engine from '../Engine'
import Moving from '../utils/Moveing'
var Player = new Phaser.Class({
  Extends: Moving,

  initialize: function Player() {
    // Using call(), the called method will be executed while having 'this' pointing to the first argumentof call()
    Moving.call(this)

    this.entityType = 'player'

    this.setTexture('hero')
    this.setOrigin(0.2, 0.5)
    this.firstUpdate = true

    this.animPrefix = 'player'
    this.footprintsFrame = 0
    this.printsVertOffset = 10

    // this.setFrame(this.restingFrames.down);
    this.cellsWidth = 1
    this.cellsHeight = 1

    this.destinationAction = null

    // this.orientationPin = new OrientationPin('player', this)
    this.flipPrint = false

    this.battleBoxData = {
      atlas: 'faces',
      frame: 0
    }
  },

  setUp: function (data) {},

  update: function (data) {}
})

export default Player
