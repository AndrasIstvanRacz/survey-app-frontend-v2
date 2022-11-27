import React, {Component} from "react";
import './LoginStyle.css';
import {Link} from "react-router-dom";
import {handleLogIn} from "../AuthActions/AuthAction";
import {setCookie} from "../utils/cookieHandler";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      authError: false,
    }
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    return (
      <form className="LoginForm" onSubmit={this.onLogIn}>
        <h1 className="Title">Log In</h1>
        <p className="LogInError">{this.state.authError ? 'Incorrect username or password' : ''}</p>
        <input
          className="TextField"
          type="text"
          placeholder="Enter your username"
          onChange={e => this.setState(
            {username: e.target.value})}
          value={this.state.username}/>
        <input
          className="TextField"
          type="password"
          placeholder="Enter your password"
          onChange={e => this.setState(
            {password: e.target.value})}
          value={this.state.password}/>
        <input
          className="SubmitButton"
          type="submit"
          value="Log In"/>
        <span className="SignUpLink">
          <Link to="/signup">Sign Up</Link>
        </span>
      </form>
    );
  }

  onLogIn = event => {
    event.preventDefault()
    let self = this
    if (this.mounted) {
      handleLogIn(this.state.username, this.state.password)
        .then(function (response) {
          setCookie('userSession', response.data, 30);
          self.setState({
            username: "",
            password: "",
            authError: false,
          })
          self.props.handelAuth()
        }).catch(function (reason) {
        self.setState({
          password: "",
          authError: true,
        })
      })
    }
  }
}

export default Login;
