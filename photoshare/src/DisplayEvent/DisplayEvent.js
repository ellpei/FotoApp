import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./DisplayEvent.css";
import NavBar from "../NavBar/NavBar.js";
import 'bootstrap/dist/css/bootstrap.css';
import modelInstance from '../data/Model.js';
import * as firebase from 'firebase';

class DisplayEvent extends Component {

  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    modelInstance.attendEvent(this.props.id, this.props.name);
    this.props.history.push('/InsideEvent');
  }

  render() {

    return (
      <div className="DisplayEvent">
        <div className="event-container">
          <div className="event-title">
            <h5><b>{this.props.name}</b></h5>
          </div>
          <div className="event-time">
            <b>Start: </b>{this.props.startDate} {this.props.startTime}
          </div>
          <div className="event-description">
          <b>Description: </b>{this.props.description}
          </div>
          <button className="small-btn" onClick={this.handleClick}>Attend</button>
          <div className="horizontal-line"></div>
        </div>
      </div>
    );
  }
}

export default DisplayEvent;
