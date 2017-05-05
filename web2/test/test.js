import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'

import { PredictionsDashboard } from '../src/components/PredictionsDashboard'
import { Prediction } from 'next-metro'

describe('<PredictionsDashboard />', () => {

  let stations, dashboard

  describe('Stations have not been chosen', () => {
    it('does not render any stations', () => {
      const stationsElements = dashboard.find('.station')
      expect(stationsElements.length).to.eq(0)
    })
  })

  describe('Choosing stations', () => {

    let selectedStations

    beforeEach(() => {
      let stationSelector = dashboard.find('.station-select')
      stationSelector.simulate('change', {target: {value: selectedStations}})
    // selectedStations = [stationsNameFixture[0], stationsNameFixture[2]]
    // dashboard.setState({selectedStations: selectedStations})
    })

    it('renders the selected stations in order', () => {
      const stationsElements = dashboard.find('.station').map((e) => e.find('.name').text())
      expect(stationsElements).to.eql(selectedStations)
    })

    it('renders predictions for each station', () => {
      selectedStations.forEach((stationName) => {
        predictionsFixture[stationName].forEach((prediction) => {
          expect(dashboard.text()).to.contain(prediction.line)
          expect(dashboard.text()).to.contain(prediction.destination)
          expect(dashboard.text()).to.contain(prediction.minutesToArrival)
        })
      })
    })
  })

  beforeEach(() => {
    stations = {
      predictions: function (ui) {
        ui.predictions(predictionsFixture)
      }
    }
    dashboard = mount(<PredictionsDashboard stations={stations} />)
  })
})

const predictionsFixture = {
  'U Street': [
    new Prediction({
      'Car': '8',
      'Destination': 'College Park',
      'DestinationCode': 'E06',
      'DestinationName': 'College Park',
      'Group': '2',
      'Line': 'GR',
      'LocationCode': 'G02',
      'LocationName': 'U Street',
      'Min': '5'
    })
  ],
  "Prince George's Plaza": [
    new Prediction({
      'Car': '8',
      'Destination': 'College Park',
      'DestinationCode': 'E06',
      'DestinationName': 'College Park',
      'Group': '2',
      'Line': 'GR',
      'LocationCode': 'G02',
      'LocationName': 'U Street',
      'Min': '5'
    })
  ],

  'Judiciary Square': [
    new Prediction({
      'Car': '8',
      'Destination': 'SilvrSpg',
      'DestinationCode': 'B08',
      'DestinationName': 'Silver Spring',
      'Group': '1',
      'Line': 'RD',
      'LocationCode': 'B02',
      'LocationName': 'Judiciary Square',
      'Min': 'BRD'
    }),
    new Prediction({
      'Car': '8',
      'Destination': 'Shady Gr',
      'DestinationCode': 'A15',
      'DestinationName': 'Shady Grove',
      'Group': '2',
      'Line': 'RD',
      'LocationCode': 'B02',
      'LocationName': 'Judiciary Square',
      'Min': '5'
    })
  ]
}

const stationsNameFixture = Object.keys(predictionsFixture).sort()
