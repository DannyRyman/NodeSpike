const R = require('ramda')
const getArtBySearchTermDA = require('./api/queries/DeviantArt/getArtBySearchTerm')

const summarizeResult = originalResult => {
  return {
    'id': originalResult.deviationid,
    'url': originalResult.url
  }
}

const summarizeResults = R.pipe(R.prop('results'), R.map((summarizeResult)))

const getArtBySearchTerm = R.pipe(
  getArtBySearchTermDA,
  R.map(summarizeResults)
)

getArtBySearchTerm('frog').fork(err => console.error(err), data => console.log(data))
