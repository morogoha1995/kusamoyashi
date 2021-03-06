import { startTween } from '../utils'
import { BTN_Y, HALF_WIDTH, OVERALL_HEIGHT, TITLE_Y, WIDTH } from "../constants"

export class Start extends Phaser.Scene {
  private canStart = false

  constructor() {
    super({ key: 'start' })
  }

  create() {
    const title = this.add.image(HALF_WIDTH, 0, 'title')

    this.add.tween({
      targets: title,
      duration: 2000,
      y: TITLE_Y,
      ease: 'Elastic',
      onComplete: () => this.createStartBtn()
    })
  }

  update() {
    if (this.input.activePointer.isDown && this.canStart)
      this.toGameScene()
  }

  private createStartBtn() {
    const startBtn = this.add.image(HALF_WIDTH, BTN_Y, 'start')

    this.canStart = true

    this.add.tween({
      targets: startBtn,
      duration: 300,
      yoyo: true,
      alpha: 0.4,
      repeat: -1,
    })
  }

  private toGameScene() {
    this.canStart = false

    startTween(this)
  }
}