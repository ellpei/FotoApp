import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./Home.css";
import NavBar from "../NavBar/NavBar.js";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <NavBar title="Home"></NavBar>
        <br/>
        <br/>
        <div class="button-container">
          <Link to="/CreateEvent">
            <button class="btn-rounded">Create Event</button>
          </Link>
          <Link to="/AttendEvent">
            <button class="btn-rounded">Attend Event</button>
          </Link>
          <Link to="/PastEvents">
            <button class="btn-rounded">Past Events</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
