import { NextMetroProxy } from '../main.js'

import nock from 'nock'
import { expect } from 'chai'

describe('NextMetroProxy', function () {
  describe('fetching predictions', function () {
    let predictionResponse = {station: 'College Park'}
    let expectedHeaders = {
      api_key: process.env.API_KEY
    }

    beforeEach(() => {
      nock('https://api.wmata.com', {reqheaders: expectedHeaders})
        .get('/StationPrediction.svc/json/GetPrediction/All')
        .reply(200, predictionResponse)
    })

    it('gets predictions from the NextMetro api', function (done) {
      NextMetroProxy.fetchPredictions((predictions) => {
        expect(predictions).to.deep.equal(predictionResponse)
        done()
      })
    })
  })
})
