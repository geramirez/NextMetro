const React = require('react')
const ReactDOM = require('react-dom')
const { PredictionsDashboard } = require('./src/components/PredictionsDashboard')
const { Stations, PredictionsService } = require("next-metro")

ReactDOM.render(
    <PredictionsDashboard stations={new Stations(PredictionsService)} />,
    document.querySelector("#react-app")
)
