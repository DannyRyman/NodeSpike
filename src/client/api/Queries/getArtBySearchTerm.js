const R = require('ramda')
const getArtBySearchTermDA = require('./DeviantArt/getArtBySearchTerm')

function getArtBySearchTerm (searchTerm, callback) {
  var summarizeResult = x => {
    return {
      'id': x.deviationid,
      'url': x.url
    }
  }

  getArtBySearchTermDA(searchTerm, function (e, data) {
    if (e) {
      callback(e, null)
    } else {
      const summerisedResults = R.map(summarizeResult, data.results)
      callback(null, summerisedResults)
    }
  })
}

module.exports = getArtBySearchTerm
