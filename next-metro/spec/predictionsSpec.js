const { Stations, Prediction } = require('../src/next-metro')

describe("predictions", () => {

  it("tells the UI about new predictions", () => {
    expect(ui.predictions).toHaveBeenCalled()
  })

  it("organizes predictions by station", ()=> {
    let byStation = predictionsFixture.reduce((acc, item) => {
      let key = item.location
      acc[key] = acc[key] || []
      acc[key].push(item)
      return acc
    }, {})
    expect(ui.predictions).toHaveBeenCalledWith(byStation)
  })

  let ui, predictionsServiceStub

  beforeEach(() => {
    ui = jasmine.createSpyObj("ui", ["predictions"])

    predictionsServiceStub = {
      fetch: function(callback) {
        callback(predictionsFixture)
      }
    }
    stations = new Stations(predictionsServiceStub)
    stations.predictions(ui)
  })
})

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
