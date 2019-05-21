import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./About.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "../NavBar/NavBar.js";
import modelInstance from '../data/Model.js'


class About extends Component {

  render() {
    return(
      <div className="About">
        <NavBar title="About" prev={this.props.history}></NavBar>
        <h2>About</h2>
        <div className = "textbox">
        <p>Capture the moment. Create or attend events based on your current
        geolocation and enable the possiblity to upload photos to a shared storage with the other attendees.
        Only those who were actually there will be able to upload and download photos from the event.
        Browse and download your photos afterwards to save the memories.
        </p>
        </div>
      </div>
    );
  }
}

export default About;
