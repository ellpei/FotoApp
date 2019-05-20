import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";


import modelInstance from "./data/Model";
import "./App.css";
import LogIn from "./LogIn/LogIn";
import AttendEvent from "./AttendEvent/AttendEvent";
import CreateEvent from "./CreateEvent/CreateEvent";
import EventAlbum from "./EventAlbum/EventAlbum";
import Home from "./Home/Home";
import InsideEvent from "./InsideEvent/InsideEvent";
import Camera from "./Camera/Camera";
import PastEvents from "./PastEvents/PastEvents";
import SignUp from "./SignUp/SignUp";
//import firebase from "./Firebase/firebase.js";

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './Firebase/firebaseConfig';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "PhotoShare"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<h1 className="App-title">{this.state.title}</h1>*/}
          {/* We rended diffrent component based on the path */}

          <Router>
            <div>
              <Route exact path="/" component={LogIn} />
              <Route exact path="/SignUp" component={SignUp} />
              <Route path="/AttendEvent" component={AttendEvent} />
              <Route path="/CreateEvent" component={CreateEvent} />
              <Route path="/EventAlbum" component={EventAlbum} />
              <Route path="/Home" component={Home} />
              <Route path="/InsideEvent" component={InsideEvent} />
              <Route path="/PastEvents" component={PastEvents} />
              <Route path="/Camera" component={Camera} />
           </div>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
