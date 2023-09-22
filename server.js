const express = require('express')
const bodyParser = require('body-parser')
const acessoIndesk = require('./services/indesk')
const app = express()
const port = 3030


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/', (req, res) => {
    const dados = req.body
    acessoIndesk(dados)
    res.redirect('/')
})



app.listen( port, () => {
    console.log( `SERVIDOR RODANDO NA PORTA: ${port}`);
})

