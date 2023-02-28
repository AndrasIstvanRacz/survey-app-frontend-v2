import axios from "axios";

const baseURL = 'https://survey-app-backend-deik.herokuapp.com';

export async function getSurveysData() {
  return await axios.get(baseURL + '/survey/findAllVisible');
}

export async function getSurveysDataByUser(token) {
  return await axios.get(baseURL + '/survey/findAllByUsername',
    {
      headers:
        {
          Authorization: "Bearer " + token,
        }
    })
}

export async function addNewSurvey(title, description, visibility, questions, token){
  return await axios.post(baseURL + '/survey/addNew',
    {
      newTitle: title,
      newDescription: description,
      newVisibility: visibility,
      questions: questions
    }, {
      headers:
        {
          Authorization: "Bearer " + token,
        }
    })
}

export async function updateSurvey(id, title, description, visibility, questions, token){
  console.log(id)
  console.log(title)
  console.log(description)
  console.log(visibility)
  console.log(questions)
  console.log(token)
  return await axios.post(baseURL + '/survey/update',
    {
      id: id,
      newTitle: title,
      newDescription: description,
      newVisibility: visibility,
      questions: questions
    }, {
      headers:
        {
          Authorization: "Bearer " + token
        }
    })
}

export async function getSurveyById(id){
  return await axios.get(baseURL + '/survey/getByIdWithoutAuth?surveyId=' + id)
}

export async function saveAnswers(answers){
  return await axios.post(baseURL + '/survey/saveAnswers',  {pickedAnswers: answers})
}

export async function getSurveyByIdWithAuth(token, id) {
  return await axios.get(baseURL + '/survey/getByIdWithAuth',
    {
      headers:
        {
          Authorization: "Bearer " + token
        },
      params:
        {
          surveyId: id
        }
    })
}

export async function getSurveyByIdShared(id) {
  return await axios.get(baseURL + '/survey/getByIdFormShare',
    {
      params:
        {
          surveyId: id
        }
    })
}

export async function deleteSurvey(token, id) {
  return await axios.delete(baseURL + '/survey/deleteById',
    {
      headers:
        {
          Authorization: "Bearer " + token
        },
      params:
        {
          surveyId: id
        }
    })
}

