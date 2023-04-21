const { generateId, query } = require('../lib')
const db = require('../database/connect')

function createItem(user_id, item_name, is_need = false, price = 0, details = '', frequency = 'never', next) {
    generateId(item_id => {
      query(`insert into item (id, name, is_need, price, details, frequency) values ('${item_id}', '${item_name}', ${is_need}, ${Number(price).toFixed(2)}, '${details}', '${frequency}')`, (err, result) => {
      if (result && typeof next === 'function') {
        query(`insert into user_item (user_id, item_id) values ('${user_id}', '${item_id}')`, (err, results) => {
          if (results) {
            next(results, item_id);
          }
        })
      }
    })
  })
}

function getItems(user_id, next) {
  query(`select item.id, name, is_need, price, details, frequency from item, user_item 
    where item.id = user_item.item_id and user_item.user_id = '${user_id}'`, (err, items) => {
      if (typeof next === 'function' && items) {
        next(items)
      }
  })
}

function editItem(item_id, item_name, is_need, price, details, frequency, next) {
  query(`update item set name='${item_name}', is_need=${Boolean(is_need)}, price=${Number(price)}, details='${details}', frequency='${frequency}'
    where item.id='${item_id}'`, (err, results) => {
      if (results && typeof next === 'function' && results) {
        next(item_id)
      }
  })
}

function deleteItem(item_id, user_id, next) {
  query(`delete from user_item where user_id='${user_id}' and item_id='${item_id}'`, (err, results) => {
    if (results) {
      //console.log('results1: ' + results)
      query(`delete from item where id='${item_id}'`, (err, results) => {
        if (typeof next === 'function' && results) {
          next({ success: true });
        }
      })
    }
  })
}

function setRefreshDate(last_date, frequency) {
  switch(frequency) {
    case 'weekly':
      // days += 7 except in last 7 days; month++, days += 7 - days in 
      break
    case '2 weeks':
      break
    case 'monthly':
      break
    default: 
      refresh_date = null
      break
  }
}

module.exports = { createItem, getItems, editItem, deleteItem }