import { Tweens } from "phaser"
import { HALF_WIDTH } from "../constants"
import { createFontStyle } from "../utils"

export class Fuel {
  private quantity = 200
  private isExhaust = false

  private bar: Phaser.GameObjects.Rectangle
  private boxTween: Phaser.Tweens.Tween
  private textTween: Phaser.Tweens.Tween

  constructor(scene: Phaser.Scene) {
    // box
    const box = scene.add.rectangle(0,0, 210, 50, 0xF44336)  

    this.boxTween = scene.tweens.add({
      targets: box,
      angle: 40,
      duration: 40,
      yoyo: true,
      paused: true,
      onComplete: () => this.boxTween.stop(0)
    })

    // bar
    this.bar = scene.add
      .rectangle(-100, 0, 200, 40, 0xFFD740)
      .setOrigin(0, 0.5)

    // text and textTween
    const text = scene.add
      .text(0, 0, '燃料補給中…', createFontStyle('0x222222'))
      .setAlpha(0)
     .setOrigin(0.5)

    this.textTween = scene.tweens.add({
      targets: text,
      alpha: 1,
      duration: 200,
      yoyo: true,
      repeat: -1,
      delay: 200,
      paused: true,
    })

    scene.add
    .container(HALF_WIDTH, 40, [box, this.bar, text])
    .setDepth(3)
  }

  private get isRemain(): boolean {
    return this.quantity >= 0
  }

  private get isMax(): boolean {
    return this.quantity >= 200
  }

  update(isAttack: boolean) {
    isAttack ? this.use() : this.charge()
  }

  get canFire(): boolean {
    return !this.isExhaust && this.isRemain
  }

  private toExhaust() {
    this.isExhaust = true
    this.textTween.play(true)
    this.boxTween.play(true)
  }

  private hitFull() {
    if (!this.isExhaust)
      return

    this.isExhaust = false
    this.textTween.stop(0)
  }

  private charge() {
    if (this.isMax) {
      this.hitFull()
      return
    }

    this.quantity++
    this.changeBarSize()
  }

  private use() {
    this.quantity -= 2
    this.changeBarSize()

    if (!this.isRemain)
      this.toExhaust()
  }

  private changeBarSize() {
    this.bar.setDisplaySize(this.quantity, 40)
  }
}
