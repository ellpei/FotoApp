import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./AttendEvent.css";
import NavBar from "../NavBar/NavBar.js";
import 'bootstrap/dist/css/bootstrap.css';

class AttendEvent extends Component {
  render() {
    return (
      <div className="AttendEvent">
        <NavBar title="Attend" prev={this.props.history}></NavBar>
        <h2>Attend Event</h2>
        <div class="list-container">
          
        </div>
      </div>
    );
  }
}

export default AttendEvent;
