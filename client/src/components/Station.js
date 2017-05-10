import React from 'react'

import Prediction from './Prediction'

export default function Station (props) {
  const { name, predictions } = props

  function renderPredictions (stationData) {
    return stationData.map((prediction, i) => {
      return <Prediction key={i} prediction={prediction} />
    })
  }

  return (
    <div key={name} className='station'>
      <div className='card'>
        <div className='title card-divider'>
          <h4 className='name'>{name}</h4>
        </div>
        <div className='predictions card-section'>
          <div className='prediction-label row'>
            <div className='line small-3 columns'>
              Line
            </div>
            <div className='destination small-6 columns'>
              Destination
            </div>
            <div className='time-to-arrival small-3 columns'>
              Minutes
            </div>
          </div>
          {renderPredictions(predictions)}
        </div>
      </div>
    </div>
  )
}
