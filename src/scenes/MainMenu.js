import Phaser from 'phaser'

export default class SceneMainMenu extends Phaser.Scene {
  constructor () {
    super({ key: 'SceneMainMenu' })
  }

  preload () {
    this.load.image('sprBg0', 'assets/images/sprBg0.png')
    this.load.image('sprBg1', 'assets/images/sprBg1.png')
    this.load.image('sprBtnPlay', 'assets/images/sprBtnPlay.png')
    this.load.image('sprBtnPlayHover', 'assets/images/sprBtnPlayHover.png')
    this.load.image('sprBtnPlayDown', 'assets/images/sprBtnPlayDown.png')
    this.load.image('sprBtnRestart', 'assets/images/sprBtnRestart.png')
    this.load.image('sprBtnRestartHover', 'assets/images/sprBtnRestartHover.png')
    this.load.image('sprBtnRestartDown', 'assets/images/sprBtnRestartDown.png')
  }

  create () {
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnPlay'
    )

    this.btnPlay.setInteractive()

    this.btnPlay.on(
      'pointerover',
      function () {
        this.btnPlay.setTexture('sprBtnPlayHover') // set the button texture to sprBtnPlayHover
      },
      this
    )

    this.btnPlay.on('pointerout', function () {
      this.setTexture('sprBtnPlay')
    })

    this.btnPlay.on(
      'pointerdown',
      function () {
        this.btnPlay.setTexture('sprBtnPlayDown')
      },
      this
    )

    this.btnPlay.on(
      'pointerup',
      function () {
        this.btnPlay.setTexture('sprBtnPlay')
        this.scene.start('GameScene')
      },
      this
    )

    this.title = this.add.text(
      this.game.config.width * 0.5,
      128,
      'SPACE SHOOTER',
      {
        fontFamily: 'VT323',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      }
    )
    this.title.setOrigin(0.5)
  }
}
