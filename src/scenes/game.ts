export class Game extends Phaser.Scene {
  private fire!: Phaser.GameObjects.Sprite

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

    this.fire = this.add
      .sprite(0, 0, 'fire')
      .play('firing')
      .setScale(2)
  }

  update() {
    const isClick = this.input.mousePointer.isDown
    this.fire.setVisible(isClick)

    this.fireMove()
  }

  private fireMove() {
    if (!this.fire.visible)
      return

    const p = this.getPointerPos()
    this.fire.setPosition(p.x, p.y)
  }

  private getPointerPos() {
    return { x: this.input.activePointer.x, y: this.input.activePointer.y }
  }
}
