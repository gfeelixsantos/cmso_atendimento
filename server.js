const express = require('express')
const bodyParser = require('body-parser')
const acessoIndesk = require('./services/acessoIndesk')
const cadastrarSenha = require('./services/cadastrarSenha')
const acessoSOC = require('./services/acessoSOC')
const registrarAgenda = require('./services/registrarAgenda')
const app = express()
const port = 3030
let browserIndesk = ''
let browserSOC = '' 

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
    res.sendFile(path.join(__dirname, 'script.html'))
})

app.post('/', (req, res) => {
    const dados = req.body
    console.log(dados);
    cadastrarSenha(browserIndesk, dados)
    res.redirect('/')
})



app.listen( port, async() => {

    browserIndesk = await acessoIndesk()

    // browserSOC = await acessoSOC()
    // console.log('SOC DISPONÍVEL');
    // registrarAgenda(browserSOC)
    
    console.log( `SERVIDOR RODANDO NA PORTA: ${port}`);
    
})



