import React from 'react'
import { getFonts } from './utils/get-og-fonts'
import { SharedCard, FONTS } from './shared-card'

export const getBlogPostCard = async (props) => {
  const fonts = await getFonts(FONTS)
  return {
    component: <SharedCard {...props} type='blog' />,
    fonts,
    options: {
      width: 1200,
      height: 630,
      debug: false,
    },
  }
}
