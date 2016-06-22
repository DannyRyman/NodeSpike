const oAuth = require('oauth')
const key = '4833'
const secret = '5d6351cd2ccf7f5a156c268cce60e85f'
var Future = require('ramda-fantasy').Future
const R = require('ramda')
const doQuery = require('../doQuery')

let oauth2 = new oAuth.OAuth2(key, secret, 'https://www.deviantart.com/', null, 'oauth2/token', null)

const getAuthToken = () => Future((reject, resolve) => {
  oauth2.getOAuthAccessToken('',
  {'grant_type': 'client_credentials'},
  function (e, accessToken) {
    if (e) {
      return reject('unable to acquire the access token')
    } else {
      return resolve('bearer ' + accessToken)
    }
  })
})

const setBearerTokenOnRequestOptions = (requestOptions) => R.partial(R.assocPath, [['headers', 'Authorization'], R.__, requestOptions])()

const doDeviantQuery = (options) => R.pipe(
  getAuthToken,
  R.lift(setBearerTokenOnRequestOptions(options)),
  R.chain(doQuery)
)()

module.exports = doDeviantQuery

