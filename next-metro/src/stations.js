function Stations(predictionsService) {

  this.predictions = function(ui) {
    predictionsService.fetch((predictions) => {
      ui.predictions(predictions)
    })
  }
}


module.exports = {
  Stations,
}
