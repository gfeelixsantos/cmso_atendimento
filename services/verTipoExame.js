function verTipoExame(funcionario) {
    
    return funcionario.map( el => {
  

        if (el.tipoExame == '1'){
            el.tipoExame = 'ADM'
            return el
        }

        if (el.tipoExame == '2'){
            el['tipoExame'] = 'PER'
            return el
        }

        if (el.tipoExame == '3'){
            el['tipoExame'] = 'RT'
            return el
        }

        if (el.tipoExame == '4'){
            el['tipoExame'] = 'MRO'
            return el
        }

        if (el.tipoExame == '5'){
            el['tipoExame'] = 'DEM'
            return el
        }

        if (el.tipoExame == '6'){
            el['tipoExame'] = 'MOP'
            return el
        }

        
    })
    
}

module.exports = verTipoExame