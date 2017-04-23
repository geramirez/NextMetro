const { Stations, Prediction } = require('../src/next-metro')

describe("predictions", () => {
  it("sends predictions to the UI", ()=> {
    const ui = jasmine.createSpyObj("ui", ["predictions"])
    let predictionsServiceStub = {
      fetch: function(callback) {
        callback(predictionsArrayFixture)
      }
    }
    stations = new Stations(predictionsServiceStub)
    stations.predictions(ui)

    expect(ui.predictions).toHaveBeenCalledWith(predictionsArrayFixture)
  })
})

const predictionsArrayFixture = [
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
]
