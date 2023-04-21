const db = require('./database/connect')


function generateId(next) {
  const length = 20
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const upper = lower.toUpperCase()
  const nums = '0123456789'
  const chars = [...upper.split(''), ...nums.split('')]

  const result = []

  for (let i = 0; i < length; i++) {
    result.push(chars[Math.floor(Math.random() * chars.length)])
  }

  if (typeof next === 'function') {
    next(result.join(''))
  }

  return
}

function query(qs, next) {
  db.getConnection((err, connection) => {
      if (err) throw err

      connection.query(qs, (err, results) => {
          if (err) throw err

          results = JSON.parse(JSON.stringify(results))

          connection.release()

          if (typeof(next) == 'function') {
            next(err, results)
          }          
      })
  }) 
}

function sendError(res, error) {
  res.json({ error })
}


module.exports = { generateId, query, sendError }