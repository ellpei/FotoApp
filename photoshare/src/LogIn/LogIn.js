import React, { Component } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../index.css";
import "./LogIn.css";
import "../data/Model.js"

class LogIn extends Component {

  render() {

    return (
      <div className="LogIn">
        <div id="outer-box">
          <h1>PhotoShare.</h1>
          <div id="leftalign">
            <p> Capture the moment with our revolutionizing event-based photo sharing platform.</p>
          </div>
          <br/>
          <input type="username" placeholder="Username" name="username" required></input><br/>
          <input type="password" placeholder="Password" name="psw" required></input>
          <br/>
          <br/>
          <Link to="/Home">
            <button type="button" class="btn">Log In</button>
          </Link>
          <br/>
          <br/>
          <br/>
          <Link to="/SignUp">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>

    );
  }
}

export default LogIn;
