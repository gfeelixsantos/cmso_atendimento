const puppeteer = require('puppeteer');

async function cadastroIndesk() {

// Iniciando Puppeteer
  const browser = await puppeteer.launch({ headless:false });
  const page = await browser.newPage()
  await page.goto('https://cms.indesk.com.br/atendente/#/')
  await page.waitForNavigation()

  
}

cadastroIndesk()