export class Grass extends Phaser.GameObjects.Sprite {
  private hp = 30

  private isHitting = false
  private isDying = false

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'grass')

    this
      .setScale(0.8)
      .setDepth(1)
  }

  attacked(): boolean {
    if (this.isDying)
      return false

    this.hp--

    const isDie = this.hp === 0

    if (isDie)
      this.die()
    else
      this.hit()

    return isDie
  }

  private hit() {
    if (this.isHitting)
      return

    this.isHitting = true

    this.scene.add.tween({
      targets: this,
      duration: 40,
      alpha: 0.6,
      scale: 0.6,
      yoyo: true,
      onComplete: () => this.isHitting = false
    })
  }

  private die() {
    this.isDying = true

    this.scene.add.tween({
      targets: this,
      duration: 300,
      scale: 0.6,
      y: this.y + 20,
      angle: 50,
      alpha: 0,
      onComplete: () => this.destroy()
    })
  }
}
