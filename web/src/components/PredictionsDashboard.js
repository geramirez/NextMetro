import React from 'react'

import Select from 'react-select'

class PredictionsDashboard extends React.Component {

  constructor () {
    super()
    this.state = {
      predictionsByStation: [],
      selectedStations: []
    }
  }

  predictions (predictionsByStation) {
    this.setState({predictionsByStation})
  }

  componentDidMount () {
    this.props.stations.predictions(this)
  }

  sortedStations () {
    return Object.keys(this.state.predictionsByStation).sort()
  }

  onChangeStationSelect (selectedStations) {
    console.log(selectedStations, 'select')
    this.setState({selectedStations})
  }

  renderStations () {
    return this.state.selectedStations.map((name, i) => {
      let predictions = this.state.predictionsByStation[name]
      return (
        <div key={i} className='row'>
          <Station key={i} name={name} predictions={predictions} />
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <StationSelect onChange={this.onChangeStationSelect.bind(this)} stations={this.sortedStations()} />
        <div className='stations'>
          {this.renderStations()}
        </div>
      </div>
    )
  }
}

function StationSelect (props) {
  function getOptions () {
    return props.stations.map((station) => {
      return {value: station, label: station}
    })
  }

  return (
    <Select
      className='station-select'
      multi={true}
      options={getOptions()}
      onChange={props.onChange} />
  )
}

function Station (props) {
  const { name, predictions } = props

  function renderPredictions (stationData) {
    return stationData.map((prediction, i) => {
      return <Prediction key={i} prediction={prediction} />
    })
  }

  return (
    <div key={name} className='station small-6 small-centered columns'>
      <div className='card'>
        <div className='card-divider'>
          <h4 className='name'>{name}</h4>
        </div>
        <div className='card-section'>
          <div className='prediction row'>
            <div className='line medium-3 columns'>
              Line
            </div>
            <div className='destination medium-6 columns'>
              Destination
            </div>
            <div className='time-to-arrival medium-3 columns'>
              Minutes
            </div>
          </div>
          {renderPredictions(predictions)}
        </div>
      </div>
    </div>
  )
}

function Prediction (props) {
  const { prediction } = props

  return (
    <div className='prediction row'>
      <div className='line medium-3 columns'>
        {prediction.line}
      </div>
      <div className='destination medium-6 columns'>
        {prediction.destination}
      </div>
      <div className='time-to-arrival medium-3 columns'>
        {prediction.minutesToArrival}
      </div>
    </div>
  )
}

module.exports = {
PredictionsDashboard}
