import React from 'react';
import './SurveyListError.css'

export default function SurveyListError() {
  return (
    <div className='ErrorContainer'>
      <h1 className='ErrorTitle'>Something went wrong!</h1>
      <p className='ErrorMessage'>Unable to connect to the data source.</p>
    </div>
  )
}
