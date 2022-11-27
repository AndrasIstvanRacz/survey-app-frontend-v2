import React from "react";
import {Link} from "react-router-dom";
import "./NavigationStyle.css"
import {eraseCookie} from "../utils/cookieHandler";


class Navigation extends React.Component {

  render() {
    return (
      <div className="Container">
        <div className="Navbar">
          {!this.props.authenticated ?
            <div className="NavbarLeft">
              <Link to="/" className="NavbarLink">Home</Link>
            </div>
            :
            <div className="NavbarLeft">
              <Link to="/" className="NavbarLink">Home</Link>
              <Link to="/modify" className="NavbarLink">Edit & Create</Link>
              <Link to="/statistics" className="NavbarLink">Statistics</Link>
            </div>
          }
          <div className="NavbarRight">
            {!this.props.authenticated ?
              <Link to="/login" className="NavbarLink">Log In</Link>
              :
              <Link to="/login" className="NavbarLink" onClick={this.onLogOut}>Log Out</Link>
            }
          </div>
        </div>
      </div>
    );
  }

  onLogOut = () => {
    eraseCookie('userSession')
    this.props.handelAuth()
  }
}

export default Navigation;
