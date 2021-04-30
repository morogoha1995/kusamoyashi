import { HALF_WIDTH } from "../constants"
import { createFontStyle } from "../utils"

export class Fuel extends Phaser.GameObjects.Container {
  private readonly maxquantity = 200
  private quantity = 200
  private fullChargeSpeed = 1500
  private isExhaust = false

  private box: Phaser.GameObjects.Rectangle
  private bar: Phaser.GameObjects.Rectangle
  private text: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene) {
    super(scene)

    const barWidth = 200,
      barHeight = 30,
      boxWidth = barWidth + 10,
      boxHeight = barHeight + 10

    this.box = scene.add.rectangle(0, 0, boxWidth, boxHeight, 0xF44336)

    this.bar = scene.add
      .rectangle(-100, 0, barWidth, barHeight, 0xFFD740)
      .setOrigin(0, 0.5)

    this.text = scene.add
      .text(0, 0, '燃料補給中…', createFontStyle('0x222222'))
      .setAlpha(0)
      .setOrigin(0.5)

    scene.add.existing(this)

    this
      .add([this.box, this.bar, this.text])
      .setPosition(HALF_WIDTH * 1.25, boxHeight * 0.75)
      .setDepth(3)
  }

  private get isRemain(): boolean {
    return this.quantity >= 0
  }

  private get isMax(): boolean {
    return this.quantity >= this.maxquantity
  }

  update(isAttack: boolean) {
    isAttack ? this.use() : this.charge()
  }

  get canFire(): boolean {
    return !this.isExhaust && this.isRemain
  }

  private toExhaust() {
    this.isExhaust = true
    this.tweenBox()
    this.tweenText()
    this.fullChargeSpeed += 500
  }

  private tweenBox() {
    this.scene.tweens.add({
      targets: this,
      angle: 10,
      duration: this.fullChargeSpeed,
      yoyo: true,
      ease: 'Elastic',
    })
  }

  private tweenText() {
    const repeatNum = 5

    this.scene.tweens.add({
      targets: this.text,
      alpha: 1,
      duration: this.fullChargeSpeed / repeatNum,
      yoyo: true,
      repeat: repeatNum,
      onRepeat: () => {
        this.quantity += this.maxquantity / repeatNum
        this.changeBarSize()
      },
      onComplete: () => this.isExhaust = false
    })
  }

  private charge() {
    if (this.isMax || this.isExhaust)
      return

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
    this.bar.setDisplaySize(this.quantity, this.bar.height)
  }
}
