function Stations(predictionsService) {
  this.predictions = function(ui) {
    const fetcher = new PredictionFetcher(predictionsService, ui)
    fetcher.execute()
    setInterval(() => {fetcher.execute()}, 1000 * 60);
  }
}

function PredictionFetcher(predictionsService, ui) {

    this.execute = function() {
      predictionsService.fetch((predictions) => {
        ui.predictions(groupByStation(predictions))
      })
    }

    function groupByStation(predictions) {
      return predictions.reduce((acc, item) => {
        let key = item.location
        acc[key] = acc[key] || []
        acc[key].push(item)
        return acc
      }, {})
    }

}

module.exports = {
  Stations,
}
