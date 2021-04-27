export class Fire extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'fire')

    this.setVisible(false)
  }
}
