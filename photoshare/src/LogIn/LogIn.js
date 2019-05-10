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
            <p> Capture the moment. Revolutionizing event-based photo sharing platform</p>
          </div>
          <br/>
          <input type="username" placeholder="Username" name="username" required></input><br/>
          <input type="password" placeholder="Password" name="psw" required></input>
          <br/>
          <br/>
          <Link to="/Home">
            <button type="button" class="btn">Log In</button>
          </Link>
        </div>
        <div class="footer" id="footer-box">
          <Link to="/SignUp">
            <button type="button" class="btn">Don't have an account? Sign up</button>
          </Link>

        </div>
      </div>

    );
  }
}

export default LogIn;
