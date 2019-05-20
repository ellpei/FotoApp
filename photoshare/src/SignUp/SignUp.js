import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./SignUp.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "../NavBar/NavBar.js";
import modelInstance from '../data/Model.js'




const SignUp = ({ onSubmit }) => {
  return(
    <div className="SignUp">
      {/* <NavBar title="Sign Up" prev={this.props.history}></NavBar> */}
      <h2>Sign Up</h2>
        <form onSubmit={onSubmit}>
          <input name="password" type="password" placeholder="Password"/>
          <input name="email" type="text" placeholder="Email"/>
          <div id="submit-container">
            <button id="submit-btn" type="submit">Sign Up</button>
          </div>
x      </form>
    </div>
  );
};

export default SignUp;
