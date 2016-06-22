var getArtBySearchTerm = require('../queries/getArtBySearchTerm')

module.exports = {
  getArt: getArt
}

function getArt (req, res, next) {
  var searchTerm = req.query.searchTerm
  getArtBySearchTerm(searchTerm).fork(err => next(err), data => res.json(data))
}
