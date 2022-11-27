import axios from "axios";


const baseURL = 'https://survey-app-backend-deik.herokuapp.com'

export async function handleSingUp(firstname, lastname, username, password) {
  return await axios.post(baseURL + '/user/registration', {
    firstname: firstname,
    lastname: lastname,
    username: username,
    password: password
  });
}

export async function handleLogIn(username, password) {
  return await axios.post(baseURL + '/user/authenticate', {
    username: username,
    password: password
  });
}
