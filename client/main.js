const React = require('react')
const ReactDOM = require('react-dom')
const { PredictionsDashboard } = require('./src/components/PredictionsDashboard')
const { NextMetro, PredictionsService } = require('next-metro')

let predictionServices = new NextMetro(PredictionsService)

ReactDOM.render(
  <PredictionsDashboard stations={predictionServices} />,
  document.querySelector('#react-app')
)
