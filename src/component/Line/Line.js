import React from 'react'
import "./LineStyle.css"
import {Link} from "react-router-dom";

export function Line(props) {
  return (
    <div className="SurveyLine" >
      <div className='LineLeft'>
        <h3 className="SurveyLineTitle">{props.surveyname}</h3>
      </div>
      <div className='LineRight'>
        <Link className='LineLink' to={`/modify/edit/${props.id}`}>Edit</Link>
        <div className='LineLink' onClick={event => props.handleDelete(event, props.id)}>Delete</div>
      </div>
    </div>
  );
}
