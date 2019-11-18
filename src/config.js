import Phaser from 'phaser'

export default {
  type: Phaser.WEBGL,
  parent: 'content',
  backgroundColor: 'black',
  width: 480,
  height: 640,
  input: {
      gamepad: true
  },
  localStorageName: 'phaseres6webpack'
}
