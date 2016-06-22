var Future = require('ramda-fantasy').Future
const request = require('request')

function ResponseError (res) {
  this.name = 'ResponseError'
  this.message = 'An error occurred during an api request'
  this.stack = (new Error()).stack
  this.response = res
}

ResponseError.prototype = Object.create(Error.prototype)
ResponseError.prototype.constructor = ResponseError

const doQuery = (requestOptions) => {
  return Future((reject, resolve) => {
    request(requestOptions, function (e, res) {
      if (!e && res.statusCode >= 400) {
        reject(new ResponseError(res))
      }
      const data = JSON.parse(res.body)
      resolve(data)
    })
  })
}

module.exports = doQuery
