const express = require('express')
const app = express()
const path = require('path')
const {NextMetroProxy} = require('next-metro-proxy')

let trainsData
NextMetroProxy.fetchPredictions((data) => {
  trainsData = data
})

setInterval(() => {
  NextMetroProxy.fetchPredictions((data) => {
    trainsData = data
  })
}, 60000)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.route('/station').get((req, res) => {
  res.json(trainsData)
})

app.use(express.static('client/public'))

app.listen(8080)

module.exports = app
