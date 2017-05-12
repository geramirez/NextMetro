const { Prediction } = require('./prediction')

function NextMetro (predictionsService) {
  this.predictions = function (ui) {
    const fetcher = new PredictionFetcher(predictionsService, ui)
    fetcher.execute()
    setInterval(() => fetcher.execute(), 30000)
  }
}

function PredictionFetcher (predictionsService, ui) {
  this.execute = function () {
    predictionsService.fetch((data) => {
      let predictions = data.map(p => new Prediction(p))
      ui.predictions(groupByStation(predictions))
    })
  }

  function groupByStation (predictions) {
    return predictions.reduce((acc, item) => {
      let key = item.location
      acc[key] = acc[key] || []
      acc[key].push(item)
      return acc
    }, {})
  }
}

module.exports = {NextMetro}
