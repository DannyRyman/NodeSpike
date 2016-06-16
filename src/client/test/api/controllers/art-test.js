var chai = require('chai')
var ZSchema = require('z-schema')
var validator = new ZSchema({})
var supertest = require('supertest')
var server = require('../../../app')
var api = supertest(server)
var expect = chai.expect

describe('/art', function () {
  describe('get', function () {
    it('should respond with 200 Success', function (done) {
      var schema = {
        'required': [
          'art'
        ],
        'properties': {
          'art': {
            'type': 'array',
            'items': {
              'type': 'object',
              'required': [
                'id'
              ],
              'properties': {
                'id': {
                  'type': 'string'
                },
                'url': {
                  'type': 'string'
                }
              }
            }
          }
        }
      }

      api.get('/art')
        .query({
          searchTerm: 'frog'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          expect(validator.validate(res.body, schema)).to.be.true
          done()
        })
    })

    it('should respond with default Error', function (done) {
      var schema = {
        'required': [
          'message'
        ],
        'properties': {
          'message': {
            'type': 'string'
          }
        }
      }

      api.get('/art')
        .query({
          searchTerm: 'error'
        })
        .set('Accept', 'application/json')
        .expect(500)
        .end(function (err, res) {
          if (err) return done(err)

          expect(validator.validate(res.body, schema)).to.be.true
          done()
        })
    })
  })
})
