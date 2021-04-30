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
    const bg = this.add.rectangle(0, 0, WIDTH, OVERALL_HEIGHT, 0x222222)
      .setAlpha(0)
      .setOrigin(0)

    this.add.tween({
      targets: bg,
      duration: 300,
      alpha: 0.4,
      onComplete: () => this.showText()
    })
  }

  private showText() {
    const style = createFontStyle('crimson', 2),
      t = this.add
        .text(HALF_WIDTH, 0, 'GAME OVER', style)
        .setOrigin(0.5),
      textHeight = 120,
      btnHeight = textHeight + 80

    this.add.tween({
      targets: t,
      y: textHeight,
      duration: 1000,
      ease: 'Bounce',
      onComplete: () => this.showBtns(btnHeight)
    })
  }

  private showBtns(height: number) {
    // TODO
  }

  private tweet() {
    const url = 'https://meisoudev.com/games/gamahebi/'
    const text = `第${this.wave}波にて陥落…。`

    const tweetURL = createTweet(text, url, '草燃やし')

    window.open(tweetURL, 'blank')
  }
}
