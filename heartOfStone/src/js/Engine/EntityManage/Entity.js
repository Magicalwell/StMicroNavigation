import 'phaser'
import { v4 as uuid } from 'uuid'
import * as CONFIG from '../../../gameConfig'
import { getTilePosition } from '../../utils/titleUtils'
import Mover from './Mover'
// import WorldScene from '../scenes/WorldScene'
// import EventDispatcher from '../services/EventDispatcher'
// import EntityActionManager, {
//   EntityAction
// } from '../services/EntityActionManager'
// import UIActions from './ui/UIActions'
// import { ActionType } from '../types/Actions'
// import { getPositionBetweenPoints } from '../utils/positionUtils'
// import { Position } from '../types/Positions'
// import ProgressBar from './ui/ProgressBar'
// import { POINTER_CURSOR } from '../utils/cursorUtils'
export default class Entity extends Phaser.GameObjects.Container {
  constructor(scene, xTile, yTile, navMesh, texture, frame = 1) {
    // Info

    super(
      scene,
      getTilePosition(xTile, yTile).x,
      getTilePosition(xTile, yTile).y
    )
    this.id = uuid()
    // unitType
    // unitName
    this.hp = 100
    this.damage = 10
    this.isMoving = true
    // animationKey
    this.customActions = []

    // States
    this.isSelected = false
    this.isNameAlwaysVisible = false

    // Systems
    // this.emitter = EventDispatcher.getInstance()
    // this.actions = EntityActionManager.getInstance()
    // body: Phaser.Physics.Arcade.Body;

    // unitSprite: Phaser.GameObjects.Sprite;
    // nameText: Phaser.GameObjects.Text;

    this.setSize(CONFIG.TILE_SIZE, CONFIG.TILE_SIZE)
    this.scene.physics.world.enable(this)

    scene.add.existing(this)

    // Create Unit sprite
    this._createUnitSprite(navMesh, texture, frame)
    // // Create name info
    // this._createName()
    // this._createUI()
    // Register update loop
    scene.events.on('update', this.update, this)
  }

  set name(name) {
    this.unitName = name

    if (this.nameText) this.nameText.setText(this.unitName)
  }

  _createUnitSprite(navMesh, texture, frame) {
    this.unitSprite = new Phaser.GameObjects.Sprite(
      this.scene,
      0,
      0,
      texture,
      frame
    )
    this.unitSprite.setOrigin(0.5, 1)
    // this.unitSprite.setInteractive({ cursor: POINTER_CURSOR })
    // 鼠标样式

    this.scene.add.existing(this.unitSprite)
    this.add(this.unitSprite)

    // this.unitSprite.on('pointerover', () => {
    //   this.unitSprite.setTint(0x999999)
    //   this.nameText.setVisible(true)
    // })

    // this.unitSprite.on('pointerout', () => {
    //   if (!this.isSelected) {
    //     this.unitSprite.clearTint()
    //     if (!this.isNameAlwaysVisible) this.nameText.setVisible(false)
    //   }
    // })

    // this.unitSprite.on('pointerdown', (pointer, x, y, e) => {
    //   // stop propagation (void detect click on map)
    //   e.stopPropagation()

    //   this.emitter.emit(ActionType.ENTITY_SELECT, this)
    // })

    // Register "follower" behavior
    this.follower = new Mover(this.scene, null, this.body)
  }

  _createUI() {
    this.ui = {
      progressBar: new ProgressBar(this.scene, 0, -40)
    }

    this.add(this.ui.progressBar)
  }

  enableCustomActions() {
    if (this.customActions.length > 0) {
      const customActions = new UIActions(
        this.scene,
        0,
        -100,
        this.customActions
      )

      this.ui.actionIcon = customActions
      this.add(this.ui.actionIcon)
    }
  }

  _createName() {
    this.nameText = new Phaser.GameObjects.Text(
      this.scene,
      0,
      0,
      this.unitName,
      {
        fontSize: '8'
      }
    )
    this.nameText.setOrigin(0.5, 2.4)
    this.nameText.visible = this.isNameAlwaysVisible

    this.scene.add.existing(this.nameText)
    this.add(this.nameText)
  }

  goTo(tileDestination) {
    if (this.follower) {
      this.follower.goTo(tileDestination)
    }
  }

  attack(target) {
    target.takeDamage(this.damage)
  }

  takeDamage(damage) {
    this.hp -= damage
  }

