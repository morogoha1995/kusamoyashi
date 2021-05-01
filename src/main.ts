import Phaser from 'phaser'
import { WIDTH, OVERALL_HEIGHT } from './constants'
import { Boot } from './scenes/boot'
import { Game } from './scenes/game'
import { End } from './scenes/end'
import { Start } from './scenes/start'

window.onload = () => {
  new Phaser.Game({
    parent: 'app',
    type: Phaser.AUTO,
    width: WIDTH,
    height: OVERALL_HEIGHT,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    },
    backgroundColor: '#fdf6e3',
    scene: [
      Boot,
      Start,
      Game,
      End
    ]
  })
}
