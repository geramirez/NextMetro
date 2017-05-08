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
    this.setState({selectedStations})
  }

  renderStations () {
    return this.state.selectedStations.map((name, i) => {
      let predictions = this.state.predictionsByStation[name]
      return (
        <div key={i} className='column column-block'>
          <Station key={i} name={name} predictions={predictions} />
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <StationSelect updateSelectedStation={this.onChangeStationSelect.bind(this)} stations={this.sortedStations()} selectedStations={this.state.selectedStations} />
        <div className='stations row large-up-2'>
          {this.renderStations()}
        </div>
      </div>
    )
  }
}

function StationSelect (props) {
  const { stations, selectedStations, updateSelectedStation } = props

  function getOptions () {
    return stations.map((station) => {
      return {value: station, label: station}
    })
  }

  function onChange (newStations) {
    updateSelectedStation(newStations.map((station) => station.label))
  }

  return (
    <div className='row'>
      <Select
        className='station-select small-6 small-centered columns'
        multi={true}
        options={getOptions()}
        value={selectedStations}
        placeholder='Select stations'
        onChange={onChange} />
    </div>
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
    <div key={name} className='station'>
      <div className='card'>
        <div className='title card-divider'>
          <h4 className='name'>{name}</h4>
        </div>
        <div className='predictions card-section'>
          <div className='prediction-label row'>
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
