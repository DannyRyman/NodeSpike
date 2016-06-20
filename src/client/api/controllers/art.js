var getArtBySearchTerm = require('../queries/getArtBySearchTerm')

module.exports = {
  getArt: getArt
}

function getArt (req, res, next) {
  var searchTerm = req.query.searchTerm

  getArtBySearchTerm(searchTerm, function (err, results) {
    if (err) {
      next(err)
    } else {
      // todo transform the results
      console.log(JSON.stringify(results))
      res.json(results)
    }
  })
}
