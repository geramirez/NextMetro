function Prediction(data) {
  this.line = data.Line
  this.location = data.LocationName
  this.destination = data.DestinationName
  this.minutesToArrival = data.Min
}

module.exports = {
  Prediction
}
