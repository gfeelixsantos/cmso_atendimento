const path = require('path')
const express = require('express')
const app = express()
const port = 3030



app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/cadastrar', (req, res) => {
    res.send('OK')
})







app.listen( port, () => {
    console.log( `SERVIDOR RODANDO NA PORTA: ${port}`);
})

