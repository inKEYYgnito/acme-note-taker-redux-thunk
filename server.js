const path = require('path')
const express = require('express')
const app = express()

app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Serving app on port ${ PORT }`)
})
