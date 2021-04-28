export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' })
  }

  preload() {
    const dir = 'assets/imgs/'

    this.load
      .image('bg', `${dir}bg.jpg`)
      .spritesheet('fire', `${dir}fire-spritesheet.png`, {
        frameWidth: 30, frameHeight: 30, startFrame: 0
      })
  }

  create() {
    this.scene.start('game')
  }
}
