// import Player from '../player/player'
import defaultUser from '../../assets/person/defaultPerson.png'
import newhero from '../../assets/person/newhero.png'
import EntityActionManager from './EntityManage/EntityActionManager'
import Player from './PlayerControl/PlayerJs';

export default class Engine extends Phaser.Scene {
  constructor() {
    super('WorldScene')
    this.mapLayers = {}
  }
  create() {
    // this.input.setDefaultCursor('url(assets/ui/cursor-brown.cur), default')
    this.entityActions = EntityActionManager.init(this)

    this._createMap()
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



    this.player = new Player(this, Player.x, Player.y, this.navMesh)
    this.player.id = Player.id
    this.player.name = Player.name
    this.player.avatar = Player.avatar

    // Camera follow player
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    )
    this.cameras.main.startFollow(this.player)
    this.cameras.main.roundPixels = true


    
    // this._createEvents()

    // this.scene.launch('UIScene', { player: this.player, mapLayer: this.map })
    // this.scene.launch('ReactScene', { player: this.player })
  }
  _createMap() {
    this.map = this.make.tilemap({ key: 'map' })

    const tiles = this.map.addTilesetImage('tileset', 'tiles')
    const tiles2 = this.map.addTilesetImage('tileset2', 'tiles2', 32, 32, 1, 2)
    const tilesetGrass = this.map.addTilesetImage(
      'Grass',
      'tileset_grass',
      32,
      32,
      1,
      2
    )

    this.mapLayers['grass'] = this.map.createStaticLayer(
      'Grass',
      [tiles, tiles2, tilesetGrass],
      0,
      0
    )
    this.mapLayers['decorations'] = this.map.createStaticLayer(
      'Decorations',
      [tiles, tiles2],
      0,
      0
    )
    this.mapLayers['objects'] = this.map.createStaticLayer(
      'Objects',
      [tiles, tiles2],
      0,
      0
    )
    // this.mapLayers['objects'].setCollisionByExclusion([-1]);
    this.mapLayers['ui'] = this.map.createBlankDynamicLayer('UI', [
      tiles,
      tiles2
    ])

    // const obstaclesLayer = this.map.getObjectLayer('Obstacles')
    // this.navMesh = this.navMeshPlugin.buildMeshFromTiled('mesh', obstaclesLayer)

    this.physics.world.bounds.width = this.map.widthInPixels
    this.physics.world.bounds.height = this.map.heightInPixels

    // Tile marker
    // Create a simple graphic that can be used to show which tile the mouse is over
    const markerWidth = 4
    this.marker = this.add.graphics()
    this.marker.lineStyle(markerWidth, 0xffffff, 0.3)
    this.marker.strokeRect(
      -markerWidth / 2,
      -markerWidth / 2,
      this.map.tileWidth + markerWidth,
      this.map.tileHeight + markerWidth
    )

    // DEBUG NAVMESH
    //
    // this.navMesh.enableDebug();
    // this.navMesh.debugDrawMesh({
    //   drawCentroid: true,
    //   drawBounds: false,
    //   drawNeighbors: true,
    //   drawPortals: true
    // });
  }
}
