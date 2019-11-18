import Phaser from 'phaser'

export default class SceneGameOver extends Phaser.Scene {
  constructor () {
    super({ key: 'SceneGameOver' })
  }

  create (score) {
    if(typeof score !== 'number'){
      score = 0
    }
    this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5 - 100,
      'THE END\r\n Final score: ' + score,
      {
        fontFamily: 'VT323',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      }
    ).setOrigin(0.5, 0.5)
    
    let pressAnyKey = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5 + 100,
      'Press any key to continue...') 
    pressAnyKey.setOrigin(0.5, 0.5)

    let colorState = false
    this.textInterval = setInterval(() => {
      pressAnyKey.setColor(colorState ? 'white' : 'gray')
      colorState = !colorState;
    }, 100)
    
    this.input.keyboard.on('keydown', (eventName, event) => {
      clearInterval(this.textInterval)
      this.scene.start('SceneMainMenu')
    });
  }
}
