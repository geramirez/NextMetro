const React = require("react")
const ReactDOM = require("react-dom")
const { Prediction } = require('next-metro')
const { PredictionsDashboard } = require("../src/components/PredictionsDashboard")

describe("predictions", function () {

    it("renders predictions", function () {

      renderApp({
        predictions: function(ui) {
          ui.predictions(predictionsFixture)
        }
      })

      Object.entries(predictionsFixture).forEach(([stationName, stationData]) => {
        expect(page()).toContain(stationName)
        stationData.forEach((prediction) => {
          expect(page()).toContain(prediction.line)
          expect(page()).toContain(prediction.destination)
          expect(page()).toContain(prediction.minutesToArrival)
        })
      })

    })

    let domFixture
    const predictionsFixture = {
        "Judiciary Square": [
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
        ],
        "U Street": [
          new Prediction({
            "Car": "8",
            "Destination": "College Park",
            "DestinationCode": "E06",
            "DestinationName": "College Park",
            "Group": "2",
            "Line": "GR",
            "LocationCode": "G02",
            "LocationName": "U Street",
            "Min": "5"
          }),
        ]
    }

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "reactApp"
        document.querySelector("body").appendChild(domFixture)
    }

    beforeEach(function () {
        setupDOM()
    })

    afterEach(function () {
        domFixture.remove()
    })

    function renderApp(stations) {
        ReactDOM.render(
            <PredictionsDashboard stations={stations} />,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText
    }
})
