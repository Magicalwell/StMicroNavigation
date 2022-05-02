import Phaser from 'phaser'
import Engine from './js/Engine/index'

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,
  scene: [Engine],
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
    width: window.innerWidth,
    height: window.innerHeight
  }
  // dom: {
  //   createContainer: true
  // }
}

const game = new Phaser.Game(config)
