const express = require('express')
const router = express.Router()

const { createItem, getItems, editItem, deleteItem } = require('../handlers/item')
const { sendError } = require('../lib')

router.post('/all/', (req, res) => {
  const { user_id } = req.body

  if (!user_id) {
    sendError(res, 'no user_id provided')
  }

  getItems(user_id, (items) => {
    if (items) {
      res.json({ items })
      return
    }
  })
})

router.post('/create/', (req, res) => {
  const { user_id, item_name, is_need, price, details, frequency } = req.body

  if (!item_name) {
    sendError(res, 'no item name provided')
    return
  }

  createItem(user_id, item_name, is_need || false, price || 0, details, frequency, (item_id) => {
    if (item_id) {
      res.json({ item_id })
      return
    }
  })
})

router.post('/edit/', (req, res) => {
  const { item_id, item_name, is_need, price, details, frequency } = req.body

  if (!item_id) {
    sendError(res, 'no item_id provided')
    return
  }

  else if (!item_name || !is_need || !price || !frequency) {
    sendError(res, 'missing item information')
    return
  }

  editItem(item_id, item_name, is_need, price, details, frequency, (item_id) => {
    if (item_id) {
      res.json({ item_id })
    }
    return
  })
})

router.post('/delete/', (req, res) => {
  const { item_id, user_id } = req.body

  if (!item_id) {
    sendError(res, 'no item_id provided')
    return
  }

  deleteItem(item_id, user_id, (success) => {
    if (success) {
      res.send('successfully deleted item')
      return
    }
  })
})

/*router.post('/admin/clear_items/:admin_key', (req, res) => {
  const { admin_key } = req.params

  if (admin_key === 'iswearimanadmin') {
    clearItems()
  }
})*/

module.exports = router