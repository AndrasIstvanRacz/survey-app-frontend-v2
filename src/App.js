import './App.css';
import React, {Component} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Navigation from "./component/Navigation/Navigation";
import Login from "./component/Login/Login";
import Home from "./component/Home/Home";
import {SignUp} from "./component/SignUp/SignUp";
import {getCookie} from "./component/utils/cookieHandler";
import Modify from "./component/Modify/Modify";
import WrappedFillMode from "./component/FillMode/WrappedFillMode";
import WrappedEditMode from "./component/EditMode/WrappedEditMode";
import WrappedCreateMode from "./component/CreateMode/WrappedCreateMode";
import Statistics from "./component/Statistics/Statistics";
import WrappedStatisticsMode from "./component/StatisticsMode/WrappedStatisticsMode";

class App extends Component {

  constructor(props) {
    super(props);
    this.setAuthentication = this.setAuthentication.bind(this)
    this.state = {
      authenticated: getCookie('userSession') || ""
    }
  }

  componentDidMount() {
    this.setState({authenticated: getCookie('userSession')})
  };

  setAuthentication = () => {
    this.setState({authenticated: getCookie('userSession')})

  }

  render() {
    return (
      <BrowserRouter>
        <Navigation authenticated={this.state.authenticated} handelAuth={this.setAuthentication}/>
        {this.state.authenticated ?
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/modify" element={<Modify/>}/>
            <Route path="/view/:type/:id" element={<WrappedFillMode/>}/>
            <Route path="/modify/edit/:id" element={<WrappedEditMode/>}/>
            <Route path="/modify/create" element={<WrappedCreateMode/>}/>
            <Route path="/statistics" element={<Statistics/>}/>
            <Route path="/statistics/:id" element={<WrappedStatisticsMode/>}/>
            <Route path="/*" element={<Navigate to='/'/>}/>
          </Routes>
          :
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login handelAuth={this.setAuthentication}/>}/>
            <Route path="/signup" element={<SignUp handelAuth={this.setAuthentication}/>}/>
            <Route path="/view/:type/:id" element={<WrappedFillMode/>}/>
            <Route path="/*" element={<Navigate to='/'/>}/>
          </Routes>

        }
      </BrowserRouter>
    );
  }
}

export default App;
