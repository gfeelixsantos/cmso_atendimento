const puppeteer = require('puppeteer');

async function cadastroIndesk(senha) {

// Iniciando Puppeteer
  const browser = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:false });
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
  console.log('ACESSANDO INDESK');
  let entradaDados = await page.waitForSelector('input[aria-label="Usuário"]')
  await entradaDados.type('cmsoservice', {delay: 80})
  entradaDados = await page.waitForSelector('input[aria-label="Senha"]')
  await entradaDados.type('cmsoservice', {delay: 80})
  await page.evaluate( (el) => {
    el = document.getElementsByTagName('button')
    el[3].click()
  })


  // Inserindo senha
  console.log('CADASTRANDO SENHA');
  await setTimeout( async(senha) => {
    entradaDados = await page.waitForSelector('input[aria-label="SIGLA"]')
    await entradaDados.type(senha.idSenha, {delay: 80})
    entradaDados = await page.waitForSelector('input[aria-label="NÚMERO"]')
    await entradaDados.type(senha.numSenha, {delay: 80})
  },7000, senha)
  
  
}

module.exports = cadastroIndesk