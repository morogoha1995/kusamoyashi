import { HALF_WIDTH } from "../constants"

export class Fuel extends Phaser.GameObjects.Rectangle {
  private _quantity = 100
  private _isExhaust = false

  private bar: Phaser.GameObjects.Rectangle

  constructor(scene: Phaser.Scene) {
    super(scene, HALF_WIDTH, 40, 210, 50, 0xF44336)
    scene.add.existing(this)

    this.bar = scene.add
      .rectangle(60, 40, 200, 40, 0xFFD740)
      .setOrigin(0, 0.5)
  }

  get quantity(): number {
    return this._quantity
  }

  get isRemain(): boolean {
    return this.quantity >= 0
  }

  get isFull(): boolean {
    return this.quantity >= 100
  }

  get isExhaust(): boolean {
    return this._isExhaust
  }

  charge() {
    if (this.isFull) {
      this._isExhaust = false
      return
    }

    this._quantity++
    this.changeBarSize()
  }

  use() {
    this._quantity--
    this.changeBarSize()

    this._isExhaust = !this.isRemain
  }

  private changeBarSize() {
    this.bar.setDisplaySize(this.quantity * 2, 40)
  }
}
