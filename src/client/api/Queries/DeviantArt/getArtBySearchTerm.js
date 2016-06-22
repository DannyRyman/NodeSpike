const doDeviantQuery = require('./doDeviantQuery')

const getArtBySearchTerm = (searchTerm) => {
  return doDeviantQuery({
    'url': 'https://www.deviantart.com/api/v1/oauth2/browse/tags?tag=' + searchTerm,
    'headers': {
      'User-Agent': 'test art client'
    }
  })
}

module.exports = getArtBySearchTerm
