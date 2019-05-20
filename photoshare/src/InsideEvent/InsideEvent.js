import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./InsideEvent.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "../NavBar/NavBar.js";
import modelInstance from '../data/Model.js';
import camerashutter from './camerashutter.svg';
class InsideEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentEventID: modelInstance.state.currentEventID,
      currentEventObject: modelInstance.state.currentEventObject
    };
  }

  render() {
    return (
      <div className="InsideEvent">
        <NavBar title="InsideEvent" prev={this.props.history}></NavBar>
        <h2>{this.state.currentEventObject ? this.state.currentEventObject['name'] : null }</h2>
        <Link to="./Camera">
          <button className="camera-btn"><img src={camerashutter} alt="Upload photo"/></button>
        </Link>
      </div>
    );
  }
}

export default InsideEvent;
