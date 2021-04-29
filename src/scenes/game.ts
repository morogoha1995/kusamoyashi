import { HEIGHT, WIDTH } from "../constants"
import { Fire } from "../objects/fire"
import { Grass } from "../objects/grass"

export class Game extends Phaser.Scene {
  private grasses!: Phaser.GameObjects.Group
  private fire!: Fire

  constructor() {
    super({ key: 'game' })
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0, 0)

    this.grasses = this.add.group()

    this.fire = new Fire(this)

    setInterval(() => this.createGrass(), 100)
  }

  update() {
    const isClick = this.input.activePointer.isDown
    this.fire.update(isClick, this.getPointerPos())
  }

  private createGrass() {
    console.log('create Grass!!')

    const x = Phaser.Math.Between(0, WIDTH),
    y = Phaser.Math.Between(0, HEIGHT),
    grass = new Grass(this, x, y)

    this.grasses.add(grass, true)
  }

  private getPointerPos() {
    return { x: this.input.activePointer.x, y: this.input.activePointer.y }
  }
}
