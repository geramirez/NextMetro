import React from 'react'

export default function Prediction (props) {
  const { prediction } = props

  return (
    <div className='prediction row'>
      <div className='line small-3 columns'>
        {prediction.line}
      </div>
      <div className='destination small-6 columns'>
        {prediction.destination}
      </div>
      <div className='time-to-arrival small-3 columns'>
        {prediction.minutesToArrival}
      </div>
    </div>
  )
}
