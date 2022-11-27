import React, {Component} from "react";
import {Card} from "../Card/Card";
import { getSurveysDataByUser} from "../SurveyAction/SurveyAction";
import ViewTypes from "../Enum/ViewTypes";
import "../Home/HomeStyle.css"
import SurveyListError from "../Error/SurveyListError";
import {CircularProgress} from "@mui/material";
import {getCookie} from "../utils/cookieHandler";

class Statistics extends Component{

  constructor() {
    super();
    this.state = {
      surveys: [],
      error: false,
      token: getCookie('userSession')
    }
  }

  componentDidMount() {
    this.getSurveys();
  };


  render() {
    if (this.state.surveys === [] && !this.state.error) {
      return (
        <div className="Container">
          <div className='ProgressBar'>
            <CircularProgress size='10em' color='inherit'/>
          </div>
        </div>
      )
    }

    return (
      <div className="CardContainer">
        {!this.state.error ? this.state.surveys.map((survey, index) => (
          <Card
            key={index}
            id={survey.id}
            surveyname={survey.title}
            surveycreator={survey.username}
            description={survey.description}
            type={`/statistics/${survey.id}`}
          />)) : <SurveyListError/>}
      </div>
    );
  }

  getSurveys = () => {
    getSurveysDataByUser(this.state.token)
      .then(response => {
        this.setState({
          surveys: response.data,
          error: false
        })
      })
      .catch(r => {
        this.setState({error: true})
      });
  }

}
export default Statistics;
