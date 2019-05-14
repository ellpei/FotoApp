import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./CreateEvent.css";
import NavBar from "../NavBar/NavBar.js";
import 'bootstrap/dist/css/bootstrap.css';

class CreateEvent extends Component {
  render() {
    return (
      <div className="CreateEvent">
        <NavBar title="Create Event" prev={this.props.history}></NavBar>
      </div>
    );
  }
}

export default CreateEvent;
