const { Stations, Prediction } = require('../src/next-metro')

describe("predictions", () => {

  it("tells the UI about new predictions", () => {
    expect(ui.predictions).toHaveBeenCalled()
  })

  it("organizes predictions by station", ()=> {
    let byStation = getPredictionsByStation()

    expect(ui.predictions).toHaveBeenCalledWith(byStation)
  })

  beforeEach(() => {
    setIntervalWrapperStub = jasmine.createSpy("setIntervalWrapper").and.callThrough()
    ui = jasmine.createSpyObj("ui", ["predictions"])

    stations = new Stations(predictionsServiceStub, setIntervalWrapperStub)
    stations.predictions(ui)
  })
})

describe("refreshing predictions", () => {

  it("calls a setInterval method that refreshes predictions", () => {
    expect(ui.predictions.calls.count()).toEqual(2);
  })

  beforeEach(() => {
    setIntervalWrapperStub = function(cb) { cb() }
    ui = jasmine.createSpyObj("ui", ["predictions"])

    stations = new Stations(predictionsServiceStub, setIntervalWrapperStub)
    stations.predictions(ui)
  });
})

let ui, setIntervalWrapperStub

const predictionsServiceStub = {
  fetch: function(callback) {
    callback(predictionsFixture)
  }
}

const predictionsFixture = [
  new Prediction({
    "Car": "8",
    "Destination": "SilvrSpg",
    "DestinationCode": "B08",
    "DestinationName": "Silver Spring",
    "Group": "1",
    "Line": "RD",
    "LocationCode": "B02",
    "LocationName": "Judiciary Square",
    "Min": "BRD"
  }),
  new Prediction({
    "Car": "8",
    "Destination": "Shady Gr",
    "DestinationCode": "A15",
    "DestinationName": "Shady Grove",
    "Group": "2",
    "Line": "RD",
    "LocationCode": "B02",
    "LocationName": "Judiciary Square",
    "Min": "5"
  }),
  new Prediction({
    "Car": "8",
    "Destination": "Shady Gr",
    "DestinationCode": "A15",
    "DestinationName": "Shady Grove",
    "Group": "2",
    "Line": "RD",
    "LocationCode": "B02",
    "LocationName": "Judiciary Square",
    "Min": "5"
  }),
  new Prediction({
    "Car": null,
    "Destination": "ssenger",
    "DestinationCode": null,
    "DestinationName": "No Passenger",
    "Group": "1",
    "Line": "No",
    "LocationCode": "E08",
    "LocationName": "Prince George's Plaza",
    "Min": "4"
  }),
  new Prediction({
    "Car": null,
    "Destination": "ssenger",
    "DestinationCode": null,
    "DestinationName": "No Passenger",
    "Group": "1",
    "Line": "No",
    "LocationCode": "E08",
    "LocationName": "Prince George's Plaza",
    "Min": "17"
  })
]

function getPredictionsByStation() {
  return predictionsFixture.reduce((acc, item) => {
    let key = item.location
    acc[key] = acc[key] || []
    acc[key].push(item)
    return acc
  }, {})
}

