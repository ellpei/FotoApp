import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./Home.css";
import NavBar from "../NavBar/NavBar.js";
import "bootstrap/dist/css/bootstrap.css";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <NavBar title="Home"></NavBar>
        <Link to="/InsideEvent">
          <button class="btn-rounded">Go to "Inside Event"</button>
        </Link>
        <br/>
        <br/>
        <Link to="/CreateEvent">
          <button class="btn-rounded">Create Event</button>
        </Link>
      </div>
    );
  }
}

export default Home;
