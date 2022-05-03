import Phaser from 'phaser'
import newhero from '../../assets/person/newhero.png'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  preload() {
    this.load.spritesheet('newhero', newhero, {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create() {
    // this.scene.start('WorldScene')
  }
}
