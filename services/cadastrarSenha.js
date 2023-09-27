const puppeteer = require('puppeteer');
const buscaDados = require('./buscadados');
const verTipoExame = require('./verTipoExame')

async function cadastrarSenha(endPoint, senha) {

    try {
        // Conectando ao Atendente Indesk
        const browser = await puppeteer.connect({
            browserWSEndpoint: endPoint
        })
        
        // Identificando Indesk
        const targets = browser.targets()
        const targetPage = targets.find( target => target.url() == 'https://cms.indesk.com.br/atendente/#/')
        
        if (targetPage){
            const page = await targetPage.page()
            
            // Inserindo dados
            let entradaDados = await page.waitForSelector('input[aria-label="SIGLA"]')
            await entradaDados.type(senha.idSenha, {delay: 80})
            entradaDados = await page.waitForSelector('input[aria-label="NÚMERO"]')
            await entradaDados.type(senha.numSenha, {delay: 80})

            await page.keyboard.press('Tab')
            await page.keyboard.press('Tab')
            await page.keyboard.press('Enter')
            
            entradaDados = await page.waitForSelector('input[aria-label="Descrição"]')
            entradaDados.click()

            // Requisições 
            let guiaFuncionario = await buscaDados(senha)
            guiaFuncionario = await verTipoExame(guiaFuncionario)
            
            await entradaDados.type(`${guiaFuncionario[0]['rzsocial']} - ${guiaFuncionario[0]['nome']} - ${guiaFuncionario[0]['tipoExame']}` , {delay: 30})



        }
        
        

    } catch (error) {
        console.log(error);
        
    }



}


module.exports = cadastrarSenha