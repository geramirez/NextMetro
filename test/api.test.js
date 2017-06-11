process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)

describe('Next-Metro API', () => {

  describe('/GET trains', (done) => {
    it('should return a list of all the train preditions', (done) => {
      chai.request(server)
        .get('/trains')
        .end((err, res) => {
          chai.expect(res).to.have.status(200)
          done()
        })
    })
  })
})
