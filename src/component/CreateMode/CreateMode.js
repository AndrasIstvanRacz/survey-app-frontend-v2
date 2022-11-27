import React from "react";
import {addNewSurvey}
  from "../SurveyAction/SurveyAction";
import AddIcon from '@mui/icons-material/Add';
import {getCookie} from '../utils/cookieHandler'
import SurveyListError from "../Error/SurveyListError";
import './CreateModeStyle.css'
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";

class CreateMode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      visibility: false,
      newQuestions: [{newQuestion: "", newAnswers: []}],
      error: false,
      token: getCookie("userSession"),
    }
  }

  componentDidMount() {
  }

  render() {
    console.log(this.state.newQuestions)
    const theme = createTheme({
      typography: {
        fontFamily: [
          "Comic Sans MS",
          "Comic Sans",
          'cursive',
        ].join(','),
      },
    });

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
            required={true}
            onChange={e => this.setState({title: e.target.value})}
            value={this.state.title}
            placeholder="Title"/>
          <textarea
            className="NewDescription"
            onChange={e => this.setState({description: e.target.value})}
            value={this.state.description}
            placeholder="Description"/>
          <ThemeProvider theme={theme}>
            <ToggleButtonGroup
              size="small"
              value={this.state.visibility}
              exclusive
              onChange={this.handelChange}>
              <ToggleButton value={false}>Private</ToggleButton>
              <ToggleButton value={true}>Public</ToggleButton>
            </ToggleButtonGroup>
          </ThemeProvider>
        </div>
        <div>
          <div>
            {this.state.newQuestions.map((q, questionIndex) => (
              <div className="FillForm" key={questionIndex}>
                <div className='QuestionContainer'>
                  <input
                    className="NewQuestion"
                    onChange={e => this.setState(prevState => {
                      let questions = Object.assign({}, prevState.newQuestions);
                      questions[questionIndex].newQuestion = e.target.value;
                      return {questions};
                    })}
                    value={q.newQuestion}
                    placeholder="Question"/>
                  <div className='Delete' onClick={e => this.questionOnDelete(questionIndex)}>
                    Delete
                  </div>
                </div>
                {q.newAnswers.map((a, answerIndex) => (
                  <div className="AnswersContainer" key={answerIndex}>
                    <input
                      className="NewAnswer"
                      type="text"
                      onChange={e => this.setState(prevState => {
                        let questions = Object.assign({}, prevState.newQuestions);
                        questions[questionIndex]
                          .newAnswers[answerIndex] = e.target.value;
                        return {questions};
                      })}
                      value={a}
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
      this.setState({visibility: newVisibility})
    }
  }

  questionOnDelete = (index) => {
    let newQuestions = this.state.newQuestions;
    newQuestions.splice(index, 1)

    this.setState(prevState => {
      let questions = Object.assign({}, prevState.newQuestions);
      questions.newQuestions = newQuestions;
      return {questions};
    })
  }

  answerOnDelete = (qIndex, aIndex) => {
    let newQuestions = this.state.newQuestions;
    newQuestions[qIndex].newAnswers.splice(aIndex, 1)

    this.setState(prevState => {
      let questions = Object.assign({}, prevState.newQuestions);
      questions.newQuestions = newQuestions;
      return {questions};
    })
  }

  addNewQuestion = (e) => {
    e.preventDefault()
    let newQuestions = this.state.newQuestions.concat({newQuestion: "", newAnswers: []})
    this.setState({newQuestions: newQuestions})
  }


  addNewAnswer = (e, index) => {
    e.preventDefault()
    let questions = this.state.newQuestions;
    let answerList = questions[index].newAnswers
    answerList.push("")
    questions[index].newAnswers = answerList
    this.setState({newQuestions: questions})
  }

  onClickSave = e => {
    e.preventDefault()
      addNewSurvey(this.state.title,
        this.state.description,
        this.state.visibility,
        this.state.newQuestions,
        this.state.token).then(r => {
        this.props.navigate("/modify");
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

export default CreateMode;
