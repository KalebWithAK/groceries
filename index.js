const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, './client/build')))

app.get('/api/', (req, res) => {
  res.json({ message: 'hello world' })
})

const item_router = require('./routes/item')
const user_router = require('./routes/user')

app.use('/api/item/', item_router)
app.use('/api/user/', user_router)

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: '../web/build' })
})

app.listen(3001, () => {
  console.log('http://localhost:3001/api/')
})