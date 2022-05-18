// import Player from '../player/player'
import defaultUser from '../../assets/person/defaultPerson.png'
import Phaser from 'phaser'
import newhero from '../../assets/person/newhero.png'
import EntityActionManager from './EntityManage/EntityActionManager'
import EntityActionProcessor from './EntityManage/EntityActionProcessor'
import Player from './PlayerControl/PlayerJs'
import { ActionType, ServerEvent } from '../statusTypes/Actions'

export default class Engine extends Phaser.Scene {
  constructor() {
    super('WorldScene')
    this.mapLayers = {}
    this.onMapClick = (pointer) => {
      // If something is selected, unselected
      // if (this.currentSelection) {
      //   this.emitter.emit(ActionType.ENTITY_SELECT, null)
      //   return
      // }
      console.log(pointer)
      this._moveEntity(this.player, pointer.worldX, pointer.worldY)
    }
  }
  create() {
    // this.input.setDefaultCursor('url(assets/ui/cursor-brown.cur), default')
    this.entityActions = EntityActionManager.init(this)

    this._createMap()
    this._createAnims()

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
    // new player中的参数是后台反回来的
    // this.player = new Player(this, 100, 100, this.navMesh)
    this.player = new Player(this, 80, 50)
    // this.player.id = Player.id
    this.player.id = 588
    this.player.name = Player.name
    this.player.avatar = Player.avatar
    this.add.sprite(100, 100, 1, 2)
    // // Camera follow player
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    )
    this.cameras.main.startFollow(this.player)
    this.cameras.main.roundPixels = true

    this._createEvents()

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

    const obstaclesLayer = this.map.getObjectLayer('Obstacles')
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
  _createAnims() {
    // Player animation (used mainly in the Player class when moving)
    // Need refactoring
    this.anims.create({
      key: 'player-left',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [4, 3, 4, 5]
      }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'player-right',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [7, 6, 7, 8]
      }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'player-up',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [10, 9, 10, 11]
      }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'player-down',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [1, 0, 1, 2]
      }),
      frameRate: 10,
      repeat: -1
    })

    // Other Players animation
    this.anims.create({
      key: 'other-player-left',
      frames: this.anims.generateFrameNumbers('other-player', {
        frames: [4, 3, 4, 5]
      }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'other-player-right',
      frames: this.anims.generateFrameNumbers('other-player', {
        frames: [7, 6, 7, 8]
      }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'other-player-up',
      frames: this.anims.generateFrameNumbers('other-player', {
        frames: [10, 9, 10, 11]
      }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'other-player-down',
      frames: this.anims.generateFrameNumbers('other-player', {
        frames: [1, 0, 1, 2]
      }),
      frameRate: 10,
      repeat: -1
    })
  }
  _createEvents() {
    // Server Connector Listener
    // const serverConnectorService = new ServerConnectorService(
    //   this.server,
    //   this,
    //   this.emitter
    // )
    // serverConnectorService.listen()
    // // Entity Action Listener
    const entityActionProcessor = new EntityActionProcessor()
    entityActionProcessor.listen()

    // // Skills Manager
    // const skillsManager = new SkillsManager()
    // skillsManager.listen()

    // On map click
    this.input.on('pointerdown', this.onMapClick)

    // this.emitter.on(ActionType.ENTITY_SELECT, (unit, flag = true) => {
    //   if (this.currentSelection) {
    //     this.currentSelection.select(false)
    //   }

    //   if (flag) this.currentSelection = unit
    //   else this.currentSelection = null

    //   if (unit) unit.select(flag)
    // })
  }
  _moveEntity(entity, x, y) {
    const tile = this.map.getTileAtWorldXY(
      x,
      y,
      false,
      this.cameras.main,
      this.mapLayers['grass']
    )

    console.log(tile)
    // Move Player to this position
    // Player will automatically find its path to the point and update its position accordingly
    this.entityActions.processNow(entity, {
      type: ActionType.ENTITY_GO_TO,
      args: [tile]
    })

    return tile
  }
  update() {
    this.updateMapMarker()
  }

  updateMapMarker() {
    // Convert the mouse position to world position within the camera
    const worldPoint = this.input.activePointer.positionToCamera(
      this.cameras.main
    )

    // Move map marker over pointed tile
    const pointerTileXY = this.mapLayers['ui'].worldToTileXY(
      worldPoint.x,
      worldPoint.y
    )
    const snappedWorldPoint = this.mapLayers['ui'].tileToWorldXY(
      pointerTileXY.x,
      pointerTileXY.y
    )
    this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y)
  }
}
