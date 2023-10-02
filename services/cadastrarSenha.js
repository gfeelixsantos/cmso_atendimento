const puppeteer = require('puppeteer');
const buscaDados = require('./buscadadoSOC');
const verTipoExame = require('./verTipoExame');

async function cadastrarSenha(endPoint, senha) {

    try {
        // Conectando ao Atendente Indesk
        const browser = await puppeteer.connect({
            browserWSEndpoint: endPoint,
            
        })
        
        
        // Identificando Indesk
        const targets = browser.targets()
        const targetPage = targets.find( target => target.url() == 'https://cms.indesk.com.br/atendente/#/')
        
        if (targetPage){
            const page = await targetPage.page()
            page.setDefaultTimeout(0)


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
            senha.nomeEmpresa = guiaFuncionario[0].rzsocial
            senha.funcionario = guiaFuncionario[0].nome
            senha.setor = guiaFuncionario[0].setor
            senha.cargo = guiaFuncionario[0].cargo
            senha.tipoExame = guiaFuncionario[0].tipoExame
            senha.qtdExames = guiaFuncionario.length

            await entradaDados.type(`${senha.funcionario} - ${senha.tipoExame} (${senha.qtdExames} EXAMES) - ${senha.nomeEmpresa}`)

            // Verifica atendimento preferencial
            if (senha.atendimento == 'preferencial'){
                entradaDados = await page.waitForSelector('div[aria-label="Preferencial"]')
                entradaDados.click()
            }

            // Filtra/Seleciona exames
            guiaFuncionario.push( guiaFuncionario.codigoEexameS5 = 'finalizacao')
            console.log(guiaFuncionario);
            await guiaFuncionario.forEach(async(element) => {
                
                // Acuidade Visual
                if (element.codigoEexameS5 == '50.01.001-8' || element.codigoEexameS5 == '20221407' || element.codigoEexameS5 == '02002' || element.codigoEexameS5 == '4447'  || element.codigoEexameS5 == '1100001'){
                    await page.evaluate( () => {
                        let acuidadeVisual = document.querySelectorAll('input')
                        acuidadeVisual[6].click()
                    })
                }

                // Audiometria
                if (element.codigoEexameS5 == '51.01.004-6' || element.codigoEexameS5 == '50c'){
                    await page.evaluate( () => {
                        let audiometria = document.querySelectorAll('input')
                        audiometria[7].click()
                    })
                }

                // Dinamomtria
                if (element.codigoEexameS5 == '20' || element.codigoEexameS5 == '58877'){
                    await page.evaluate( () => {
                        let dinamometria = document.querySelectorAll('input')
                        dinamometria[8].click()
                    })
                }

                // Avaliacao Psicologica
                if (element.codigoEexameS5 == '00123' || element.codigoEexameS5 == '225588' || element.codigoEexameS5 == '111114'){
                    await page.evaluate( () => {
                        let avPsicologica = document.querySelectorAll('input')
                        avPsicologica[9].click()
                    })
                }

                // Clinico
                if (element.codigoEexameS5 == 'clinico' || element.codigoEexameS5 == '11' || element.codigoEexameS5 == '003003' || element.codigoEexameS5 == '01122000'){
                    await page.evaluate( () => {
                        let clinico = document.querySelectorAll('input')
                        clinico[10].click()
                    })
                }

                // ECG
                if (element.codigoEexameS5 == '20.01.001-0'){
                    await page.evaluate( () => {
                        let ecg = document.querySelectorAll('input')
                        ecg[11].click()
                    })
                }

                // EEG
                if (element.codigoEexameS5 == '22010017'){
                    await page.evaluate( () => {
                        let eeg = document.querySelectorAll('input')
                        eeg[12].click()
                    })
                }

                // Espirometria
                if (element.codigoEexameS5 == '19.01.029-0'){
                    await page.evaluate( () => {
                        let espirometria = document.querySelectorAll('input')
                        espirometria[13].click()
                    })
                }

                // LABORATORIO...

                // Raio-X
                if (element.codigoEexameS5 == '2221111' ||
                    element.codigoEexameS5 == '0..' ||
                    element.codigoEexameS5 == '-0-' ||
                    element.codigoEexameS5 == '254477' ||
                    element.codigoEexameS5 == '1v1v' ||
                    element.codigoEexameS5 == '111' ||
                    element.codigoEexameS5 == '0.' ||
                    element.codigoEexameS5 == '8999' ||
                    element.codigoEexameS5 == '14111' ||
                    element.codigoEexameS5 == '32050070' ||
                    element.codigoEexameS5 == '8998' ||
                    element.codigoEexameS5 == '12200' 
                    ){
                    await page.evaluate( () => {
                        let raioX = document.querySelectorAll('input')
                        raioX[15].click()
                    })
                }

                // ENFERMAGEM...

                // Finalização
                await page.evaluate( () => {
                        let finalizacao = document.querySelectorAll('input')
                        finalizacao[17].click()
                    })
                



            });

            // Encaminha atendimento
            await page.evaluate( () => {
                let encaminhar = document.querySelectorAll('button')
                encaminhar[5].focus()
                console.log('cliquei');
            })

        }
        
        

    } catch (error) {
        console.log(error, 'ERRO NO CADASTRO DE SENHA');
        
    }

}


module.exports = cadastrarSenha