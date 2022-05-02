// import Player from '../player/player'
import defaultUser from '../../assets/person/defaultPerson.png'
const Engine = {
  // TODO: Move to conf?
  tileWidth: 32,
  tileHeight: 32,
  viewWidth: 32, // tiles; TODO: conf
  viewHeight: 18, // tiles

  markerDepth: 1,
  buildingsDepth: 2,
  playersDepth: 2,
  bubbleDepth: 11,

  UIDepth: 12,
  UIElementsDepth: 13,
  UIContentDepth: 14,
  UITextDepth: 15,

  tooltipDepth: 16,
  tooltipElementsDepth: 17,
  tooltipTextDepth: 18,

  // TODO: Move to conf
  maxPathLength: 36,

  debugMarker: true,
  debugCollisions: false,
  dummyUI: false
}
Engine.preload = function () {
  // this.load.spritesheet('defaultUser', defaultUser, {
  //   frameWidth: 64,
  //   frameHeight: 64
  // })
  console.log(1111)
  this.load.image('sprite', defaultUser)
}
Engine.create = function () {
  // this.load.spritesheet('defaultUser', defaultUser, {
  //   frameWidth: 64,
  //   frameHeight: 64
  // })
  console.log(222)
  this.add.image(1000, 100, 'sprite')
  // this.tweens.add({
  //   targets: Engine.players,
  //   y: 650,
  //   duration: 2000,
  //   ease: 'Power2',
  //   yoyo: true,
  //   loop: -1
  // })
  // Engine.scene.input.on('pointerdown', Engine.handleDown)
  // Engine.scene.input.on('pointerup', Engine.handleClick)
  // Engine.scene.input.on('pointermove', Engine.trackMouse)
}

export default Engine
