import { Fuel } from "./fuel"

export class Fire extends Phaser.Physics.Arcade.Sprite {
  isAttack = false

  private fuel: Fuel

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'fire')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.enable = true

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

    this.isAttack = isAttack

    this.setVisible(isAttack)

    this.fuel.update(isAttack)

    if (isAttack)
      this.setPosition(pos.x, pos.y)
  }
}
