var express = require('express')
var app = express()
var path = require('path')
var request = require('request')

const PredictionsService = {
  fetch: function (callback) {
    params = {
      headers: {
        api_key: process.env.API_KEY
      }
    }
    request.get('https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All', params , function (error, response, body) {
      callback(JSON.parse(body))
    })
  }
}

let trainsData
PredictionsService.fetch((data) => {
  trainsData = data
})

setInterval(() => {
  PredictionsService.fetch((data) => {
    trainsData = data
  })
}, 60000)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.route('/station').get((req, res) => {
  res.json(trainsData)
})

app.use(express.static('public'))

app.listen(8080)

module.exports = app
