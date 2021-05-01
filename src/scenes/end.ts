import { BTN_Y, HALF_WIDTH, OVERALL_HEIGHT, TITLE_Y, WIDTH } from '../constants'
import { createTweet } from '../utils'

export class End extends Phaser.Scene {
  private wave = 0

  constructor() {
    super({ key: 'end' })
  }

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
    const t = this.add.image(HALF_WIDTH, BTN_Y, 'gameover')

    t.setScale(0.2)

    this.add.tween({
      targets: t,
      y: TITLE_Y,
      scale: 1,
      duration: 1000,
      ease: 'Bounce',
      onComplete: () => this.showBtns()
    })
  }

  private showBtns() {
    const restartBtn = this.add.image(0, BTN_Y, 'restart'),
      tweetBtn = this.add.image(WIDTH, BTN_Y, 'tweet'),
      leftX = HALF_WIDTH / 2,
      rightX = HALF_WIDTH + leftX,
      duration = 1000

    this.add.tween({
      targets: restartBtn,
      x: leftX,
      duration: duration,
      ease: 'Elastic',
      onComplete: () => {
        restartBtn
          .setInteractive()
          .on('pointerdown', () => this.restart())
      }
    })

    this.add.tween({
      targets: tweetBtn,
      x: rightX,
      duration: duration,
      ease: 'Elastic'
    })
  }

  private restart() {
    console.log('TODO')
  }

  private tweet() {
    const url = 'https://meisoudev.com/games/gamahebi/'
    const text = `第${this.wave}波にて陥落…。`

    const tweetURL = createTweet(text, url, '草燃やし')

    window.open(tweetURL, 'blank')
  }
}
