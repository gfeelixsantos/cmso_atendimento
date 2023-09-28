const puppeteer = require('puppeteer');


async function registrarAgenda(endPoint, senha) {


    try {
        
        const browser = await puppeteer.connect({
            browserWSEndpoint: endPoint
        })

        const paginas = browser.targets()
        const pagina = paginas.find( el => el.url() == 'https://sistema.soc.com.br/WebSoc/MainAction.do')
        const paginaSOC = await pagina.page()

        // CARREGANDO FRAME
        await paginaSOC.setDefaultNavigationTimeout(0)
        await paginaSOC.waitForSelector('#socframe')
        const iframe = await paginaSOC.$('#socframe')
        const frame = await iframe.contentFrame()
        
        // PROCURA PELO NOME FUNCIONARIO
        await frame.evaluate( () => {
            const nomes = [...document.querySelectorAll('a')]
            console.log(nomes);
            
           
        })
        


    } catch (error) {
        console.log(error, 'ERRO AO REGISTRAR AGENDA');
    }
    
}

module.exports = registrarAgenda