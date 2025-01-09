const fetchFont = async (fontPath) => {
  const headers = new Headers({ Referer: 'https://carbonplan.org/' })
  const res = await fetch(`https://fonts.carbonplan.org/relative/${fontPath}`, {
    cache: 'force-cache',
    headers,
  })

  if (!res.ok) throw new Error(`Failed to load ${fontPath} font: ${res.status}`)
  return res.arrayBuffer()
}

export const getFonts = async (fonts) => {
  try {
    const fontData = await Promise.all(fonts.map(({ path }) => fetchFont(path)))

    return fonts.map(({ name }, index) => ({
      name,
      data: fontData[index],
    }))
  } catch (error) {
    console.error('Error loading fonts:', error)
    throw error
  }
}
