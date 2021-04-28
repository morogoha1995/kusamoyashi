import { FONT_SIZE } from "./constants"

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

