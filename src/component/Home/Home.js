import React, {Component} from "react";
import {Card} from "../Card/Card";
import {getSurveysData} from "../SurveyAction/SurveyAction";
import ViewTypes from "../Enum/ViewTypes";
import "./HomeStyle.css"
import SurveyListError from "../Error/SurveyListError";
import {CircularProgress} from "@mui/material";

class Home extends Component{

  constructor() {
    super();
    this.state = {
      surveys: [],
      error: false
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
            type={`/view/fill/${survey.id}`}
          />)) : <SurveyListError/>}
      </div>
    );
  }

  getSurveys = () => {
    getSurveysData()
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
export default Home;
