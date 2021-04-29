import { Fuel } from "./fuel"

export class Fire extends Phaser.GameObjects.Sprite {
  private fuel: Fuel

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'fire')
    scene.add.existing(this)

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
      .setDepth(2)
  }

  update(isClick: boolean, pos: { x: number, y: number }) {
    const isAttack = isClick && this.fuel.canFire

    this.setVisible(isAttack)

    this.fuel.update(isAttack)

    if (isAttack)
      this.setPosition(pos.x, pos.y)
  }
}
