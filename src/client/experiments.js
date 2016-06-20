const oAuth = require('oauth')
const key = '4833'
const secret = '5d6351cd2ccf7f5a156c268cce60e85f'
const request = require('request')

function ResponseError (res) {
  this.name = 'ResponseError'
  this.message = 'An error occurred during an api request'
  this.stack = (new Error()).stack
  this.response = res
}

ResponseError.prototype = Object.create(Error.prototype)
ResponseError.prototype.constructor = ResponseError

function getAuthToken (callback) {
  let oauth2 = new oAuth.OAuth2(key, secret, 'https://www.deviantart.com/', null, 'oauth2/token', null)
  oauth2.getOAuthAccessToken('',
    {'grant_type': 'client_credentials'},
    function (e, accessToken) {
      callback(e, accessToken)
    })
}

function getArt (searchTerm, callback) {
  function requestArt (e, bearerToken) {
    console.log('todo use the bearer token to make call: ', bearerToken)
    request({
      'url': 'https://www.deviantart.com/api/v1/oauth2/browse/tags?tag=frog&access_token=${bearerToken}',
      'headers': {
        'User-Agent': 'test art client',
        'Authorization': 'bearer ' + bearerToken
      }
    }, function (e, res) {
      if (!e && res.statusCode >= 400) {
        e = new ResponseError(res)
      }
      const data = e ? null : JSON.parse(res.body)
      callback(e, data)
    })
  }
  getAuthToken(requestArt)
}

getArt('frog', function (e, data) {
  if (e) {
    console.log('an error occurred: ', e)
  } else {
    console.log(data)
  }
})
