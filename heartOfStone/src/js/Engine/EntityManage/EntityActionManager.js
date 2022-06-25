import EventDispatcher from './EventDispatcher'
import Entity from './Entity'
// import { ActionType } from '../types/Actions'
const ActionStatus = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED'
}
export default class EntityActionManager {
  static init(scene) {
    this.instance = new EntityActionManager(scene)

    return this.instance
  }

  static getInstance() {
    if (!instance) throw new Error('EntityActionManager is not initialized.')

    return instance
  }

  constructor(scene) {
    this.THICK_TIMER = 200
    this.emitter = EventDispatcher.getInstance()
    this.scene = scene

    this.actionsQueue = {}
    // emitter = EventDispatcher.getInstance()
    // scene: Phaser.Scene;

    this.entities = {}
    this.update = () => {
      // console.log(this.actionsQueue)
      for (let entityId in this.actionsQueue) {
        const entityActions = this.actionsQueue[entityId]

        // If no pending action for this entity, continue
        // @TODO Remove entity from actionsQueue list if empty
        if (entityActions.length <= 0) {
          continue
        }

        const nextAction = entityActions[0]

        // Wait until current action is completed
        if (nextAction.status === ActionStatus.RUNNING) {
          if (
            nextAction.progress &&
            typeof nextAction.progress === 'function'
          ) {
            const progress = nextAction.progress(
              nextAction,
              this.entities[entityId]
            )
            this.emitter.emit(
              ActionType.ACTION_PROGRESS,
              this.entities[entityId],
              progress,
              ...nextAction.args
            )
          }

          if (nextAction.isCompleted(nextAction, this.entities[entityId])) {
            entityActions.shift()
          }

          continue
        }

        // If no action running, process first action in the queue
        this._processAction(this.entities[entityId], entityActions[0])
      }
      setTimeout(this.update, this.THICK_TIMER)
    }
    this.update()
    // scene.events.on("update", this.update, this);
    // scene.events.once("shutdown", this.destroy, this);
  }

  processNow(entity, action) {
    // Register entity
    this.entities[entity.id] = entity

    // Clear queue and add actoin
    this.actionsQueue[entity.id] = [this._createAction(action)]
    console.log(this.entities, this.actionsQueue)
  }

  enqueue(entity, action) {
    // Register entity
    this.entities[entity.id] = entity
    // Create empty queue for this entity if needed
    if (!this.actionsQueue[entity.id]) this.actionsQueue[entity.id] = []

    this.actionsQueue[entity.id].push(this._createAction(action))
  }

  _processAction(entity, action) {
    action.status = ActionStatus.RUNNING
    action.startedDate = Date.now()
    this.emitter.emit(action.type, entity, ...action.args)
  }

  _createAction(action) {
    const newAction = { ...action }

    newAction.status = ActionStatus.PENDING
    newAction.isCompleted = newAction.isCompleted
      ? newAction.isCompleted
      : () => true

    return newAction
  }

  destroy() {
    if (this.scene) this.scene.events.off('update', this.update, this)
  }
}
