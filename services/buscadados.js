
// Exporta dados utilizado: EXAMES DO FUNCIONARIO POR SEQUENCIAL
function buscaDados(funcionario) {

    cdEmpresa = funcionario.cdEmpresa
    cdFicha = funcionario.cdFicha
  
    const url = `https://ws1.soc.com.br/WebSoc/exportadados?parametro={'empresa':'${cdEmpresa}','codigo':'186143','chave':'fcf8d286d086964fc642','tipoSaida':'json','sequencial':'${cdFicha}'}`

    fetch(url, {method: 'POST'})
        .then( response => response.json())
        .then( data => {
            for (exame of data){
                const exames = exame['EXAME']
                console.log(exames);
            }
        })

}

module.exports = buscaDados