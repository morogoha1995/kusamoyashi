export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' })
  }

  preload() {
    const dir = 'assets/imgs/'
    const td = `${dir}text/`

    this.load
      .image('bg', `${dir}bg.jpg`)
      .image('grass', `${dir}grass.png`)
      .image('title', `${td}title.png`)
      .image('start', `${td}start.png`)
      .image('gameover', `${td}gameover.png`)
      .image('restart', `${td}restartBtn.png`)
      .image('tweet', `${td}tweetBtn.png`)
      .spritesheet('fire', `${dir}fire-spritesheet.png`, {
        frameWidth: 30, frameHeight: 30, startFrame: 0
      })
  }

  create() {
    this.scene.start('game')
  }
}
