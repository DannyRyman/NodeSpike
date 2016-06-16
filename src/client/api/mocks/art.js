module.exports = {
  getArt: getArt
}

function getArt (req, res) {
  var data = [{id: 'image1', url: 'http://image1.jpg'}]
  res.json(data)
}
