export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' })
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0)
  }
}
