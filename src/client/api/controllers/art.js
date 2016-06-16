module.exports = {
  getArt: getArt
}

function getArt (req, res) {
  var searchTerm = req.query.searchTerm
  if (searchTerm === 'error') {
    res.status(500).json('An error occurred')
  } else {
    var data = [{id: 'image1', url: 'http://image1.jpg'}]
    res.json(data)
  }
}
