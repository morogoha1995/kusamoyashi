import { OVERALL_HEIGHT, SCORE_HEIGHT, WIDTH } from "../constants"
import { Fire } from "../objects/fire"
import { Grass } from "../objects/grass"

export class Game extends Phaser.Scene {
  private grasses!: Phaser.Physics.Arcade.Group
  private fire!: Fire

  private eventDelay!: number
  private grassCount!: number

  constructor() {
    super({ key: 'game' })
  }

  init() {
    this.initProperties()
  }

  private initProperties() {
    this.eventDelay = 2000
    this.grassCount = 0
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

    this.setTimerEvent()
  }

  update() {
    if (this.grassCount >= 5)
      this.gameover()

    const isClick = this.input.activePointer.isDown
    this.fire.update(isClick, this.getPointerPos())
  }

  private createGrass() {
    const x = Phaser.Math.Between(0, WIDTH),
      y = Phaser.Math.Between(SCORE_HEIGHT, OVERALL_HEIGHT),
      grass = new Grass(this, x, y)

    this.grasses.add(grass, true)
    this.grassCount++
    this.setNextTimerEvent()
  }

  private setNextTimerEvent() {
    const d = this.eventDelay
    this.eventDelay = d > 1000 ? d - 50 : d
    this.setTimerEvent()
  }

  private setTimerEvent() {
    this.time.addEvent({
      delay: this.eventDelay,
      callback: () => this.createGrass()
    })
  }

  private getPointerPos() {
    return { x: this.input.activePointer.x, y: this.input.activePointer.y }
  }

  private gameover() {
    this.scene.pause()
    this.scene.launch('end')
  }
}
