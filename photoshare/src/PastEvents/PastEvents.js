import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./PastEvents.css";
import NavBar from "../NavBar/NavBar.js";
import 'bootstrap/dist/css/bootstrap.css';

class PastEvents extends Component {
  render() {
    return (
      <div className="PastEvents">
        <NavBar title="PastEvents" prev={this.props.history}></NavBar>
        <h2>Past Events</h2>
      </div>
    );
  }
}

export default PastEvents;
