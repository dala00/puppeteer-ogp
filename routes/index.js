const createError = require('http-errors')
const { launchBrowser, getPage } = require('../lib/browser')

module.exports = async (req, res, next) => {
  const path = req.path.replace(/\.png$/, '')
  if (!isValidPath(path)) {
    next()
    return
  }

  const browser = req.app.get('browser')
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

function isValidPath(path) {
  if (!process.env.URL_FILTER || process.env.URL_FILTER == '') {
    return true
  }
  const validUrls = process.env.URL_FILTER.split(/,/)
  return (
    validUrls.find(validUrl => path.substr(0, validUrl.length) === validUrl) !==
    undefined
  )
}
