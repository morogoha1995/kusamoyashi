import { OVERALL_HEIGHT, SCORE_HEIGHT, WIDTH } from "../constants"
import { Fire } from "../objects/fire"
import { Grass } from "../objects/grass"

export class Game extends Phaser.Scene {
  private grasses!: Phaser.Physics.Arcade.Group
  private fire!: Fire

  private isClick = false
  private createInterval = 500
  private addInterval = 2000

  constructor() {
    super({ key: 'game' })
  }

  create() {
    this.add
      .image(0, 0, 'bg')
      .setOrigin(0, 0)
      .setScale(1.5)

    this.grasses = this.physics.add.group()

    this.fire = new Fire(this)

    this.physics.add.collider(this.fire, this.grasses, (_, g: any) => {
      if (!this.isClick)
        return

      g.attacked()
    })
  }

  update(time: number) {
    this.isClick = this.input.activePointer.isDown
    this.fire.update(this.isClick, this.getPointerPos())

    if (this.createInterval <= time)
      this.createGrass()
  }

  private createGrass() {
    const x = Phaser.Math.Between(0, WIDTH),
      y = Phaser.Math.Between(SCORE_HEIGHT, OVERALL_HEIGHT),
      grass = new Grass(this, x, y)

    this.grasses.add(grass, true)
    this.calcInterval()
  }

  private calcInterval() {
    this.createInterval += this.addInterval
    if (this.addInterval > 1000)
      this.addInterval -= 50
  }

  private getPointerPos() {
    return { x: this.input.activePointer.x, y: this.input.activePointer.y }
  }
}
