import Phaser from 'phaser'
let instance

export default class EventDispatcher extends Phaser.Events.EventEmitter {
  constructor() {
    super()
    this.EXCLUDE_FOR_DEBUG = ['action.progress']
  }

  static getInstance() {
    if (!instance) instance = new EventDispatcher()

    return instance
  }

  emit(event, ...args) {
    // Log any event in console
    if (!this.EXCLUDE_FOR_DEBUG.includes(event)) {
      console.groupCollapsed('[Action]', event)
      console.log(...args)
      console.groupEnd()
    }

    return super.emit(event, ...args)
  }
}
