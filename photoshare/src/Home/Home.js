import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.css";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <p>Home</p>
        <Link to="/InsideEvent">
          <button class="btn-rounded">Go to "Inside Event"</button>
        </Link>
      </div>
    );
  }
}

export default Home;
