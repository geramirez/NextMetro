process.env.NODE_ENV = 'test'

import { expect } from 'chai'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'

chai.use(chaiHttp)

describe('Next-Metro API', () => {

  describe('/GET stations', (done) => {
    it('should return a list of all the stations', (done) => {
      chai.request(server)
        .get('/station')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect()
          done()
        })
    })
  })
})
