import React from 'react'
import Select from 'react-select'

export default function StationSelect (props) {
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
        className='station-select columns'
        multi={true}
        options={getOptions()}
        value={selectedStations}
        placeholder='Select stations'
        onChange={onChange} />
    </div>
  )
}
