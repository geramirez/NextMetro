function Stations(predictionsService) {
  this.predictions = function(ui) {
    new PredictionFetcher(predictionsService, ui).execute()
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
