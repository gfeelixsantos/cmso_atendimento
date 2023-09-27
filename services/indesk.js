const puppeteer = require('puppeteer');
const cadastrarSenha = require('./cadastrarSenha');


async function acessoIndesk(senha) {

  // Iniciando Puppeteer
  const browser = await puppeteer.launch({ 
    // executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', 
    headless:false
   });

  const page = await browser.newPage()
  await page.goto('https://cms.indesk.com.br/atendente/#/')
  await page.setDefaultTimeout(0)
  
  // Set configurações do localstorage
  await page.evaluate( () => {
    localStorage.setItem(
      'atendente','__q_numb|5'
    )
  })
  
  // Realizando login
  let entradaDados = await page.waitForSelector('input[aria-label="Usuário"]')
  await entradaDados.type('cmsoservice', {delay: 50})
  entradaDados = await page.waitForSelector('input[aria-label="Senha"]')
  await entradaDados.type('cmsoservice', {delay: 50})
  await page.evaluate( (el) => {
    el = document.getElementsByTagName('button')
    el[3].click()
  })


  const browserEndPoint = await browser.wsEndpoint()

  console.log('INDESK DISPONÍVEL');
  return browserEndPoint


  
  
}


module.exports = acessoIndesk