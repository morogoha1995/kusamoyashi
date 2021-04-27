import Phaser from 'phaser'
import { WIDTH, HEIGHT } from './constants'
import { Boot } from './scenes/boot'
import { Game } from './scenes/game'
import { End } from './scenes/end'

window.onload = () => {
  new Phaser.Game({
    parent: 'app',
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    },
    backgroundColor: '#fdf6e3',
    scene: [
      Boot,
      Game,
      End
    ]
  })
}
