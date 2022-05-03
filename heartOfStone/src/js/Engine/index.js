// import Player from '../player/player'
import defaultUser from '../../assets/person/defaultPerson.png'
import newhero from '../../assets/person/newhero.png'

export default class Engine extends Phaser.Scene {
  constructor() {
    super('WorldScene')
  }
  create() {
    // this.input.setDefaultCursor('url(assets/ui/cursor-brown.cur), default')
    // this.entityActions = EntityActionManager.init(this)

    // this._createMap()
    // this._createAnims()

    // // Connect to Server World
    // this.server = window.io ? window.io() : defaultIO('http://localhost:3000')

    // // Create player
    // this.server.on('playerCreated', (player) => {
    //   this.player = new Player(this, player.x, player.y, this.navMesh)
    //   this.player.id = player.id
    //   this.player.name = player.name
    //   this.player.avatar = player.avatar

    //   // Camera follow player
    //   this.cameras.main.setBounds(
    //     0,
    //     0,
    //     this.map.widthInPixels,
    //     this.map.heightInPixels
    //   )
    //   this.cameras.main.startFollow(this.player)
    //   this.cameras.main.roundPixels = true

    //   this._createEvents()

    //   this.scene.launch('UIScene', { player: this.player, mapLayer: this.map })
    //   this.scene.launch('ReactScene', { player: this.player })
    // })
  }
}
