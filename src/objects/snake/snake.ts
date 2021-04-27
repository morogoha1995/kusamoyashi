import SnakeDatas from "../../datas/snake.json"
import { SnakeName } from "../../../types/snake"
import { TILE_SIZE, SIDE_BAR_WIDTH, HALF_TILE_SIZE, HEIGHT } from "../../constants"
import { Organism } from "../organism"

export class Snake extends Organism {
  private readonly speed: number
  private readonly earn: number
  private _isAttack = false
  private isSlow = false
  private _isTouchBottom = false
  private slowImg: Phaser.GameObjects.Image
  private moveTween: Phaser.Tweens.Tween

  constructor(scene: Phaser.Scene, col: number, name: SnakeName, hpMultiple: number) {
    super(scene, TILE_SIZE * col + SIDE_BAR_WIDTH + HALF_TILE_SIZE, 0, name, col)

    const sd = SnakeDatas[name]
    this._hp = Math.floor(sd.hp * hpMultiple)
    this.speed = sd.speed
    this.earn = sd.earn
    this.slowImg = scene.add.image(this.x, this.y, "ice")
      .setScale(0.8)
      .setVisible(false)

    this.moveTween = scene.add.tween({
      targets: this,
      duration: 500,
      scaleX: 1.1,
      scaleY: 0.75,
      yoyo: true,
      repeat: -1,
      repeatDelay: 100,
    })

    this.body.position.set(this.x, 0)
    this.setVelocityY(this.speed)
  }

  get isAttack(): boolean {
    return this._isAttack
  }

  get isTouchBottom(): boolean {
    return this._isTouchBottom
  }

  update() {
    this.changeVy()
    this.checkTouchBottom()

    if (this.isSlow && this.slowImg.visible)
      this.slowImg.setY(this.y)
  }

  private changeVy() {
    let newVy = this.speed

    if (this.isAttack)
      newVy = 0
    else if (this.isSlow)
      newVy = this.speed / 3

    this.setVelocityY(newVy)
  }

  private checkTouchBottom() {
    this._isTouchBottom = this.y >= HEIGHT && !this._isAttack
  }

  attack() {
    if (this._isAttack)
      return

    this._isAttack = true
    this.moveTween.pause()
    this.setScale(1)
    this.attackTween()
    this.scene.time.delayedCall(1000, () => {
      this._isAttack = false
      this.moveTween.resume()
    })
  }

  private attackTween() {
    this.scene.add.tween({
      targets: this,
      duration: 200,
      y: this.y + 20,
      ease: "Power3",
      yoyo: true
    })
  }

  damaged(atk: number, name: string) {
    super.damaged(atk, name)

    this.scene.sound.play("attack")

    if (name === "frozen")
      this.toSlow()

    if (this.isDead && this.slowImg.visible)
      this.slowImg.setVisible(false)
  }

  private toSlow() {
    if (this.isSlow || this.isDead)
      return

    this.isSlow = true
    this.slowImg.setVisible(true)
    this.scene.time.delayedCall(3000, () => this.recoverFromSlow())
  }

  private recoverFromSlow() {
    if (this.isDead)
      return

    this.isSlow = false
    this.slowImg.setVisible(false)
  }

  getGold(): number {
    this.scene.sound.play("earn")
    this.earnTween()
    return this.earn
  }

  private earnTween() {
    this.changeGoldTween(`+${this.earn}G`, "orange")
  }
}
