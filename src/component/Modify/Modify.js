import React from "react";
import {deleteSurvey, getSurveysDataByUser} from "../SurveyAction/SurveyAction";
import {getCookie} from "../utils/cookieHandler";
import SurveyListError from "../Error/SurveyListError";
import {Line} from "../Line/Line";
import {CircularProgress} from "@mui/material";
import './ModifyStyle.css'
import {Link} from "react-router-dom";

class Modify extends React.Component{
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this)
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
          <Link className='CreateNewSurveyLink' to='/modify/create'>Create new survey</Link>
          <div className='SurveyLineContainer'>
            {!this.state.error ? this.state.surveys.map((survey, index) => (
              <Line
                key={index}
                id={survey.id}
                surveyname={survey.title}
                handleDelete={this.onClickDelete}
              />)) : <SurveyListError/>}
          </div>

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

  onClickDelete = (e, id) => {
    e.preventDefault()
    deleteSurvey(getCookie('userSession'), id).then(r => {
      this.getSurveys();
    })
  }
}
export default Modify;
