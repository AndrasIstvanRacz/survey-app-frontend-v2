import React from 'react'
import "./CardStyle.css"
import {Link} from "react-router-dom";

export function Card(props) {
  return (
    <Link className="SurveyCard" to={props.type}>
      <h2 className="SurveyTitle">{props.surveyname}</h2>
      <p className="SurveyCreator">by {props.surveycreator}</p>
      <h4 className="Description">Description</h4>
      <p className="SurveyDescription">{props.description}</p>
    </Link>
  );
}
