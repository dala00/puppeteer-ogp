module.exports = async (req, res, next) => {
  const browser = req.app.get('browser')
  const page = await browser.newPage()
  await page.setViewport({
    width: Number(process.env.IMAGE_WIDTH),
    height: Number(process.env.IMAGE_HEIGHT)
  })
  const response = await page.goto(process.env.BASE_URL + req.path)
  if (response.status() != 200) {
    next()
    return
  }
  const img = await page.screenshot({})
  await page.close()

  res.writeHead(200, {
    'Cache-Control': 'public, max-age=14400',
    Expires: new Date(Date.now() + 14400000).toUTCString(),
    'Content-Type': 'image/png',
    'Content-Length': img.length
  })
  res.end(img)
}
