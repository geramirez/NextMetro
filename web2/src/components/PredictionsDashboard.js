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
      return (
        <div key={i} className="row">
          <Station key={i} name={name} predictions={predictions}/>
        </div>
      )
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
    <div key={name} className='station small-6 small-centered columns'>
      <div className='card'>
        <div className='card-divider'>
          <h4 className='name'>{name}</h4>
        </div>
        <div className='card-section'>
          <div className="prediction row">
            <div className="line medium-3 columns">Line</div>
            <div className="destination medium-6 columns">Destination</div>
            <div className="time-to-arrival medium-3 columns">Minutes</div>
          </div>
          {renderPredictions(predictions)}
        </div>
      </div>
    </div>
  )
}

function Prediction(props) {
  const { prediction } = props

  return (
    <div className="prediction row">
      <div className="line medium-3 columns">{prediction.line}</div>
      <div className="destination medium-6 columns">{prediction.destination}</div>
      <div className="time-to-arrival medium-3 columns">{prediction.minutesToArrival}</div>
    </div>
  )
}

module.exports = {
  PredictionsDashboard
}
