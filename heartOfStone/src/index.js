import './public-path.js'
import Phaser from 'phaser'
import Engine from './js/Engine/index'
import Boot from './js/Engine/preLoad'

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [Boot, Engine],
  scale: {
    mode: Phaser.Scale.RESIZE
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { z: 300 },
      debug: false
    }
  }
  // dom: {
  //   createContainer: true
  // }
}

const game = new Phaser.Game(config)
