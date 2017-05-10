import React from 'react'
import Select from 'react-select'

import StationSelect from './StationSelect'
import Station from './Station'

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
        <div className='stations row medium-up-2 small-up-1'>
          {this.renderStations()}
        </div>
      </div>
    )
  }
}

module.exports = {PredictionsDashboard}
