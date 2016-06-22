const R = require('ramda')
const getArtBySearchTermDA = require('./DeviantArt/getArtBySearchTerm')

const summarizeResult = originalResult => {
  return {
    'id': originalResult.deviationid,
    'url': originalResult.url
  }
}

const summarizeResults = R.pipe(R.prop('results'), R.map((summarizeResult)))

const getArtBySearchTerm = R.pipe(getArtBySearchTermDA, R.lift(summarizeResults))

module.exports = getArtBySearchTerm
