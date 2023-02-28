import React from 'react'
import {getCookie} from "../utils/cookieHandler";
import {getSurveyByIdWithAuth} from "../SurveyAction/SurveyAction";
import {CircularProgress} from "@mui/material";
import SurveyListError from "../Error/SurveyListError";
import Chart from "../Chart/Chart";
import './StatisticsModeStyle.css'


class StatisticsMode extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      id: props.params.id,
      title: "",
      description: "",
      visibility: null,
      questions: [],
      error: false,
      loading: true,
      guest: true,
      survey: [],
      token: getCookie("userSession")
    }
  }

  getSurveyByIdWithAuthForStats = () => {
    getSurveyByIdWithAuth(this.state.token, this.state.id).then(r => {
      const survey = r.data;
      this.setState({
        survey: survey,
        title: survey.title,
        error: false,
        loading: false,
      })
    }).catch(r => {
      this.setState({
        error: true,
        loading: false,
      })
    })
  }

  render() {
    if (this.state.loading) {
      this.getSurveyByIdWithAuthForStats()
      return (
        <div className="Container">
          <div className='ProgressBar'>
            <CircularProgress size='10em' color='inherit'/>
          </div>
        </div>
      )
    }
    if (this.state.error) {
      return (
        <div className="Container">
          <SurveyListError/>
        </div>)
    }

    return (
      <div className="StatContainer">
        <div className="StatDetails">
          <h1 className='StatTitle'>{this.state.survey.title}</h1>
          {this.props.visibility ? null :
            <a
              className="ShareLink"
              href={"/view/share/" + this.state.survey.survey_id}>
              {"https://survey-app-frontend-v2-1ez3.vercel.app/view/share/" + this.state.survey.survey_id}
            </a>}
          <p className='StatDescription'>{this.state.survey.description}</p>

        </div>
        <div>
          <div>
            {this.state.survey.questions.map((q, questionIndex) => (
              <div className="ChartContainer" key={questionIndex}>
                  <Chart key={questionIndex} answers={q.answers} question={q.question}/>
              </div>
            ))}
          </div>
          <div className="Buttons">
            <button className="BackBtn" onClick={this.onClickBack}>Back</button>
          </div>
        </div>
      </div>
    )
  }

  onClickBack = e => {
    e.preventDefault()
    this.props.navigate(-1);
  }


} export default StatisticsMode;
