import Phaser from 'phaser'
import newhero from '../../assets/person/newhero.png'
import mapString from '../../assets/map/world.json'
import tiles from '../../assets/map/tileset/tileset.png'
import tiles2 from '../../assets/map/tileset/tileset2_extruded.png'
import tileset_grass from '../../assets/map/tileset/tileset_grass_extruded.png'
import tileset from '../../assets/map/tileset/tileset.png'
import player from '../../assets/player-sprite.png'
import otherplayer from '../../assets/other-player-sprite.png'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  preload() {
    this.load.image('tiles', tiles)
    this.load.image('tiles2', tiles2)
    this.load.image('tileset_grass', tileset_grass)
    this.load.tilemapTiledJSON('map', mapString)
    // 以上是地图相关
    this.load.spritesheet('tileset', tileset, {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('player', player, {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('other-player', otherplayer, {
      frameWidth: 32,
      frameHeight: 32
    })
    // 以上是角色相关
    this.load.spritesheet('newhero', newhero, {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create() {
    this.scene.start('WorldScene')
  }
}
