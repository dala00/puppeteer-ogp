const puppeteer = require('puppeteer')

module.exports.launchBrowser = async () => {
  const options = {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage'
    ],
    executablePath: '/usr/bin/google-chrome'
  }
  const browser = await puppeteer.launch(options).catch(error => {
    console.error(error)
    return null
  })
  if (!browser) {
    return null
  }

  console.log('Browser started.')
  return browser
}

module.exports.getPage = async (browser, url) => {
  const page = await browser.newPage()
  await page.setViewport({
    width: Number(process.env.IMAGE_WIDTH),
    height: Number(process.env.IMAGE_HEIGHT)
  })
  const response = await page.goto(url)
  if (response.status() != 200) {
    return null
  }
  return page
}
