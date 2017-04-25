const React = require('react')

class PredictionsDashboard extends React.Component {

  constructor() {
    super()
    this.state = {predictionsByStation: []}
  }

  predictions(predictionsByStation) {
    this.setState({predictionsByStation})
  }

  componentDidMount() {
    this.props.stations.predictions(this)
  }

  sortedStations() {
    return Object.keys(this.state.predictionsByStation).sort()
  }

  renderStations() {
    return this.sortedStations().map((name, i) => {
      let predictions = this.state.predictionsByStation[name]
      return <Station key={i} name={name} predictions={predictions}/>
    })
  }

  render() {
    return (
      <div className='stations'>
        {this.renderStations()}
      </div>
    )
  }
}

function Station(props) {
  const { name, predictions } = props

 function renderPredictions(stationData) {
    return stationData.map((prediction, i) => {
      return <Prediction key={i} prediction={prediction}/>
    })
  }

  return (
    <div key={name} className='station'>
      <h3 className='name'>{name}</h3>
      {renderPredictions(predictions)}
      <div/>
    </div>
  )
}

function Prediction(props) {
  const { prediction } = props
  return (
    <div className="prediction">
      <div className="line">{prediction.line}</div>
      <div className="destination">{prediction.destination}</div>
      <div className="time-to-arrival">{prediction.minutesToArrival}</div>
    </div>
  )
}

module.exports = {
  PredictionsDashboard
}
