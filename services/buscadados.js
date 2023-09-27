const iconv = require('iconv-lite');


function buscaDados(funcionario) {


    cdEmpresa = funcionario.cdEmpresa
    cdFicha = funcionario.cdFicha
  
    // URL de busca Ficha Clínicas
    // const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={'empresa':'${cdEmpresa}','codigo':'186143','chave':'fcf8d286d086964fc642','tipoSaida':'json','sequencial':'${cdFicha}'}`

    const urlBuscaGuia = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={'empresa':'76278','codigo':'186384','chave':'d2752ccec36a79403dcf','tipoSaida':'json','codigoSequencial':${cdFicha},'empresaTrabalho':${cdEmpresa}}`

    return fetch(urlBuscaGuia, {   
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        })
    .then( response => response.json())



    


    
}

module.exports = buscaDados