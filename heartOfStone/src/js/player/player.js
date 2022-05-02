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
    this.faceOrientation()
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

  setUp: function (data) {
    this.id = data.id || 0
    Engine.players[this.id] = this
    Engine.entityManager.addToDisplayList(this)
    this.setVisible(true)
    // this.setInteractive();

    this.name = 'Player ' + this.id
    this.setPosition(data.x, data.y)
    this.updateBubblePosition()
    this.manageOrientationPin()
  },

  update: function (data) {
    console.log('updating player')
    Moving.prototype.update.call(this, data)
    if (data.x >= 0 && data.y >= 0) this.teleport(data.x, data.y)

    var callbacks = {
      dead: this.processDeath,
      inBuilding: this.processBuilding,
      path: this.processPath
    }

    this.firstUpdate = false
  }
})

export default Player
