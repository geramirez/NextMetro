const PredictionsService = {
  fetch: function (callback) {
    fetch('/station', {})
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        callback(json.Trains)
      })
      .catch(function (ex) {
        console.log('parsing failed', ex)
      })
  }
}

module.exports = {PredictionsService}
