import { Fuel } from "./fuel"

export class Fire extends Phaser.GameObjects.Sprite {
  private fuel: Fuel

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'fire')

    this.fuel = new Fuel(scene)

    this.anims.create({
      key: 'firing',
      frames: 'fire',
      duration: 180,
      repeat: -1
    })

    this.play('firing')
      .setVisible(false)
      .setScale(2)

    scene.add.existing(this)
  }

  update(isClick: boolean, pos: { x: number, y: number }) {
    const isAttack = isClick && this.fuel.isRemain && !this.fuel.isExhaust

    this.setVisible(isAttack)

    if (isAttack) {
      this.attack()
      this.setPosition(pos.x, pos.y)
    } else {
      this.wait()
    }
  }

  private wait() {
    this.fuel.charge()
  }

  private attack() {
    this.fuel.use()
  }
}
