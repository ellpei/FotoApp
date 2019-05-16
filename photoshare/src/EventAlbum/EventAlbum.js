import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./EventAlbum.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "../NavBar/NavBar.js";


class EventAlbum extends Component {
  render() {
    return (
      <div className="EventAlbum">
        <p>EventAlbum</p>
        <NavBar title="EventAlbum" prev={this.props.history}></NavBar>

      </div>
    );
  }
}

export default EventAlbum;
