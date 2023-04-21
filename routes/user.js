const express = require('express')
const router = express.Router()

const { createUser } = require('../handlers/user')


router.get('/', (req, res) => {
  createUser()
  res.send('user router')
})

module.exports = router