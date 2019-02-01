var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', async (req, res, next) => {
  const browser = req.app.get('browser')
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630 })
  await page.goto('https://www.pressmantech.com')
  const img = await page.screenshot({})
  await page.close()

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  })
  res.end(img)
})

module.exports = router
