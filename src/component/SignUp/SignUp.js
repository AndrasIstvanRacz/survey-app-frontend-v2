import React from "react";
import "./SignUpStyle.css"
import {Link, Navigate} from "react-router-dom";
import {setCookie} from "../utils/cookieHandler";
import {handleSingUp} from "../AuthActions/AuthAction";


export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      passwordOne: "",
      passwordTwo: "",
      usernameError: false,
      passwordError: false,
      passwordLengthError: false,
      usernameLengthError: false,
      redirect: false,
    }
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.redirect) {
      this.props.handelAuth()
      return <Navigate to={'/mysurveys'}/>
    }

    return (
      <form className="SignUpForm" onSubmit={this.onSignUp}>
        <h1 className="SignUpTitle">Sign Up</h1>
        <p className="SignUpLogInError">
          {this.state.usernameError ? 'Username already exists' : ''}</p>
        <p className="SignUpLogInError">
          {this.state.passwordError ? 'Passwords not matches' : ''}</p>
        <p className="SignUpLogInError">
          {this.state.passwordLengthError ? 'Password must be a minimum length of 8 characters' : ''}</p>
        <p className="SignUpLogInError">
          {this.state.usernameLengthError ? 'Username must be a minimum length of 5 characters' : ''}</p>
        <input
          className="SignUpTextField"
          type="text"
          placeholder="Enter your firstname"
          autoComplete="off"
          onChange={e => this.setState(
            {firstname: e.target.value})}
          value={this.state.firstname}/>
        <input
          className="SignUpTextField"
          type="text"
          placeholder="Enter your lastname"
          autoComplete="off"
          onChange={e => this.setState(
            {lastname: e.target.value})}
          value={this.state.lastname}/>
        <input
          className="SignUpTextField"
          type="text"
          placeholder="Enter your username*"
          autoComplete="off"
          onChange={e => this.setState(
            {username: e.target.value})}
          value={this.state.username}/>
        <input
          className="SignUpTextField"
          type="password"
          placeholder="Enter your password*"
          autoComplete="off"
          onChange={e => this.setState(
            {passwordOne: e.target.value})}
          value={this.state.passwordOne}/>
        <input
          className="SignUpTextField"
          type="password"
          placeholder="Enter your password again*"
          autoComplete="off"
          onChange={e => this.setState(
            {passwordTwo: e.target.value})}
          value={this.state.passwordTwo}/>
        <input
          className="SignUpSubmitButton"
          type="submit"
          value="Sign Up"
          />
        <span className="LogInLink">
          <Link to="/login">Log In</Link>
        </span>
      </form>
    )
  }

  onSignUp = event => {
    event.preventDefault()
    let self = this
    if(this.validation()){
      if (this.mounted) {
        if (this.state.passwordOne === this.state.passwordTwo) {
          handleSingUp(this.state.firstname, this.state.lastname, this.state.username, this.state.passwordOne)
            .then(function (response) {
              setCookie('userSession', response.data, 30);
              self.setState({
                firstname: "",
                lastname: "",
                username: "",
                passwordOne: "",
                passwordTwo: "",
                usernameError: false,
                passwordError: false,
                passwordLengthError: false,
                usernameLengthError: false,
                redirect: true,
              })
            }).catch(function (reason) {
            self.setState({
              passwordOne: "",
              passwordTwo: "",
              usernameError: true,
              passwordError: false,
              passwordLengthError: false,
              usernameLengthError: false,
              redirect: false,
            })
          })
        } else {
          self.setState({
            passwordOne: "",
            passwordTwo: "",
            usernameError: false,
            passwordError: true,
            passwordLengthError: false,
            usernameLengthError: false,
            redirect: false,
          })
        }
      }
    }
  }

  validation =()=> {
    if(this.state.username.length < 5){
      this.setState({
        usernameError: false,
        passwordError: false,
        passwordLengthError: false,
        usernameLengthError: true,
        redirect: false,
      })
      return false
    }
      if(this.state.passwordOne.length < 8){
        this.setState({
          usernameError: false,
          passwordError: false,
          passwordLengthError: true,
          usernameLengthError: false,
          redirect: false,
        })
        return false
      }
    return true
  }

}
