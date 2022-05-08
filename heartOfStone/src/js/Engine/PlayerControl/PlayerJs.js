import 'phaser'
import Entity, { EntityType } from '../EntityManage/Entity'
// import Inventory, { HasInventory } from '../systems/InventorySystem'
// import SkillsSystem, { HasSkills } from '../systems/SkillsSystem'
// import WoodCuttingSkill from './skills/WoodCuttingSkill'
// import FarmingSkill from './skills/FarmingSkill'
// import MiningSkill from './skills/MiningSkill'

export default class Player extends Entity {
  constructor(scene, x, y, navMesh) {
    super(scene, x, y, navMesh, 'player', 1)
    // this.unitType = EntityType.PLAYER
    this.name = 'Player'
    this.animationKey = 'player'
    this.avatar = ''

    // behaviors
    // this.inventory = new Inventory()
    // this.skills = new SkillsSystem([

    // ])
  }
}
