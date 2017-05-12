// import fetch from 'node-fetch'
const fetch = require('node-fetch')

const NextMetroProxy = {
  fetchPredictions: function (callback) {
    let url = 'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All'
    let params = {
      headers: {
        api_key: process.env.API_KEY
      }
    }
    fetch(url, params)
      .then(res => res.json())
      .then(json => callback(json))
      .catch(err => console.error(err))
  }
}

module.exports = { NextMetroProxy}
