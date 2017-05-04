function Stations (predictionsService, setIntervalWrapper) {
  this.predictions = function (ui) {
    const fetcher = new PredictionFetcher(predictionsService, ui)
    fetcher.execute()
    setIntervalWrapper(() => {
      fetcher.execute()})
  }
}

function PredictionFetcher (predictionsService, ui) {
  this.execute = function () {
    console.log('Getting station data')
    predictionsService.fetch((predictions) => {
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

module.exports = {
Stations}
