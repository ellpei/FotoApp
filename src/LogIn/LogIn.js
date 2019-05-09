import React, { Component } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../index.css";
import "./LogIn.css";
import "../data/Model.js"

class LogIn extends Component {

  render() {
    function hejhek(name) {
      return <h1>{name}</h1>
    }
    return (
      <div className="LogIn">
        <div id="outer-box">
          <h1>PhotoShare.</h1>
          <div class="horizontal-line"></div>
          <div id="leftalign">
            <p> Capture the moment with our revolutionizing event-based photo sharing platform</p>
          </div>
          <br/>
          <input type="email" placeholder="Email" name="email" required></input><br/>
          <input type="password" placeholder="Password" name="psw" required></input>
          <br/>
          <br/>
          <Link to="/Home">
            <button type="button" class="btn">Log In</button>
          </Link>
        </div>
        <div class="footer">
          <p>Don't have an account?<span class="bold"> Sign Up</span></p>
        </div>
      </div>

    );
  }
}

export default LogIn;
