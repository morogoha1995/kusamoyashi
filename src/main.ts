import Phaser from "phaser"
import { WIDTH, HEIGHT } from "./constants"

window.onload = () => {
  new Phaser.Game({
    parent: 'app',
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      }
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#4DB6AC",
    scene: [
    ]
  })
}
