const { Prediction } = require('./prediction')

const PredictionsService = {
  fetch: function(callback) {
    params = {
      headers: {
        api_key: '721e30509a774404931b4d9376ed823e'
      }
    }
    window.fetch('https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All', params)
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        callback(json.Trains.map((p) => new Prediction(p)))
      })
      .catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }
}

module.exports = {
  PredictionsService
}
