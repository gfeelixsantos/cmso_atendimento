const express = require('express')
const bodyParser = require('body-parser')
const acessoIndesk = require('./services/indesk')
const cadastrarSenha = require('./services/cadastrarSenha')
const app = express()
const port = 3030
let browserIndesk = ''

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/', (req, res) => {
    const dados = req.body
    cadastrarSenha(browserIndesk, dados)
    res.redirect('/')
})



app.listen( port, async() => {

    console.log( `SERVIDOR RODANDO NA PORTA: ${port}`);
    browserIndesk = await acessoIndesk()
    
    
})



