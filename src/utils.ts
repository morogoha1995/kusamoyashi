import { FONT_SIZE, OVERALL_HEIGHT } from "./constants"

export const createFontStyle = (color: string, fontSizeRatio = 1, isStroke = true) => {
  const fontStyle: any = {
    color: color,
    fontFamily: "Meiryo",
    fontSize: `${FONT_SIZE * fontSizeRatio}px`,
    fontStyle: "bold"
  }

  if (isStroke) {
    fontStyle.stroke = "white"
    fontStyle.strokeThickness = 6
  }

  return fontStyle
}

export const createTweet = (text: string, url: string, hashtag: string): string => `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtag}`

export const startTween = (scene: Phaser.Scene) => {
  const bg = scene.add
    .image(0, OVERALL_HEIGHT, 'bg')
    .setScale(1.5)
    .setOrigin(0)

  scene.add.tween({
    targets: bg,
    y: 0,
    duration: 1000,
    ease: 'Cubic',
    onComplete: () => scene.scene.start('game')
  })
}