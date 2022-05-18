import EventDispatcher from './EventDispatcher'
// import InventoryItem from '../models/InventoryItem'
import { ActionType, ServerEvent } from '../types/Actions'

export default class EntityActionProcessor {
  constructor() {
    this.emitter = EventDispatcher.getInstance()
  }

  listen() {
    // Player move
    this.emitter.on(ActionType.ENTITY_GO_TO, (unit, tile) => {
      unit.goTo(tile)
    })

    // Move other players
    this.emitter.on(ServerEvent.ENTITY_MOVED, (unit, tile) => {
      unit.goTo(tile)
    })

    // this.emitter.on(ActionType.RESOURCE_COLLECT, (unit, object) => {
    //   // Look at object
    //   unit.lookAt(object)

    //   if (unit.inventory) {
    //     // Create inventory's item and add it to unit's inventory
    //     const itemInventory = new InventoryItem(
    //       object.item,
    //       object.itemQuantity
    //     )
    //     unit.inventory.add(itemInventory)

    //     // Increase harvesting skill
    //     if (object.harvestingSkill) {
    //       this.emitter.emit(
    //         ActionType.SKILL_INCREASE,
    //         unit,
    //         object.harvestingSkill,
    //         object.harvestingSkillXp
    //       )
    //     }
    //   }
    // })

    this.emitter.on(ActionType.ACTION_PROGRESS, (owner, progress, target) => {
      target.displayProgress(progress)
    })
  }
}
