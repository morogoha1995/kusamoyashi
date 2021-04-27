import { createTweet } from "../utils"

export class End extends Phaser.Scene {
  private wave = 0

  constructor() {
    super({ key: "end" })
  }

  init() { }

  create() {

  }

  private tweet() {
    const url = 'https://meisoudev.com/games/gamahebi/'
    const text = `第${this.wave}波にて陥落…。`

    const tweetURL = createTweet(text, url, '草燃やし')

    window.open(tweetURL, "blank")
  }
}
