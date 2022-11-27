import React from "react";
import {
  getSurveyById, getSurveyByIdShared, getSurveyByIdWithAuth,
  saveAnswers
}
  from "../SurveyAction/SurveyAction";
import SurveyListError from "../Error/SurveyListError";
import './FillModeStyle.css'
import {CircularProgress} from "@mui/material";
import viewTypes from "../Enum/ViewTypes";

class FillMode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.params.id,
      type: props.params.type,
      pickedAnswers: [],
      title: "",
      description: "",
      visibility: null,
      questions: [],
      error: false,
      guest: true,
    }
  }

  componentDidMount() {
    if (this.state.type === viewTypes.Fill.name) {
      getSurveyById(this.state.id).then(r => {
        const survey = r.data;
        this.setState({
          title: survey.title,
          description: survey.description,
          questions: survey.questions,
          error: false,
        })
      }).catch(r => {
        console.log(r)
        this.setState({
          error: true
        })
      })
    } else if(this.state.type === viewTypes.Share.name) {
      getSurveyByIdShared(this.state.id).then(r => {
        const survey = r.data;
        this.setState({
          title: survey.title,
          description: survey.description,
          questions: survey.questions,
          error: false,
        })
      }).catch(r => {
        this.setState({
          error: true
        })
      })
    }

  }

  updatePickedAnswerList = (event) => {
    let temp = this.state.pickedAnswers
    temp[event.target.id] = event.target.value
    this.setState({pickedAnswers: temp})
  }

  render() {
    if (this.state.title === "" && !this.state.error) {
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
      <div className="FormContainer">
        <div className="SurveyDetails">
          <h1 className='FillTitle'>{this.state.title}</h1>
          <p className='FillDescription'>{this.state.description}</p>
        </div>
        <form onSubmit={this.onClickDone}>
          <div>
            {this.state.questions.map((q, questionIndex) => (
              <div className="FillForm" onChange={this.state.updatePickedAnswerList} key={questionIndex}>
                <h3 className='Question'>{q.question}</h3>
                {q.answers.map((a, answerIndex) => (
                  <div className="AnswersContainer" key={answerIndex}>
                    <input
                      className="RadioButton"
                      type="radio"
                      id={questionIndex}
                      name={"answer_" + questionIndex}
                      value={a.answer_id}
                      required={true}/>
                    <label className="Answer">{a.answer}</label>
                  </div>))}
              </div>
            ))}
          </div>
          <div className="Buttons">
            <button className="BackBtn" onClick={this.onClickBack}>Back</button>
            <button className="DoneBtn" type="submit">Done</button>
          </div>
        </form>
      </div>
    );
  }


  onClickBack = e => {
    e.preventDefault()
    this.props.navigate(-1);
  }

  onClickDone = e => {
    e.preventDefault()
    saveAnswers(this.state.pickedAnswers).then(r => {
      this.props.navigate("/");
    })
  }
}

export default FillMode;
