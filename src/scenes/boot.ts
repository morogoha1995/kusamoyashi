export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' })
  }

  preload() {
    this.load
      .image('bg', 'assets/imgs/bg.jpg')
  }

  create() {
    this.scene.start('game')
  }
}
