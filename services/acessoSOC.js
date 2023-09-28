const puppeteer = require('puppeteer')
const acesso = require('./credencialSOC');



async function acessoSOC() {
  
  // Iniciando Puppeteer
  const browser = await puppeteer.launch({ headless:false, args: ['--disable-notifications', '--single-process', '--disable-dev-shm-usage'] })
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  await page.goto('https://sistema.soc.com.br/')
  // await page.setCacheEnabled(false)            // HABILITACAO OU NAO DO CACHE
 
  await page.evaluate(() => {
    window.location.hash = '';
    });
    
    
  try {
    const login = await page.waitForSelector('#usu')
    await login.click()
    await login.type(`${acesso.login}`, {delay: 50})
  
     // Inserindo senha
    const senha = await page.waitForSelector('#senha')
    await senha.click()
    await senha.type(`${acesso.senha}`, {delay: 50})
  
    // Inserindo ID
    let entrar = await page.waitForSelector(`[type=button][value="${acesso.id[0]}"]`, {delay:150})
    await entrar.focus()
    await entrar.click()
      
    entrar = await page.waitForSelector(`[type=button][value="${acesso.id[1]}"]`, {delay:150})
    await entrar.focus()
    await entrar.click()
  
    entrar = await page.waitForSelector(`[type=button][value="${acesso.id[2]}"]`, {delay:150})
    await entrar.focus()
    await entrar.click()
  
    entrar = await page.waitForSelector(`[type=button][value="${acesso.id[3]}"]`, {delay:150})
    await entrar.focus()
    await entrar.click()
  
    entrar = await page.waitForSelector('#bt_entrar', {timeout: 1000})
    await entrar.focus()
    await entrar.click()
  
    await page.waitForNavigation()
    
  } catch (error) {
    console.log('ERRO NA AUTENTICACAO SOC');
  }

  entrar = await page.waitForSelector('input')
  await entrar.focus()
  await entrar.click()
  

  //BUSCANDO EMPRESA
  await page.keyboard.type('236', {delay: 80})
  await page.keyboard.press('Enter')


  return await browser.wsEndpoint()

} 


module.exports = acessoSOC
