var express = require('express')
var router = express.Router()

router.get('/', async (req, res, next) => {
  const browser = req.app.get('browser')
  const page = await browser.newPage()
  await page.setViewport({
    width: Number(process.env.IMAGE_WIDTH),
    height: Number(process.env.IMAGE_HEIGHT)
  })
  await page.goto(process.env.BASE_URL)
  const img = await page.screenshot({})
  await page.close()

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  })
  res.end(img)
})

module.exports = router
