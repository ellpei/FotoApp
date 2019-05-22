import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./PastEvents.css";
import NavBar from "../NavBar/NavBar.js";
import 'bootstrap/dist/css/bootstrap.css';
import firebase from '../firebase.js';
import modelInstance from '../data/Model.js';

class PastEvents extends Component {


  constructor(props) {
    super(props);
    this.state = {
      events: null,
      status: true
    };

  }

  componentDidMount() {
    modelInstance.addObserver(this);
    this.getEvents();
  }

  getEvents(){
    modelInstance.itIsWorthTesting()
  }

  render() {

    let eventList = null;

    return (
      <div className="PastEvents">
        <NavBar title="PastEvents" prev={this.props.history}></NavBar>
        <h2>Past Events</h2>
      </div>
    );
  }
}

export default PastEvents;
