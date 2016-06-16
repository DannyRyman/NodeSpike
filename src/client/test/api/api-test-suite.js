var exec = require('child_process').exec

before(function (done) {
  exec('yaml2json ./api/swagger/swagger.yaml --pretty --save', function callback (error, stdout, stderr) {
    if (error) {
      console.log('error creating swagger json file')
    } else {
      done()
    }
  })
})
