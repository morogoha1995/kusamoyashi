import { HALF_WIDTH } from "../constants"
import { createFontStyle } from "../utils"

export class Fuel extends Phaser.GameObjects.Rectangle {
  private _quantity = 200
  private _isExhaust = false

  private bar: Phaser.GameObjects.Rectangle
  private textTween: Phaser.Tweens.Tween

  constructor(scene: Phaser.Scene) {
    super(scene, HALF_WIDTH, 40, 210, 50, 0xF44336)
    scene.add.existing(this)

    this.bar = scene.add
      .rectangle(60, 40, 200, 40, 0xFFD740)
      .setOrigin(0, 0.5)

    // text and textTween
    const text = scene.add
      .text(HALF_WIDTH, 40, '燃料補給中…', createFontStyle('0x222222'))
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
  }

  get quantity(): number {
    return this._quantity
  }

  private get isRemain(): boolean {
    return this.quantity >= 0
  }

  private get isFull(): boolean {
    return this.quantity >= 200
  }

  get isExhaust(): boolean {
    return this._isExhaust
  }

  update(isAttack: boolean) {
    isAttack ? this.use() : this.charge()
  }

  private toExhaust() {
    this._isExhaust = true
    this.textTween.play(true)
    this.vibeBar()
  }

  private vibeBar() {
    this.scene.tweens.add({
      targets: this,
      y: 30,
      angle: 20,
      duration: 20,
      yoyo: true,
    })
  }

  private hitFull() {
    if (!this.isExhaust)
      return

    this._isExhaust = false
    this.textTween.stop(0)
  }

  private charge() {
    if (this.isFull) {
      this.hitFull()
      return
    }

    this._quantity++
    this.changeBarSize()
  }

  private use() {
    this._quantity -= 2
    this.changeBarSize()

    if (!this.isRemain)
      this.toExhaust()
  }

  private changeBarSize() {
    this.bar.setDisplaySize(this.quantity, 40)
  }
}
