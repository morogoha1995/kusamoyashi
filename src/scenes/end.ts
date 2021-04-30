import { HALF_WIDTH, HEIGHT, OVERALL_HEIGHT, WIDTH } from '../constants'
import { createFontStyle, createTweet } from '../utils'

export class End extends Phaser.Scene {
  private wave = 0

  constructor() {
    super({ key: 'end' })
  }

  init() { }

  create() {
    this.showBg()
  }

  private showBg() {
    const bg = this.add.rectangle(0, 0, WIDTH, OVERALL_HEIGHT, 0xFFFFFF)
      .setAlpha(0)
      .setOrigin(0)

    this.add.tween({
      targets: bg,
      duration: 300,
      alpha: 0.2,
      onComplete: () => this.showGameover()
    })
  }

  private showGameover() {
    const t = this.add.image(HALF_WIDTH, 0, 'gameover'),
      textY = 120,
      btnY = textY + 80

    this.add.tween({
      targets: t,
      y: textY,
      duration: 1000,
      ease: 'Bounce',
      onComplete: () => this.showBtns(btnY)
    })
  }

  private showBtns(y: number) {
    // TODO
  }

  private tweet() {
    const url = 'https://meisoudev.com/games/gamahebi/'
    const text = `第${this.wave}波にて陥落…。`

    const tweetURL = createTweet(text, url, '草燃やし')

    window.open(tweetURL, 'blank')
  }
}
