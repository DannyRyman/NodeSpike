var chai = require('chai')
var ZSchema = require('z-schema')
var validator = new ZSchema({})
var supertest = require('supertest')
var server = require('../../../app')
var api = supertest(server)
var expect = chai.expect
var swaggerSchema = require('../../../api/swagger/swagger.json')

function assertValidResponseBody (body, schema) {
  var result = validator.validate(body, schema)
  if (!result) {
    console.log(validator.getLastErrors())
  }
  expect(result).to.be.true
}

describe('/art', function () {
  describe('get', function () {
    describe('when a valid request is made', function () {
      var response
      before(function (done) {
        api.get('/art')
          .query({
            searchTerm: 'frog'
          })
          .set('Accept', 'application/json')
          .end(function (err, res) {
            if (err) return done(err)
            response = res
            done()
          })
      })

      it('should respond with 200 Success', function () {
        expect(response.status).to.equal(200)
      })

      it('should have a valid response body', function () {
        var getArtResponseSchema = swaggerSchema.definitions.GetArtResponse
        assertValidResponseBody(response.body, getArtResponseSchema)
      })
    })
  })
})
