import { Fire } from "../objects/fire"

export class Game extends Phaser.Scene {
  private fire!: Fire
  private grasses!: Phaser.GameObjects.Group

  constructor() {
    super({ key: 'game' })
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0, 0)

    this.anims.create({
      key: 'firing',
      frames: 'fire',
      duration: 180,
      repeat: -1
    })

    this.fire = new Fire(this)

    this.grasses = this.add.group()
  }

  update() {
    const isClick = this.input.activePointer.isDown
    this.fire.update(isClick, this.getPointerPos())
  }

  private getPointerPos() {
    return { x: this.input.activePointer.x, y: this.input.activePointer.y }
  }
}
