import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./SignUp.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "../NavBar/NavBar.js";
import modelInstance from '../data/Model.js'


class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(event) {
    //store to database
    const item = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      attendedEvents: null
    };

    modelInstance.createUser(item);
    event.preventDefault();
    this.props.history.push('/Home');
  }

  render() {
    return(
      <div className="SignUp">
        <NavBar title="Sign Up" prev={this.props.history}></NavBar>
        <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit}>
          <input name="username" type="text" placeholder= "Username" value={this.state.username} onChange={this.handleChange} required/>
          <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
          <input name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
          <div id="submit-container">
            <input id="submit-btn" type="submit" value="Sign Up"></input>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
