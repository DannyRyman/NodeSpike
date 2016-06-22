const R = require('ramda')
const request = require('request')
var Future = require('ramda-fantasy').Future

const oAuth = require('oauth')
const key = '4833'
const secret = '5d6351cd2ccf7f5a156c268cce60e85f'

let oauth2 = new oAuth.OAuth2(key, secret, 'https://www.deviantart.com/', null, 'oauth2/token', null)

function ResponseError (res) {
  this.name = 'ResponseError'
  this.message = 'An error occurred during an api request'
  this.stack = (new Error()).stack
  this.response = res
}

ResponseError.prototype = Object.create(Error.prototype)
ResponseError.prototype.constructor = ResponseError

const getAuthToken = () => Future((reject, resolve) => {
  oauth2.getOAuthAccessToken('',
  {'grant_type': 'client_credentials'},
  function (e, accessToken) {
    if (e) {
      return reject('unable to acquire the access token')
    } else {
      return resolve(accessToken)
    }
  })
})

const getArtBySearchTerm = R.curry(function (searchTerm, bearerToken) {
  return Future((reject, resolve) => {
    // const searchTerm = 'frog'
    console.log('todo use the bearer token to make call: ', bearerToken)
    console.log('searchTerm: ', searchTerm)
    request({
      'url': 'https://www.deviantart.com/api/v1/oauth2/browse/tags?tag=' + searchTerm + '&access_token=${bearerToken}',
      'headers': {
        'User-Agent': 'test art client',
        'Authorization': 'bearer ' + bearerToken
      }
    }, function (e, res) {
      if (!e && res.statusCode >= 400) {
        return reject(new ResponseError(res))
      }
      const data = JSON.parse(res.body)
      return resolve(data)
    })
  })
})

var query = (searchTerm) => R.pipeK(
  getAuthToken,
  getArtBySearchTerm(searchTerm))(Future.of(null))

var frogQuery = query('frog')

frogQuery.fork(err => console.error(err), data => console.log(data))

/*

working 1
var query = () => getAuthToken().map(function (x) {
  console.log(x)
  return x
})

console.log(query().fork(err => console.error(err), data => console.log(data)))
*/

/*
working 2
var logFunction = function (x) {
  console.log(x)
  return x
}

var query = () => R.map(logFunction, getAuthToken())

query().fork(err => console.error(err), data => console.log(data))
*/

/*
working 3 
var logFunction = function (x) {
  return Future((reject, resolve) => {
    if (x[0] === 7) {
      reject(x)
    } else {
      resolve(x)
    }
  })
}

var query = R.compose(R.compose(R.unnest, R.map(logFunction)), getAuthToken)

query().fork(err => console.error(err), data => console.log(data))
*/

/*
working 4
var logFunction = function (x) {
  return Future((reject, resolve) => {
    if (x[0] === 7) {
      reject(x)
    } else {
      resolve(x)
    }
  })
}

var query = R.compose(R.map(logFunction), getAuthToken)

R.unnest(query()).fork(err => console.error(err), data => console.log(data))
*/

/*
working 5
var logFunction = function (x) {
  return Future((reject, resolve) => {
    if (x[0] === 7) {
      reject(x)
    } else {
      resolve(x)
    }
  })
}

var query = R.pipe(
  getAuthToken,
  R.map(logFunction)
)

R.unnest(query()).fork(err => console.error(err), data => console.log(data))
*/

/*
working 6
var logFunction = function (x) {
  return Future((reject, resolve) => {
    if (x[0] === 7) {
      reject(x)
    } else {
      resolve(x)
    }
  })
}

var query = R.pipe(
  getAuthToken,
  R.chain(logFunction)
)

query().fork(err => console.error(err), data => console.log(data))
*/

/*
working 7
var logFunction = (search) => (x) => {
  return Future((reject, resolve) => {
    console.log('search term ' + search)
    if (x[0] === 7) {
      reject(x)
    } else {
      resolve(x)
    }
  })
}

var query = R.pipe(
  getAuthToken,
  R.chain(logFunction('frog'))
)

query().fork(err => console.error(err), data => console.log(data))
*/

/*
working 8
var logFunction = (search) => (x) => {
  return Future((reject, resolve) => {
    console.log('search term ' + search)
    if (x[0] === 7) {
      reject(x)
    } else {
      resolve(x)
    }
  })
}

var query = (searchTerm) => R.pipe(
  getAuthToken,
  R.chain(logFunction(searchTerm))
)()

var frogQuery = query('frog')

frogQuery.fork(err => console.error(err), data => console.log(data))
*/

/*
var logFunction = (search) => (x) => {
  return Future((reject, resolve) => {
    console.log('search term ' + search)
    if (x[0] === 7) {
      reject(x)
    } else {
      resolve(x)
    }
  })
}

var query = (searchTerm) =>
  R.pipe(
    getAuthToken,
    R.chain(logFunction(searchTerm)))()

var frogQuery = query('frog')

frogQuery.fork(err => console.error(err), data => console.log(data))
*/

// var logFunction = (search) => (x) => {
//   return Future((reject, resolve) => {
//     console.log('search term ' + search)
//     if (x[0] === 7) {
//       reject(x)
//     } else {
//       resolve(x)
//     }
//   })
// }

/*
working 9

var logFunction = (search) => (x) => {
  return Future((reject, resolve) => {
    console.log('search term ' + search)
    if (x[0] === 7) {
      reject(x)
    } else {
      resolve(x)
    }
  })
}

var query = (searchTerm) => R.pipeK(
  getAuthToken,
  logFunction(searchTerm))(Future.of(null))

var frogQuery = query('frog')

frogQuery.fork(err => console.error(err), data => console.log(data))
*/

