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
    this.load.image('xboxPad', 'assets/images/xbox-pad.png')
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


    this.text = this.add.text(10, 30, '', { font: '16px Courier', fill: '#0000ff' });
    
    let bg = this.add.graphics();
    
    bg.fillStyle(0xcccccc, 1);
    bg.fillRect(0, this.game.config.height - 250, this.game.config.width, 250);
    this.graphics = this.add.graphics();

    this.graphicsdpl = this.add.graphics(); // dpad left
    this.graphicsdpl.fillStyle(0x0000ff, 1);
    this.graphicsdpl.fillCircle(165, 480, 12);

    this.graphicsdpr = this.add.graphics(); // dpad right
    this.graphicsdpr.fillStyle(0x0000ff, 1);
    this.graphicsdpr.fillCircle(280, 526, 12);


    this.imgXboxPad = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height - 120,
      'xboxPad'
    );
    this.imgXboxPad.alpha = 0.5;
  }
  
  update (){

    if (this.input.gamepad.total === 0)
    {
        return;
    }

    var debug = [];
    var pads = this.input.gamepad.gamepads;
    // var pads = this.input.gamepad.getAll();
    // var pads = navigator.getGamepads();

    for (var i = 0; i < pads.length; i++)
    {
        var pad = pads[i];

        if (!pad)
        {
            continue;
        }

        //  Timestamp, index. ID
        debug.push(pad.id);
        debug.push('Index: ' + pad.index + ' Timestamp: ' + pad.timestamp);

        //  Buttons

        var buttons = '';

        this.graphics.clear();
            
        for (var b = 0; b < pad.buttons.length; b++)
        {
            var button = pad.buttons[b];

            buttons = buttons.concat('B' + button.index + ': ' + button.value + '  ');
            // buttons = buttons.concat('B' + b + ': ' + button.value + '  ');

            if (b === 8)
            {
                debug.push(buttons);
                buttons = '';
            }
            this.redDotForButton(button, 0, 315, 500); // A
            this.redDotForButton(button, 1, 335, 480); // B
            this.redDotForButton(button, 2, 295, 480); // X
            this.redDotForButton(button, 3, 315, 460); // Y
            
            this.redDotForButton(button, 4, 176, 420); // L1
            this.redDotForButton(button, 5, 308, 420); // R1
            this.redDotForButton(button, 6, 146, 428); // L2
            this.redDotForButton(button, 7, 338, 428); // R2
            
            this.redDotForButton(button, 8, 220, 480); // select
            this.redDotForButton(button, 9, 260, 480); // start
            
            this.redDotForButton(button, 10, 165, 480); // SL
            this.redDotForButton(button, 11, 280, 526); // SR
            
            let dpp = {x: 182, y: 509};
            this.redDotForButton(button, 12, dpp.x + 20, dpp.y); // U
            this.redDotForButton(button, 13, dpp.x + 20, dpp.y + 40); // D
            this.redDotForButton(button, 14, dpp.x, dpp.y + 20); // L
            this.redDotForButton(button, 15, dpp.x + 40, dpp.y + 20); // R
        }
        
        debug.push(buttons);

        //  Axis

        var axes = '';

        let avalues = [];
        for (var a = 0; a < pad.axes.length; a++)
        {
            var axis = pad.axes[a];

            axes = axes.concat('A' + axis.index + ': ' + axis.getValue() + '  ');
            // axes = axes.concat('A' + a + ': ' + axis + '  ');

            if (a === 1)
            {
                debug.push(axes);
                axes = '';
            }

            avalues.push(axis.getValue() * 20);

            if(avalues.length === 2){
              if(a < 2) {
                this.blueDotForPad(avalues); // SL
                avalues = [];
              } else {
                this.blueDotForPad(avalues, true); // SL
                avalues = [];
              }
            }
        }
        
        debug.push(axes);
        debug.push('');
    }
    
    // this.text.setText(debug);
  }
  
  redDotForButton(button, i, x,y){
    if (button.index === i && button.value) {
      this.graphics.fillStyle(0xff0000, 1);
      let radius = button.index === 10 || button.index === 11 ? 28 : 12;
      this.graphics.fillCircle(x, y, radius);
    }
  }
  blueDotForPad(values, right){
    (right ? this.graphicsdpr : this.graphicsdpl)
      .setPosition(values[0], values[1]);
  }
}
