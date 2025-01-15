import React from 'react'
import { getFonts } from './utils/get-og-fonts'
import { SharedCard, FONTS } from './shared-card'

export const getCommentaryCard = async (props) => {
  const fonts = await getFonts(FONTS)
  return {
    component: <SharedCard {...props} type='commentary' />,
    fonts,
    options: {
      width: 1200,
      height: 630,
      debug: false,
    },
  }
}
