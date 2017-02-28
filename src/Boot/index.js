import  Phaser, { State } from 'phaser'

class LoadingScreen extends State {
  constructor() {
    super()

    this.goRight = false
  }

  preload() {
    this.game.load.image('robert', './assets/pics/phaser-logo-small.png');
  }

  create() {

    this.game.scale.parentIsWindow = true;
    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT
    //this.game.scale.pageAlignHorizontally = true;
    //this.game.scale.pageAlignVertically = true;
    //this.game.stage.disableVisibilityChange = true;

    this.testImg = this.game.add.sprite(this.world.centerX, this.world.centerY, 'robert')

    this.testImg.anchor.setTo(0.5, 0.5)


    this.game.physics.enable(this.testImg, Phaser.Physics.ARCADE);

    this.testImg.body.velocity.x=25;

  }



  update() {

    if (this.testImg.body.x < 100) {
      this.goRight = true
    } else if (this.testImg.body.x > 500) {
      this.goRight = false
    }

    if (this.goRight) {
        this.testImg.body.velocity.x=25;
    } else {
      this.testImg.body.velocity.x=-25;
    }

  }
}

export default LoadingScreen
