const getArtBySearchTermDA = require('./DeviantArt/getArtBySearchTerm')

function getArtBySearchTerm (searchTerm, callback) {
  getArtBySearchTermDA(searchTerm, function (e, results) {
    if (e) {
      callback(e, null)
    } else {
      callback(null, {'art': [{'id': 'id1', 'url': 'http://bla'}]})
    }
  })
}

module.exports = getArtBySearchTerm
