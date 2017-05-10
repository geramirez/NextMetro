const React = require('react')
const ReactDOM = require('react-dom')
const { PredictionsDashboard } = require('./src/components/PredictionsDashboard')
const { Stations, PredictionsService } = require('next-metro')

function setIntervalWrapper (callback) {
  setInterval(callback, 10000)
}

let predictionServices = new Stations(PredictionsService, setIntervalWrapper)

ReactDOM.render(
  <PredictionsDashboard stations={predictionServices} />,
  document.querySelector('#react-app')
)
