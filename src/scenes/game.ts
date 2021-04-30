import { HALF_WIDTH, HEIGHT, OVERALL_HEIGHT, SCORE_HEIGHT, WIDTH } from "../constants"
import { Fire } from "../objects/fire"
import { Grass } from "../objects/grass"
import { createFontStyle } from "../utils"

export class Game extends Phaser.Scene {
  private grasses!: Phaser.Physics.Arcade.Group
  private fire!: Fire

  private createInterval = 500
  private addInterval = 2000
  private grassCount = 0

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

    this.physics.add.collider(this.fire, this.grasses, (f: any, g: any) => {
      if (f.isAttack)
        if (g.attacked())
          this.grassCount--
    })
  }

  update(time: number) {
    if (this.grassCount >= 5)
      this.gameover()

    const isClick = this.input.activePointer.isDown
    this.fire.update(isClick, this.getPointerPos())

    if (this.createInterval <= time)
      this.createGrass()
  }

  private createGrass() {
    const x = Phaser.Math.Between(0, WIDTH),
      y = Phaser.Math.Between(SCORE_HEIGHT, OVERALL_HEIGHT),
      grass = new Grass(this, x, y)

    this.grasses.add(grass, true)
    this.grassCount++
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

  private gameover() {
    this.scene.pause()
    this.scene.launch('end')
  }
}