  select(isSelected) {
    this.isSelected = isSelected

    if (this.ui.actionIcon) this.ui.actionIcon.setVisible(isSelected)

    if (isSelected) {
      this.unitSprite.setTint(0x999999)
      this.nameText.setVisible(true)
    } else {
      this.unitSprite.clearTint()
      this.nameText.setVisible(false)
    }
  }

  /**
   * Return entity's current tile.
   */
  getTile() {
    let x = this.x
    let y = this.y

    return this.scene.map.getTileAtWorldXY(
      x,
      y,
      false,
      this.scene.cameras.main,
      this.scene.mapLayers['grass']
    )
  }

  /**
   * Find nearest free tile next to entity, from a 'from' point to this entity.
   * Used mainly to move an entity next to another.
   * @param from if not provided, engine will always choose tile at the *right*
   */
  getNearestFreeTile(from) {
    let nearestTilePoint
    let nearestTilePosition = Position.RIGHT
    const entityPos = new Phaser.Geom.Point(this.x, this.y)

    // If 'from', find nearest tile position
    if (from) {
      nearestTilePosition = getPositionBetweenPoints(entityPos, from)
    }

    // Calculate nearest tile following nearestTilePosition
    switch (nearestTilePosition) {
      case Position.RIGHT:
        nearestTilePoint = new Phaser.Geom.Point(
          entityPos.x + CONFIG.TILE_SIZE,
          entityPos.y
        )
        break
      case Position.LEFT:
        nearestTilePoint = new Phaser.Geom.Point(
          entityPos.x - CONFIG.TILE_SIZE,
          entityPos.y
        )
        break
      case Position.UP:
        nearestTilePoint = new Phaser.Geom.Point(
          entityPos.x,
          entityPos.y - CONFIG.TILE_SIZE
        )
        break
      case Position.DOWN:
        nearestTilePoint = new Phaser.Geom.Point(
          entityPos.x,
          entityPos.y + CONFIG.TILE_SIZE
        )
        break
    }

    return this.scene.map.getTileAtWorldXY(
      nearestTilePoint.x,
      nearestTilePoint.y,
      false,
      this.scene.cameras.main,
      this.scene.mapLayers['grass']
    )
  }

  /**
   * Look at a specific entity
   * @param entity
   */
  lookAt(entity) {
    const currentTile = this.getTile()
    const targetTile = entity.getTile()
    const distanceY = Math.abs(targetTile.y - currentTile.y)
    const distanceX = Math.abs(targetTile.x - currentTile.x)

    // Start direction animation
    if (targetTile.y > currentTile.y && distanceY > distanceX) {
      this.animate(Position.DOWN)
    } else if (targetTile.y < currentTile.y && distanceY > distanceX) {
      this.animate(Position.UP)
    } else if (targetTile.x > currentTile.x) {
      this.animate(Position.RIGHT)
    } else if (targetTile.x < currentTile.x) {
      this.animate(Position.LEFT)
    }

    // And stop it (we just need the entity to look at the target)
    this.unitSprite.anims.stop()
  }

  displayProgress(progress) {
    this.ui.progressBar.setVisible(true)
    this.ui.progressBar.setProgress(progress)

    // If progress 100%, hide it atfer x seconds
    if (progress >= 100) {
      setTimeout(() => {
        this.ui.progressBar.setVisible(false)
      }, 50)
    }
  }

  update() {
    if (!this.isMoving) return

    // // Animate player following current velocity
    // const velocity = this.body.velocity
    // if (velocity.y > 0 && Math.abs(velocity.y) > Math.abs(velocity.x)) {
    //   this.animate(Position.DOWN)
    // } else if (
    //   this.body.velocity.y < 0 &&
    //   Math.abs(velocity.y) > Math.abs(velocity.x)
    // ) {
    //   this.animate(Position.UP)
    // } else if (velocity.x > 0) {
    //   this.animate(Position.RIGHT)
    // } else if (this.body.velocity.x < 0) {
    //   this.animate(Position.LEFT)
    // } else {
    //   // this.unitSprite.anims.stop()
    // }
  }

  animate(position) {
    switch (position) {
      case Position.UP:
        this.unitSprite.play(this.animationKey + '-up', true)
        break
      case Position.LEFT:
        this.unitSprite.play(this.animationKey + '-left', true)
        break
      case Position.RIGHT:
        this.unitSprite.play(this.animationKey + '-right', true)
        break
      case Position.DOWN:
      default:
        this.unitSprite.play(this.animationKey + '-down', true)
        break
    }
  }

  destroy(fromScene) {
    // Remove update loop before destroying object
    this.scene.events.off('update', this.update, this)

    super.destroy(fromScene)
  }
}
