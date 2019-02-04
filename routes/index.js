const createError = require('http-errors')
const { launchBrowser, getPage } = require('../lib/browser')

module.exports = async (req, res, next) => {
  const browser = req.app.get('browser')
  const path = req.path.replace(/\.png$/, '')
  const url = process.env.BASE_URL + path
  let page = null

  try {
    page = await getPage(browser, url)
  } catch (err) {
    console.error(err)
    await browser.close()
    const newBrowser = await launchBrowser()
    req.app.set('browser', newBrowser)
    next(createError(500))
    return
  }

  if (!page) {
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
