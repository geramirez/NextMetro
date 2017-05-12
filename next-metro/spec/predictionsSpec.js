const { NextMetro, Prediction } = require('../main')

describe('predictions', () => {

  it('tells the UI about new predictions', () => {
    expect(ui.predictions).toHaveBeenCalled()
  })

  it('organizes predictions by station', () => {
    let byStation = getPredictionsByStation()

    expect(ui.predictions).toHaveBeenCalledWith(byStation)
  })

  beforeEach(() => {
    ui = jasmine.createSpyObj('ui', ['predictions'])

    stations = new NextMetro(predictionsServiceStub)
    stations.predictions(ui)
  })
})

describe('refreshing predictions', () => {

  it('refreshes the data every 30 seconds', () => {
    expect(ui.predictions.calls.count()).toEqual(1)
    jasmine.clock().tick(30001)
    expect(ui.predictions.calls.count()).toEqual(2)
  })

  beforeEach(() => {
    ui = jasmine.createSpyObj('ui', ['predictions'])
    jasmine.clock().install();

    stations = new NextMetro(predictionsServiceStub)
    stations.predictions(ui)
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })
})

let ui, setIntervalWrapperStub

const predictionsServiceStub = {
  fetch: function (callback) {
    callback(rawPredictions)
  }
}

const rawPredictions = [
  {
    'Car': '8',
    'Destination': 'SilvrSpg',
    'DestinationCode': 'B08',
    'DestinationName': 'Silver Spring',
    'Group': '1',
    'Line': 'RD',
    'LocationCode': 'B02',
    'LocationName': 'Judiciary Square',
    'Min': 'BRD'
  },
  {
    'Car': '8',
    'Destination': 'Shady Gr',
    'DestinationCode': 'A15',
    'DestinationName': 'Shady Grove',
    'Group': '2',
    'Line': 'RD',
    'LocationCode': 'B02',
    'LocationName': 'Judiciary Square',
    'Min': '5'
  },
  {
    'Car': '8',
    'Destination': 'Shady Gr',
    'DestinationCode': 'A15',
    'DestinationName': 'Shady Grove',
    'Group': '2',
    'Line': 'RD',
    'LocationCode': 'B02',
    'LocationName': 'Judiciary Square',
    'Min': '5'
  },
  {
    'Car': null,
    'Destination': 'ssenger',
    'DestinationCode': null,
    'DestinationName': 'No Passenger',
    'Group': '1',
    'Line': 'No',
    'LocationCode': 'E08',
    'LocationName': "Prince George's Plaza",
    'Min': '4'
  },
  {
    'Car': null,
    'Destination': 'ssenger',
    'DestinationCode': null,
    'DestinationName': 'No Passenger',
    'Group': '1',
    'Line': 'No',
    'LocationCode': 'E08',
    'LocationName': "Prince George's Plaza",
    'Min': '17'
  }
]

const predictionsFixture = rawPredictions.map(p => new Prediction(p))

function getPredictionsByStation () {
  return predictionsFixture.reduce((acc, item) => {
    let key = item.location
    acc[key] = acc[key] || []
    acc[key].push(item)
    return acc
  }, {})
}
