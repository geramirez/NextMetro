const React = require('react')

class PredictionsDashboard extends React.Component {

  constructor() {
    super()
    this.state = {allPredictions: []}
  }

  predictions(allPredictions) {
    this.setState({allPredictions})
  }

  componentDidMount() {
    this.props.stations.predictions(this)
  }

  renderPredictions() {
    console.log(this.state.allPredictions)
    return this.state.allPredictions.map((prediction, i) => {
      return <div key={i}>{prediction.line}, {prediction.location}, {prediction.destination}, {prediction.minutesToArrival} </div>
    })
  }

  render() {
    return (
      <div>
        {this.renderPredictions()}
      </div>
    )
  }
}

module.exports = {
  PredictionsDashboard
}
