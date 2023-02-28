import React from "react";
import {getSurveyByIdWithAuth, updateSurvey}
  from "../SurveyAction/SurveyAction";
import AddIcon from '@mui/icons-material/Add';
import {getCookie} from '../utils/cookieHandler'
import SurveyListError from "../Error/SurveyListError";
import './EditModeStyle.css'
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";

class EditMode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.params.id,
      title: "",
      error: false,
      loading: true,
      token: getCookie("userSession"),
      survey: [],

    }
  }

  getUserSurveys = () => {
    getSurveyByIdWithAuth(this.state.token, this.state.id).then(r => {
      const survey = r.data;
      this.setState({
        survey: survey,
        title: survey.title,
        error: false,
        loading: false
      })
    }).catch(r => {
      this.setState({
        error: true,
        loading: false
      })
    })
  }

  render() {
    const theme = createTheme({
      typography: {
        fontFamily: [
          "Comic Sans MS",
          "Comic Sans",
          'cursive',
        ].join(','),
      },
    });

    if (this.state.loading) {
      this.getUserSurveys();
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
      <form className="FormContainer" onSubmit={this.onClickSave}>
        <div className="SurveyDetails">
          <input
            className="NewTitle"
            type="text"
            onChange={e => this.setState(prevState => {
              let survey = Object.assign({}, prevState.survey);
              survey.title = e.target.value;
              return {survey};
            })}
            value={this.state.survey.title}
            placeholder="Title"/>
          <textarea
            className="NewDescription"
            onChange={e => this.setState(prevState => {
              let survey = Object.assign({}, prevState.survey);
              survey.description = e.target.value;
              return {survey};
            })}
            value={this.state.survey.description}
            placeholder="Description"/>
          <ThemeProvider theme={theme}>
            <ToggleButtonGroup
              size="small"
              value={this.state.survey.visibility}
              exclusive
              onChange={this.handelChange}>
              <ToggleButton value={false}>Private</ToggleButton>
              <ToggleButton value={true}>Public</ToggleButton>
            </ToggleButtonGroup>
          </ThemeProvider>
        </div>
        <div>
          <div>
            {this.state.survey.questions.map((q, questionIndex) => (
              <div className="FillForm" key={questionIndex}>
                <div className='QuestionContainer'>
                  <input
                    className="NewQuestion"
                    onChange={e => this.setState(prevState => {
                      let survey = Object.assign({}, prevState.survey);
                      survey.questions[questionIndex].question = e.target.value;
                      return {survey};
                    })}
                    value={q.question}
                    placeholder="Question"/>
                  <div className='Delete' onClick={e => this.questionOnDelete(questionIndex)}>
                    Delete
                  </div>
                </div>
                {q.answers.map((a, answerIndex) => (
                  <div className="AnswersContainer" key={answerIndex}>
                    <input
                      className="NewAnswer"
                      type="text"
                      onChange={e => this.setState(prevState => {
                        let survey = Object.assign({}, prevState.survey);
                        survey.questions[questionIndex]
                          .answers[answerIndex].answer = e.target.value;
                        return {survey};
                      })}
                      value={a.answer}
                      placeholder="Answer"/>
                    <div className='Delete'
                         onClick={e => this.answerOnDelete(questionIndex, answerIndex)}>
                      Delete
                    </div>
                  </div>))}
                <AddIcon
                  className='AddAnswer'
                  onClick={e => this.addNewAnswer(e, questionIndex)}/>
              </div>
            ))}
          </div>

          <div
            className='AddQuestion'
            onClick={e => this.addNewQuestion(e)}>
            <AddIcon/>
          </div>
          <div className="Buttons">
            <button className="BackBtn" onClick={this.onClickBack}>Back</button>
            <button className="DoneBtn" type="submit">Save</button>
          </div>
        </div>
      </form>
    );

  }

  handelChange = (e, newVisibility) => {
    if (newVisibility !== null) {
      this.setState(prevState => {
        let survey = Object.assign({}, prevState.survey);
        survey.visibility = newVisibility;
        return {survey};
      })
    }
  }

  questionOnDelete = (index) => {
    let newQuestions = this.state.survey.questions;
    newQuestions.splice(index, 1)

    this.setState(prevState => {
      let survey = Object.assign({}, prevState.survey);
      survey.questions = newQuestions;
      return {survey};
    })
  }

  answerOnDelete = (qIndex, aIndex) => {
    let newQuestions = this.state.survey.questions;
    newQuestions[qIndex].answers.splice(aIndex, 1)

    this.setState(prevState => {
      let survey = Object.assign({}, prevState.survey);
      survey.questions = newQuestions;
      return {survey};
    })
  }

  addNewQuestion = (e) => {
    e.preventDefault()
    let newQuestions = this.state.survey.questions.concat({question_id: 0, question: '', answers: []})
    this.setState(prevState => {
      let survey = Object.assign({}, prevState.survey);
      survey.questions = newQuestions;
      return {survey};
    })
  }

  addNewAnswer = (e, index) => {
    e.preventDefault()
    let answerList = this.state.survey.questions[index].answers;
    answerList.push({answer_id: 256, answer: '', picked: 4})
    this.setState(prevState => {
      let survey = Object.assign({}, prevState.survey);
      survey.questions[index].answers = answerList;
      return {survey};
    })
  }

  onClickSave = e => {
    e.preventDefault()
    let updatedQuestions = []
    this.state.survey.questions.forEach(q => {
      let answer = []
      q.answers.forEach(a => answer.push(a.answer))
      updatedQuestions.push({newQuestion: q.question, newAnswers: answer})
    })
    updateSurvey(
      this.state.id,
      this.state.survey.title,
      this.state.survey.description,
      this.state.survey.visibility,
      updatedQuestions,
      this.state.token).then(r => {
      this.props.navigate('/modify');
    }).catch(r => {
      this.setState({
        error: true
      })
    })

  }
  onClickBack = e => {
    e.preventDefault()
    this.props.navigate(-1);
  }

}

export default EditMode;
