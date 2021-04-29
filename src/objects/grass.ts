export class Grass extends Phaser.GameObjects.Sprite {
  private isDying = false

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'grass')

    this.setDepth(1)
  }

  update() {}

  private die() {
    if (this.isDying)
      return

    this.isDying = true

    this.scene.tweens.add({
      targets: this,
      duration: 300,
      alpha: 0,
      onComplete: () => {
        this.destroy()
      }
    })
  }
}
