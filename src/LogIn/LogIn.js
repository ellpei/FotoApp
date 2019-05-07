import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LogIn.css";
import 'bootstrap/dist/css/bootstrap.css';

class LogIn extends Component {
  render() {
    return (
      <div className="LogIn">
        <p>Log in to be able to join events like Jens Mega Party!</p>

        <Link to="/Home">
          <button>Log in</button>
        </Link>
      </div>
    );
  }
}

export default LogIn;
