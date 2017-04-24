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

  renderPredictions(stationData) {
    return stationData.map((prediction, i) => {
      return (
        <tr key={i}>
          <td>{prediction.line} </td>
          <td>{prediction.destination} </td>
          <td>{prediction.minutesToArrival}</td>
        </tr>
      )
    })
  }

  renderStations() {
    return Object.entries(this.state.predictionsByStation).map(([stationName, stationData]) => {
      return (
        <div key={stationName} className='station'>
          <h3 className='name'>{stationName}</h3>
          <table>
            <tbody>
              <tr>
                <th>Line</th>
                <th>Destination</th>
                <th>Minutes to Arrival</th>
              </tr>
              {this.renderPredictions(stationData)}
            </tbody>
          </table>
          <div/>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderStations()}
      </div>
    )
  }
}

module.exports = {
  PredictionsDashboard
}
